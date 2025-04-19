import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { logEvent } from '../../../utils/analytics';

export default function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    logEvent('Hero CTA', 'Click', 'Book Consultation');
    navigate('/booking');
  };

  return (
    <section className="relative z-0 min-h-[90vh] flex items-center bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 mb-6 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
            >
              Premium Catering Services
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Create Unforgettable
              <span className="text-purple-600"> Moments</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 mb-8 max-w-lg"
            >
              From intimate gatherings to grand celebrations, we bring your vision to life with delicious elegance and extraordinary attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col gap-4 justify-center md:justify-start"
            >
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 w-full items-center justify-center sm:justify-start">
                <div className="w-full sm:w-[240px]">
                  <Button
                    onClick={handleClick}
                    className="group relative w-full px-8 py-5 sm:px-8 sm:py-5 bg-purple-600 cursor-pointer text-white rounded-lg overflow-hidden shadow-lg hover:shadow-purple-200 transition-all duration-300"
                  >
                    <span className="relative z-10">Book a Consultation</span>
                    <div className="absolute inset-0 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Button>
                </div>
              
                <div className="w-full sm:w-[240px]">
                  <Button
                    onClick={() => navigate('/gallery')}
                    className="group w-full px-2 py-5 sm:px-8 sm:py-5 border-2 cursor-pointer bg-purple-200 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      View Our Gallery
                      <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Button>
                </div>
              
                <div className="w-full sm:w-[240px]">
                  <Button
                    onClick={() => navigate('/products')}
                    className="group w-full px-8 py-5 sm:px-8 sm:py-5 border-2 cursor-pointer bg-purple-200 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      Order our Products
                      <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Button>
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <img
                src="/images/cake-parfait.jpg"
                alt="Custom cake showcase"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                  <p className="text-sm font-medium text-gray-600">Currently taking bookings</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '../../../components/ui/Button';

// export default function Hero() {
//   return (
//     <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-purple-800 via-purple-600 to-brown-400 text-white">
//       <div className="absolute inset-0 bg-black/40"></div> {/* Overlay */}
      
//       <motion.div 
//         className="container mx-auto px-6 z-10 text-center max-w-3xl"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <h1 className="text-6xl font-extrabold tracking-tight leading-tight mb-6">
//           Exquisite Catering & Event Planning
//         </h1>
//         <p className="text-xl text-white/90 mb-8">
//           From intimate gatherings to grand celebrations, we bring your vision to life with delicious elegance.
//         </p>
        
//         <motion.div 
//           className="flex flex-wrap justify-center gap-6"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3, duration: 0.7 }}
//         >
//           <Link to="/bookings">
//             <Button className="bg-white text-purple-800 px-8 py-3 rounded-lg shadow-lg hover:bg-purple-200 transition-all">
//               Book Now
//             </Button>
//           </Link>
//           <Link to="/products">
//             <Button className="bg-brown-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-brown-500 transition-all">
//               View Menu
//             </Button>
//           </Link>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
