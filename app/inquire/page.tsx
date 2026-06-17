// 'use client';

// import React, { useState, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js';

// // 🔌 Direct connection client hook
// const supabase = createClient(
//   'https://npvsieaaokjznemhbquc.supabase.co',
//   'sb_publishable_q8TkgtlygQYx38WYDTTl4Q_0izIEIenG96gGbeA6Yy1hSNDV5PZlB5I3A9WqscK1'
// );

// // We isolate the form logic to safely handle search parameters in Next.js
// function InquiryForm() {
//   const searchParams = useSearchParams();
//   // Automatically reads ?project=Lumina+Residences from the address bar URL
//   const propertyName = searchParams.get('project') || 'General Pre-Construction Inquiry';

//   const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', buyerType: 'Investor' });
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('submitting');

//     const { error } = await supabase.from('leads').insert([
//       {
//         full_name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         target_property: propertyName,
//         buyer_type: formData.buyerType,
//       },
//     ]);

//     if (error) {
//       console.error('Lead database insertion failed:', error);
//       setStatus('error');
//     } else {
//       setStatus('success');
//     }
//   };

//   if (status === 'success') {
//     return (
//       <div className="p-8 text-center border border-emerald-200 bg-emerald-50 rounded-2xl max-w-md mx-auto my-12 shadow-sm">
//         <h3 className="text-xl font-bold text-emerald-800">Registration Complete!</h3>
//         <p className="text-sm text-emerald-600 mt-2">
//           Your request for <span className="font-semibold">{propertyName}</span> has been captured. A specialist will contact you shortly with floor plans.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto my-12 p-8 bg-white border border-gray-200 shadow-sm rounded-2xl text-gray-800">
//       <div className="mb-6">
//         <h1 className="text-2xl font-black tracking-tight text-gray-900">Platinum Access Request</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Registering allocation context for: <span className="font-bold text-blue-600">{propertyName}</span>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Full Name</label>
//           <input
//             type="text"
//             required
//             placeholder="John Doe"
//             className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-all"
//             value={formData.fullName}
//             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
//           <input
//             type="email"
//             required
//             placeholder="john@example.com"
//             className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-all"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
//           <input
//             type="tel"
//             placeholder="(416) 555-0199"
//             className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-all"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Are you an investor or buyer?</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-gray-50 text-gray-700 outline-none focus:border-blue-500 focus:bg-white transition-all"
//             value={formData.buyerType}
//             onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
//           >
//             <option value="Investor">I am looking to Invest</option>
//             <option value="End-User">I am buying an End-User Home</option>
//             <option value="Agent">I am a Co-broke Real Estate Agent</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           disabled={status === 'submitting'}
//           className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 rounded-xl transition-all disabled:bg-gray-400 text-sm cursor-pointer shadow-sm shadow-blue-200"
//         >
//           {status === 'submitting' ? 'Submitting to Vault...' : 'Secure Platinum Assignment'}
//         </button>

//         {status === 'error' && (
//           <p className="text-xs text-red-500 text-center font-semibold mt-2">Network mismatch. Please verify details and retry.</p>
//         )}
//       </form>
//     </div>
//   );
// }

// // Main page component wrapped in a fallback boundary required by Next.js for useSearchParams
// export default function InquirePage() {
//   return (
//     <main className="min-h-screen bg-gray-50 py-12 px-4">
//       <Suspense fallback={<div className="text-center py-12 text-sm text-gray-500">Loading layout matrix...</div>}>
//         <InquiryForm />
//       </Suspense>
//     </main>
//   );
// }