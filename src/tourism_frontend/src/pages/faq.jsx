import React, { useState } from "react";
import LandingPageHeader from "../components/LandingPage/LandingPageHeader";
import BottomNav from "../components/BottomNav1";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

const faqData = [
  {
    question: "What is Hackatour?",
    answer:
      "Hackatour is a unique web3 application that blends tourism with gamification. It allows you to explore various destinations in Pangasinan, complete exciting missions at these locations, and earn points and exclusive Soulbound Badges for your efforts.",
  },
  {
    question: "Is Hackatour exclusively held in Pangasinan?",
    answer:
      "Right now, Hackatour is primarily focused in Pangasinan. But don't worry, we're definitely looking to expand and bring Hackatour to other regions soon!",
  },
  {
    question: "How does Hackatour work?",
    answer:
      "Hackatour works in a few simple steps:\n\n1. Explore Destinations: Browse a list of cities and attractions in Pangasinan.\n2. Complete Missions: Visit physical locations and complete fun tasks.\n3. Earn Rewards: Get points and Soulbound Badges as proof of your achievements.",
  },
  {
    question: "What are 'points' and how do I use them?",
    answer:
      "Points are the in-app currency you earn by completing missions. You can use them to get discounts in our NFT shop. The more missions you complete, the more points you accumulate.",
  },
  {
    question: "What are Soulbound Badges (SBTs)?",
    answer:
      "Soulbound Badges are special, non-transferable NFTs that act as digital trophies for completing missions. They're permanent and cannot be sold, making them verifiable records of your adventures.",
  },
  {
    question: "What kind of missions can I expect?",
    answer:
      "Missions vary by location and can include:\n\n• Going to specific landmarks\n• Taking photos at designated spots\n• Buying souvenirs\n• Engaging with local businesses\n\nEach mission enhances your travel experience in Pangasinan.",
  },
  {
    question: "What are the benefits of owning a Hackatour NFT?",
    answer:
      "The benefits vary depending on the NFT's tier. Some offer exclusive perks like discounts at selected partner shops.",
  },
  {
    question: "Do I need crypto knowledge to use Hackatour?",
    answer:
      "Not at all! Hackatour is designed for everyone. You can start exploring missions and earning rewards without deep blockchain knowledge. We provide simple guides to help you along the way.",
  },
  {
    question: "Is Hackatour free to join?",
    answer:
      "Yes, joining Hackatour is completely free. You only need a mobile device and internet connection to start exploring. Some missions may involve small purchases, like souvenirs, but the app itself is free.",
  },
  {
    question: "How do I claim my rewards?",
    answer:
      "Rewards are automatically stored in your Hackatour account once you complete a mission. You can track your points, NFTs, and badges directly in your profile.",
  },
  {
    question: "Can I invite friends to join Hackatour?",
    answer:
      "Yes! You can invite friends to explore missions with you. In fact, some missions are more fun (and easier) when completed in groups.",
  },
];


  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen flex flex-col">
      <LandingPageHeader />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isOpen = openQuestion === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md transition"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    } text-gray-600`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`px-6 overflow-hidden text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
                    isOpen ? "max-h-[500px] py-4" : "max-h-0"
                  }`}
                >
                  {item.answer.split("\n").map((line, i) => (
                    <p key={i} className="mb-2">
                      {line.trim().startsWith("•") ||
                      /^\d+\./.test(line.trim()) ? (
                        <span className="pl-4">{line}</span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
