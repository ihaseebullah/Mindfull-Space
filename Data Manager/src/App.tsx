import React, { useEffect, useState } from "react";
import MeditationModal from "./Modals/MeditationModal";
import axios from "axios";
import SoundscapeModal from "./Modals/SoundsScapeModal";

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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Upload Gratitude Questions
            </h2>
            {/* Form elements go here */}
            <button
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              onClick={() => setShowGratitudeModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
