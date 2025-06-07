// --- Testimonials Section ---
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Hackatour transformed my travel experience!",
      author: "Christopher DG. - Adventure Enthusiast"
    },
    {
      quote: "The NFT Badges are amazing! It's like having a unique piece of each journey.",
      author: "Robe s.- Digital Nomad"
    },
    {
      quote: "A truly innovative platform. The community features are fantastic for discovering new places.",
      author: "Melquezedek C. - Travel Blogger"
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-charcoal-gray mb-12 animate-fade-in-up">What Our Explorers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-ocean-blue p-8 rounded-xl shadow-lg
                         transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                         animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <p className="text-xl font-semibold text-charcoal-gray mb-4">"{testimonial.quote}"</p>
              <p className="text-lg text-gray-700">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;