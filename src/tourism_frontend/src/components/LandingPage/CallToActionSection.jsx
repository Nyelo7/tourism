// --- Call to Action Section ---
const CallToActionSection = () => {
  return (
    <section className="bg-cyan-vibrant py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal-gray mb-6 animate-fade-in-up">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="text-xl text-charcoal-gray mb-10 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join Hackatour today and redefine how you explore the world.
        </p>
        <button className="px-12 py-5 rounded-full bg-optimistic-yellow text-charcoal-gray font-bold text-xl shadow-xl hover:bg-white transition duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Join Hackatour Now!
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;