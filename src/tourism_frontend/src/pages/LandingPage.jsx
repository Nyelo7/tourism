import React from 'react';
import { motion } from 'framer-motion';

import DestinationsSection from '../components/LandingPage/DestinationSection';
import LandingPageHeader from '../components/LandingPage/LandingPageHeader';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import TestimonialsSection from '../components/LandingPage/TestimonialSection';
import CallToActionSection from '../components/LandingPage/CallToActionSection';
import Footer from '../components/Footer';
import JourneySection from '../components/LandingPage/JourneySection';

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const LandingPage = () => {
  return (
    <div className="font-sans antialiased space-y-24">
      <LandingPageHeader />
      <HeroSection />
      <DestinationsSection />
      <JourneySection />
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FeaturesSection />
      </motion.div>
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TestimonialsSection />
      </motion.div>

      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <CallToActionSection />
      </motion.div>

      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default LandingPage;
