import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './SiteDetails.css';
import '../styles/theme.css';
import BottomNav from './BottomNav1';
import './Site.css';
import bolinaoImage from '../images/bolinao.jpg';

const Site = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Go to Cape Bolinao Lighthouse', completed: false },
    { id: 2, text: 'Post a Picture of Cape Bolinao Lighthouse on Social Media', completed: false },
    { id: 3, text: 'Pronounce a Local Word or Phrase from Bolinao', completed: false },
    { id: 4, text: 'Take a Photo Eating Local Food in Bolinao', completed: false },
    { id: 5, text: 'Answer a Quick Quiz About Cape Bolinao Lighthouse', completed: false },
  ]);

  // Simulated site data
  const site = {
    name: 'Hundred Islands National Park',
    location: 'Alaminos, Pangasinan',
    rating: 4.8,
    reviews: 245,
    description: 'A national park and protected area in the Philippines that features 124 islands at low tide and 123 at high tide. The islands are believed to be about two million years old.',
    category: 'nature',
    details: {
      bestTime: 'November to April',
      duration: '4-6 hours',
      difficulty: 'Easy to Moderate',
      price: '₱1,500 - ₱2,500',
      activities: [
        'Island Hopping',
        'Snorkeling',
        'Kayaking',
        'Cliff Jumping',
        'Swimming'
      ]
    },
    history: 'The Hundred Islands National Park was declared a national park in 1940 through Proclamation No. 667. The islands were believed to have been formed millions of years ago by the action of waves and winds on ancient coral reefs.',
    reviews: [
      {
        id: 1,
        user: 'Maria S.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing experience! The islands are breathtaking and the activities are well-organized.',
        avatar: null
      },
      {
        id: 2,
        user: 'John D.',
        rating: 4,
        date: '1 month ago',
        comment: 'Great place for family trips. The boat tours are excellent but bring lots of water and sunscreen!',
        avatar: null
      }
    ]
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Static heritage site data (can be replaced with API or dynamic data)
  const heritageSite = {
    name: 'Cape Bolinao Lighthouse',
    type: 'Historical Landmark',
    established: '1905',
    recognition: '2nd tallest lighthouse in the Philippines',
    significance: 'Guided ships along the West Philippine Sea, historic Spanish-American collaboration',
    funFacts: [
      'One of the few lighthouses built during the American period.',
      'Still functional after more than 100 years.',
    ],
    location: 'Bolinao, Pangasinan, Philippines',
    directions: {
      fromCity: 'From Alaminos City – 1.5 hrs by bus or van',
      publicTransport: 'Jeepneys or vans from Alaminos terminal',
      parking: 'Available near the entrance',
      bestTime: 'Sunset for best views (4PM - 6PM)',
    },
  };

  // Placeholder image array for gallery (extend with real images)
  const galleryImages = [
    bolinaoImage,
    bolinaoImage, 
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < Math.floor(rating) ? 'filled' : ''}`}
      ></i>
    ));
  };

  const renderPlaceholderImage = () => {
    const icons = {
      'nature': 'leaf',
      'historical': 'landmark',
      'religious': 'church',
      'adventure': 'hiking'
    };

    return (
      <div className="placeholder-image">
        <i className={`fas fa-${icons[site.category] || 'image'}`}></i>
      </div>
    );
  };

  return (
    <div className="site-page">
      {/* Header */}
      <h1>{heritageSite.name}</h1>

      {/* Heritage Information */}
      <section className="heritage-info">
        <h2>🏛️ Heritage Facts</h2>
        <ul>
          <li><strong>Type:</strong> {heritageSite.type}</li>
          <li><strong>Established:</strong> {heritageSite.established}</li>
          <li><strong>Recognitions:</strong> {heritageSite.recognition}</li>
          <li><strong>Cultural Significance:</strong> {heritageSite.significance}</li>
          <li><strong>Fun Facts:</strong>
            <ul>
              {heritageSite.funFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      {/* Image Gallery */}
      <section className="heritage-images">
        <h2>🖼️ Pictures</h2>
        <div className="image-gallery">
          {galleryImages.map((image, index) => (
            <img key={index} src={image} alt={`${heritageSite.name} view ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* Directions */}
      <section className="how-to-get">
        <h2>🧭 How to Get There</h2>
        <ul>
          <li><strong>Location:</strong> {heritageSite.location}</li>
          <li><strong>From Nearest City:</strong> {heritageSite.directions.fromCity}</li>
          <li><strong>Public Transport:</strong> {heritageSite.directions.publicTransport}</li>
          <li><strong>Parking:</strong> {heritageSite.directions.parking}</li>
          <li><strong>Best Time to Visit:</strong> {heritageSite.directions.bestTime}</li>
        </ul>
      </section>

      {/* Call to Action */}
      <div className="cta-button">
        <button
          onClick={() => setShowModal(true)}
          aria-label="Start tasks for Cape Bolinao Lighthouse"
        >
          Start Task
        </button>
      </div>

      {/* Task Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>📝 Task Checklist</h3>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Toggle task: ${task.text}`}
                    />
                    <span>{task.text}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close task checklist"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Site; 