// import { useEffect, useState } from 'react'
// import { supabase } from '../../lib/supabaseClient'
// import { motion } from 'framer-motion'

// interface GalleryItem {
//   id: string
//   image_url: string
//   caption: string
// }

// export default function GalleryPage() {
//   const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     fetchGalleryItems()
//   }, [])

//   const fetchGalleryItems = async () => {
//     try {
//       const { data, error } = await supabase.from('gallery').select('*')
//       if (error) throw error
//       setGalleryItems(data || [])
//     } catch (err: any) {
//       console.error('Error loading gallery:', err.message)
//       setError('Failed to load gallery items.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-yellow-100 py-20 px-6">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Our Sweet Gallery</h1>

//         {loading ? (
//           <div className="text-center text-xl text-gray-500">Loading...</div>
//         ) : error ? (
//           <div className="text-red-500 text-center">{error}</div>
//         ) : (
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             {galleryItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 className="relative rounded-2xl overflow-hidden shadow-lg group"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <img
//                   src={item.image_url}
//                   alt={item.caption}
//                   className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-3 text-sm text-center">
//                   {item.caption}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   )
// }
