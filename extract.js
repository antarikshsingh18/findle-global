require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://npvsieaaokjznemhbquc.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY // <--- Paste your full secret service_role key here
);

async function extractAllPages() {
  console.log("Initializing data pipeline synchronization loop...");
  
  console.log("Clearing legacy placeholder records from public.projects matrix...");
  const { error: clearError } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (clearError) console.error("Note: Table clearing warning:", clearError.message);

  let allFormattedProjects = [];
  let skip = 0;
  const take = 10; // Keeping this matching their strict backend allowance
  let keepGoing = true;

  try {
    while (keepGoing) {
      console.log(`Fetching data matrix block: skip=${skip} (Total gathered: ${allFormattedProjects.length})...`);
      
      const targetAPI = `https://v2-idx-api.novacrm.ca/api/preconstruction/listings?take=${take}&skip=${skip}&isInitialSet=false&sort=NEW_TO_OLD`;

      const response = await fetch(targetAPI, {
        method: 'GET',
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9',
          'origin': 'https://properties.samsharma.homes',
          'referer': 'https://properties.samsharma.homes/',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const payload = await response.json();
      const rawListings = payload?.data?.preconstructions || [];

      if (rawListings.length === 0) {
        console.log("Reached the end of available records.");
        keepGoing = false;
        break;
      }

      const chunk = rawListings.map(item => {
        let priceString = 'TBA';
        if (item.pricing && item.pricing > 0) {
          priceString = `$${Number(item.pricing).toLocaleString()}`;
        }

        let bedsString = 'TBA Bed';
        if (item.min_unit_type || item.max_unit_type) {
          bedsString = item.min_unit_type === item.max_unit_type 
            ? `${item.min_unit_type}`
            : `${item.min_unit_type || ''} - ${item.max_unit_type || ''}`.replace(/^\s*-\s*|\s*-\s*$/, '');
        }

        let sqftString = 'N/A Sq.Ft';
        if (item.min_suit_size || item.max_suit_size) {
          sqftString = item.min_suit_size === item.max_suit_size 
            ? `${item.min_suit_size} Sq.Ft`
            : `${item.min_suit_size || ''} - ${item.max_suit_size || ''} Sq.Ft`;
        }

        const extractedImage = item.media_resources?.featured?.resource_url || item.image || '';

        const extractedDeveloper = Array.isArray(item.developers_payload) && item.developers_payload.length > 0
          ? item.developers_payload[0].name
          : (item.developer || '');

        return {
          title: item.name || item.title || 'Pre-Construction Project',
          price_text: priceString,
          beds_text: bedsString,
          sqft_text: sqftString,
          image_url: extractedImage,
          city: item.city || '',
          developer: extractedDeveloper,
          selling_status: item.selling_status || 'Active'
        };
      });

      allFormattedProjects.push(...chunk);
      
      // Crucial step: Shift the window up by exactly how many items were sent back
      skip += rawListings.length;

      // Escape window safety limit
      if (allFormattedProjects.length >= 850) {
        keepGoing = false;
      }
    }

    console.log(`\nAGGREGATION COMPLETE: Formatted ${allFormattedProjects.length} accurate property rows.`);
    console.log("Streaming optimized batch transaction up to your Supabase cloud storage...");

    const { error } = await supabase
      .from('projects')
      .insert(allFormattedProjects);

    if (error) throw error;
    console.log("SUCCESS! The pipeline has finished syncing. Your property tables are fully populated!");

  } catch (err) {
    console.error("Pipeline execution halted on error:", err.message);
  }
}

extractAllPages();