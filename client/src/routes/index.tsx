// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import { LoadingSpinner } from '../components/common/LoadingSpinner';
// import { ErrorBoundary } from '../components/common/ErrorBoundary';

// const Home = lazy(() => import('../pages/Home'));
// const Gallery = lazy(() => import('../pages/home/components/Gallery'));
// // const Booking = lazy(() => import('../pages/pages/home/components/booking'));
// // const Contact = lazy(() => import('../pages/pages/home/components/contactcontact'));

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <ErrorBoundary>
//         <Suspense fallback={<LoadingSpinner />}>
//           <Home />
//         </Suspense>
//       </ErrorBoundary>
//     ),
//   },
//   {
//     path: '/gallery',
//     element: (
//       <ErrorBoundary>
//         <Suspense fallback={<LoadingSpinner />}>
//           <Gallery />
//         </Suspense>
//       </ErrorBoundary>
//     ),
//   },
  
// ]);