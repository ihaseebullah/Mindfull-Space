import { Chip, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MeditationCard = ({
  meditation,
  onPlayPause,
  isPlaying,
  currentAudio,
}) => {
  const isCurrent = currentAudio?.src === meditation.mediaLink;

  return (
    <div className="max-w-xs bg-white bg-opacity-50 backdrop-filter backdrop-blur-md shadow-lg rounded-lg overflow-hidden m-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="w-full h-48 relative">
        <img
          className="w-full h-full object-cover"
          src={meditation.thumbnailLink}
          alt={meditation.title}
        />
        <button
          onClick={() => onPlayPause(meditation.mediaLink)}
          className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{meditation.title}</h3>
        <p className="text-gray-600 mb-1">Author: {meditation.author}</p>
        <p className="text-gray-600 mb-1">Duration: {meditation.duration}</p>
        <p className="text-gray-700">{meditation.description}</p>
        {isCurrent && (
          <input
            type="range"
            value={currentAudio?.currentTime}
            max={currentAudio?.duration || 0}
            className="w-full mt-4"
            onChange={(e) => {
              currentAudio.currentTime = e.target.value;
            }}
          />
        )}
        {meditation.tags.map((tag) => {
          return <Chip label={tag} className="mx-1" />;
        })}
      </div>
    </div>
  );
};

const MeditationApp = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meditations, setMeditations] = useState([]);
  const [genre, setGenres] = useState("grateful");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:1000/api/v1/mindfullspace/meditation/get?genre=${genre}`
      )
      .then((res) => {
        setMeditations(res.data);
        setLoading(false);
      });
  }, [genre]);
  const handlePlayPause = (audioUrl) => {
    if (currentAudio && currentAudio.src === audioUrl) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudio = new Audio(audioUrl);
      newAudio.play();
      setCurrentAudio(newAudio);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentAudio) {
      const handleEnded = () => {
        setIsPlaying(false);
      };
      currentAudio.addEventListener("ended", handleEnded);
      return () => {
        currentAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentAudio]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1526724038726-3007ffb8025f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-filter backdrop-blur-md"></div>
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4">Meditations</h1>
          <p className="text-gray-700">
            Discover a collection of guided meditations to help you relax and
            find peace.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {["grateful", "happy", "content", "peaceful", "neutral"].map(
            (tag) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setGenres(tag);
                  }}
                >
                  <Chip
                    variant={genre === tag ? "" : "outlined"}
                    label={tag}
                    className="mx-1"
                  />
                </div>
              );
            }
          )}
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {loading === true ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress className="mx-5" /> I would say patience is the
              key to get data
            </div>
          ) : (
            meditations.length > 0 &&
            meditations.map((meditation, index) => (
              <MeditationCard
                key={index}
                meditation={meditation}
                onPlayPause={handlePlayPause}
                isPlaying={isPlaying}
                currentAudio={currentAudio}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MeditationApp;
