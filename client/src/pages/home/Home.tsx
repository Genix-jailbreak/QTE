import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CTA from './components/CTAs';
import PastEvents from './components/PastEvents';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Gallery />
      <PastEvents />
      <Testimonials />
      <CTA />
    </main>
  );
}