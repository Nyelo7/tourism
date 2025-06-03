import { useNavigate } from 'react-router-dom';
// --- Hero Section ---
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section
            id="hero"
            className="relative w-full h-screen flex items-center justify-center bg-cover bg-center pt-16 overflow-hidden"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            <div className="absolute inset-0 bg-charcoal-gray opacity-60"></div>
            <div className="relative z-10 p-8 text-center max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl animate-fade-in-up">
                    Explore The Beauty<br />of Pangasinan With Us
                </h1>
                <p className="mt-4 text-white text-xl md:text-2xl font-light drop-shadow-md opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Your unforgettable journey starts here. Discover unique experiences, earn rewards, and connect with fellow explorers.
                </p>
                <button 
                onClick={() => navigate('/login')}
                className="mt-10 px-10 py-4 rounded-full bg-cyan-vibrant text-charcoal-gray font-bold text-lg shadow-xl hover:bg-optimistic-yellow transition duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Start Exploring
                </button>
            </div>
        </section>
    );
};

export default HeroSection