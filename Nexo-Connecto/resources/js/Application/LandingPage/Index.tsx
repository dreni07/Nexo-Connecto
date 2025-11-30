import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';

const Index = () => {
    return (
        <div style={{ backgroundColor: '#F4F5ED', minHeight: '100vh' }}>
            <NavBar />
            <HeroSection />
            <HowItWorks />
            <Features />
            <SocialProof />
            <WhyChooseUs />
            <Footer />
        </div>
    );
};

export default Index;