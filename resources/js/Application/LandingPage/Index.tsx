import React from 'react';
import NavBar from './components/NavBar';
import TrustedBy from './components/TrustedBy';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WaveSeparator from './components/WaveSeparator';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Index = () => {
    return (
        <div style={{ backgroundColor: '#F4F5ED', minHeight: '100vh' }}>
            <NavBar />
            <HeroSection />
            <TrustedBy />
            <WaveSeparator 
                waveColor="#ECEDE1"
                strokeWidth={30}
            />
            <Features />
            <HowItWorks />
            <SocialProof />
            <WhyChooseUs />
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Index;