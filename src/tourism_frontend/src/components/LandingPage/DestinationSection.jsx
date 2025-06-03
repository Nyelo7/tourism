// --- Travel Guide Section (Renamed to Destinations for clarity) ---
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DestinationsSection = () => {
    const travelSpots = [
        {
            id: 1,
            src: "/pic1.jpg",
            alt: "Hundred Islands National Park",
            name: "Hundred Islands",
            description: "Explore the famous clusters of islands perfect for island hopping and marine adventures. A true Pangasinan gem."
        },
        {
            id: 2,
            src: "/pic2.jpg",
            alt: "Patar Beach, Bolinao",
            name: "Patar Beach",
            description: "Relax on the golden sands and enjoy breathtaking sunsets over the South China Sea. Ideal for serene getaways."
        },
        {
            id: 3,
            src: "/pic3.jpg",
            alt: "Cape Bolinao Lighthouse",
            name: "Bolinao Lighthouse",
            description: "Visit the iconic lighthouse offering panoramic ocean views and a glimpse into the region's maritime history."
        },
        {
            id: 4,
            src: "/pic4.jpg",
            alt: "Pangasinan Capitol Building",
            name: "Pangasinan Capitol",
            description: "Admire the historical and architectural beauty of the provincial capitol, a symbol of Pangasinan's rich heritage."
        },
        {
            id: 5,
            src: "/pic5.jpg",
            alt: "Manaoag Church",
            name: "Manaoag Church",
            description: "A revered pilgrimage site, the Minor Basilica of Our Lady of the Most Holy Rosary of Manaoag."
        },
        {
            id: 6,
            src: "/pic6.jpg",
            alt: "Dagupan City River Cruise",
            name: "Dagupan River Cruise",
            description: "Discover the vibrant ecosystem and local life along the rivers of Dagupan City."
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        cssEase: "ease-in-out",
        arrows: true,
        responsive: [
            {
                breakpoint: 1280, // For large desktops
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // For tablets and smaller laptops
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // For larger phones and small tablets
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                    arrows: false, // Hide arrows on smaller screens for cleaner look
                }
            },
            {
                breakpoint: 480, // For smaller phones
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '15px',
                    arrows: false, // Hide arrows on smaller screens
                    dots: true, // Ensure dots are still visible
                }
            },
        ]
    };

    return (
        <section id="travel-guide" className="min-h-screen bg-gradient-to-br from-ocean-blue to-teal-600 py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-charcoal-gray mb-12 sm:mb-16 text-center animate-fade-in-up drop-shadow-lg">
                    Every journey is unique
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-24">
                    <div className="flex flex-col justify-center animate-fade-in-up p-4">
                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-charcoal-gray mb-6 sm:mb-8 leading-tight drop-shadow-md">
                            Welcome to <br /> Hackatour
                        </h3>
                        <p className="text-lg sm:text-xl text-charcoal-gray mb-8 sm:mb-10 max-w-lg leading-relaxed">
                            Hackatour helps you explore and discover new destinations. Earn exclusive tokens and collect unique digital souvenirs, transforming every trip into a rewarding and memorable collection.
                        </p>
                        <p className="text-xl sm:text-2xl font-semibold text-charcoal-gray drop-shadow-sm">
                            Discover destinations, Travel and Earn.
                        </p>
                    </div>

                    <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out border-4 border-cyan-300">
                        <img
                            src="/bolinao.jpg"
                            alt="Bolinao Falls"
                            className="w-full h-64 sm:h-80 object-cover rounded-xl sm:rounded-2xl shadow-xl border border-gray-200"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 pt-12 sm:p-6 sm:pt-16 text-white text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Bolinao Falls</p>
                            <p className="text-base sm:text-lg text-gray-200">A majestic natural wonder nestled in the heart of Pangasinan, offering refreshing cascades.</p>
                        </div>
                    </div>
                </div>

                <div className="py-8 sm:py-12 px-0 sm:px-4 relative">
                    <Slider {...settings}>
                        {travelSpots.map((spot) => (
                            <div key={spot.id} className="px-2 sm:px-4">
                                <div
                                    className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden cursor-pointer
                                    group transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-cyan-400 border border-transparent"
                                >
                                    <img
                                        src={spot.src}
                                        alt={spot.alt}
                                        className="w-full h-56 sm:h-64 object-cover transition-opacity duration-300 group-hover:opacity-70"
                                    />
                                    <div className="absolute inset-0 bg-charcoal-gray bg-opacity-80 flex flex-col items-center justify-center p-4 sm:p-6
                                                    text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                        <h3 className="text-xl sm:text-2xl font-bold text-cyan-vibrant mb-2 sm:mb-3 text-center">{spot.name}</h3>
                                        <p className="text-sm sm:text-base text-center leading-relaxed">{spot.description}</p>
                                    </div>
                                    <div className="p-4 sm:p-5 text-center transition-opacity duration-300 group-hover:opacity-0">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{spot.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;