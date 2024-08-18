import axios from "axios";
import React, { useState, useEffect } from "react";
import { Chip, CircularProgress } from "@mui/material";

const GratitudeQuestionCard = ({ question }) => {
  return (
    <div className="max-w-lg bg-white bg-opacity-50 backdrop-filter backdrop-blur-md shadow-lg rounded-lg overflow-hidden m-4 p-6">
      <h3 className="text-xl font-semibold mb-2">
        Question {question.questionNumber}
      </h3>
      <p className="text-gray-700 mb-4">{question.questionText}</p>
      <Chip
        label={question.mood.charAt(0).toUpperCase() + question.mood.slice(1)}
        className="bg-blue-500 text-white"
      />
      {question.isActive ? (
        <Chip label="Active" className="ml-2 bg-green-500 text-white" />
      ) : (
        <Chip label="Inactive" className="ml-2 bg-red-500 text-white" />
      )}
    </div>
  );
};

const GratitudeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [mood, setMood] = useState("grateful");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:1000/api/v1/mindfullspace/gratitude/get-by-mood/${mood}`
      )
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching gratitude questions:", err);
      });
  }, [mood]);

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
          <h1 className="text-4xl font-bold mb-4">Gratitude Questions</h1>
          <p className="text-gray-700">
            Reflect on your day with these gratitude questions designed to bring
            positivity and mindfulness.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {["grateful", "happy", "content", "peaceful", "neutral"].map(
            (tag) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMood(tag);
                  }}
                >
                  <Chip
                    variant={mood === tag ? "" : "outlined"}
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
              <CircularProgress className="mx-5" /> I would say patience is the key to get data
            </div>
          ) : (
            questions.length > 0 &&
            questions.map((question, index) => (
              <GratitudeQuestionCard key={index} question={question} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GratitudeQuestions;
