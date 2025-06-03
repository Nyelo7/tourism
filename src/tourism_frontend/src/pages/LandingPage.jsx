import React, { useState, useEffect } from 'react';
import DestinationsSection from '../components/LandingPage/DestinationSection';
import LandingPageHeader from '../components/LandingPage/LandingPageHeader';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import TestimonialsSection from '../components/LandingPage/TestimonialSection';
import CallToActionSection from '../components/LandingPage/CallToActionSection';
import Footer from '../components/Footer';

// --- Main Landing Page Component ---
const LandingPage = () => {
  return (
    <div className="font-sans antialiased">
      <LandingPageHeader />
      <HeroSection />
      <DestinationsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;