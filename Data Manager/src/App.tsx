import React, { useEffect, useState } from "react";
import MeditationModal from "./Modals/MeditationModal";
import axios from "axios";
import SoundscapeModal from "./Modals/SoundsScapeModal";
import GratitudeQuestionModal from "./Modals/GratitudeModal";
import MeditationApp from "./Components/Meditation";
import { Link } from "react-router-dom";

function App() {
  const [showMeditationModal, setShowMeditationModal] = useState(false);
  const [showSoundscapeModal, setShowSoundscapeModal] = useState(false);
  const [showGratitudeModal, setShowGratitudeModal] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1526724038726-3007ffb8025f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-10 shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-8">
          Mindful Space Data Manager
        </h1>
        <h6 className="text-2xl md:2text-xl font-extrabold  text-gray-900 mb-2">
          Upload Data
        </h6>
        <div className="space-y-4 space-x-4">
          <button
            className="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300"
            onClick={() => setShowMeditationModal(true)}
          >
            Upload Meditation
          </button>
          <button
            className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300"
            onClick={() => setShowSoundscapeModal(true)}
          >
            Upload Soundscape
          </button>
          <button
            className="px-8 py-3 bg-purple-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-purple-600 hover:shadow-xl transition duration-300"
            onClick={() => setShowGratitudeModal(true)}
          >
            Upload Gratitude Questions
          </button>
        </div>
        <h6 className="text-2xl md:2text-xl font-extrabold  text-gray-900 mb-2 mt-8">
          View Data
        </h6>
        <div className="space-y-4 space-x-4">
          <Link to="/meditation">
            <button className="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300">
            Manage Meditation
            </button>
          </Link>
          <Link to="/sound-scapes">
            <button
              className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300"
            >
              Manage Soundscape
            </button>
          </Link>
          <Link to="/sound-scapes">
            <button
              className="px-8 py-3 bg-purple-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-purple-600 hover:shadow-xl transition duration-300"
            >
              Manage Gratitude Questions
            </button>
          </Link>
        </div>
      </div>

      {/* Meditation Modal */}
      {showMeditationModal && (
        <MeditationModal setShowMeditationModal={setShowMeditationModal} />
      )}

      {/* Soundscape Modal */}
      {showSoundscapeModal && (
        <SoundscapeModal setShowSoundscapeModal={setShowSoundscapeModal} />
      )}

      {/* Gratitude Modal */}
      {showGratitudeModal && (
        <GratitudeQuestionModal setShowGratitudeModal={setShowGratitudeModal} />
      )}
    </div>
  );
}

export default App;
