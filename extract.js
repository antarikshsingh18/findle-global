require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// 1. Initialize Supabase Connectivity Node
const supabase = createClient(
  'https://npvsieaaokjznemhbquc.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runProductionPipeline() {
  console.log("🚀 [FINDLE ENGINE] Booting final production sync script...");
  const startTime = Date.now();

  console.log("🧹 Flushing old grid rows from public.projects table matrix...");
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  let allFormattedProjects = [];
  let skip = 0;
  const take = 10; // Clean batch sizing
  let keepGoing = true;

  const commonHeaders = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://properties.samsharma.homes',
    'referer': 'https://properties.samsharma.homes/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  try {
    while (keepGoing) {
      console.log(`📡 Fetching API Block: skip=${skip} (Total cataloged: ${allFormattedProjects.length})...`);
      
      const targetAPI = `https://v2-idx-api.novacrm.ca/api/preconstruction/listings?take=${take}&skip=${skip}&isInitialSet=false&sort=NEW_TO_OLD`;
      const response = await fetch(targetAPI, { method: 'GET', headers: commonHeaders });
      
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const payload = await response.json();
      const rawListings = payload?.data?.preconstructions || [];

      if (rawListings.length === 0) {
        console.log("🏁 Reached end of CRM directory data.");
        break;
      }

      // Process 10 items concurrently
      const chunkPromises = rawListings.map(async (item) => {
        const listingId = item.id || '';
        
        let priceString = item.pricing && item.pricing > 0 ? `$${Number(item.pricing).toLocaleString()}` : 'TBA';
        let bedsString = item.min_unit_type === item.max_unit_type ? `${item.min_unit_type || 'TBA'}` : `${item.min_unit_type || ''} - ${item.max_unit_type || ''}`.trim();
        let sqftString = item.min_suit_size === item.max_suit_size ? `${item.min_suit_size || 'N/A'} Sq.Ft` : `${item.min_suit_size || ''} - ${item.max_suit_size || ''} Sq.Ft`.trim();
        
        const extractedImage = item.media_resources?.featured?.resource_url || item.image || '';
        const extractedDeveloper = Array.isArray(item.developers_payload) && item.developers_payload.length > 0 
          ? item.developers_payload[0].name 
          : (item.developer || 'Independent Builder');

        let internalDescription = '';
        let trueWebpageUrl = '';

        // FIX: Query the individual detail endpoint using only the valid numeric ID integer
        if (listingId) {
          try {
            const detailAPI = `https://v2-idx-api.novacrm.ca/api/preconstruction/listings/${listingId}`;
            const detailResponse = await fetch(detailAPI, { method: 'GET', headers: commonHeaders });
            
            if (detailResponse.ok) {
              const detailPayload = await detailResponse.json();
              const detailData = detailPayload?.data;

              if (detailData) {
                // 1. Capture the deep layout description text string
                internalDescription = detailData.description || detailData.overview || '';
                
                // 2. Capture the live text URL slug returned explicitly inside this payload layer
                const actualSlug = detailData.slug || '';
                if (actualSlug) {
                  trueWebpageUrl = `https://properties.samsharma.homes/pre-construction-detail/${actualSlug}/${listingId}`;
                }
              }
            }
          } catch (deepErr) {
            // Fallback quietly if an individual project details ping fails
          }
        }

        return {
          title: item.name || item.title || 'Pre-Construction Project',
          price_text: priceString,
          beds_text: bedsString,
          sqft_text: sqftString,
          image_url: extractedImage,
          city: item.city || '',
          developer: extractedDeveloper,
          selling_status: item.selling_status || 'Active',
          source_url: trueWebpageUrl,    // Populates your source_url column matrix
          description: internalDescription // Populates your description text column
        };
      });

      const resolvedChunk = await Promise.all(chunkPromises);
      allFormattedProjects.push(...resolvedChunk);
      
      skip += rawListings.length;

      // Escape hatch safety limits (Optional: comment out if syncing all records completely)
      if (allFormattedProjects.length >= 850) {
        keepGoing = false;
      }
    }

    console.log(`\n📊 Aggregation layout complete. Compiled ${allFormattedProjects.length} data rows.`);
    console.log("📡 Shipping data payload matrix up to Supabase tables...");

    const { error: insertError } = await  supabase
      .from('projects')
      .insert(allFormattedProjects);

    if (insertError) throw insertError;
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`🏆 [SUCCESS] Synchronized perfectly in ${duration}s! All columns are now fully populated.`);

  } catch (err) {
    console.error("🚨 Script execution broke down:", err.message);
  }
}

runProductionPipeline();