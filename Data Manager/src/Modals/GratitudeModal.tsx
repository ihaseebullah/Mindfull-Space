import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const GratitudeQuestionModal = ({ setShowGratitudeModal }) => {
  const [questionText, setQuestionText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const gratitudeData = {
        questionText,
        isActive,
        mood,
      };

      await axios.post(
        "http://localhost:1000/api/v1/mindfullspace/gratitude/create",
        gratitudeData
      );
      setSnackbarSeverity("success");
      setSnackbarMessage("Gratitude question uploaded successfully!");
    } catch (error) {
      console.error("Error uploading question:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to upload gratitude question.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      setShowGratitudeModal(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">
              Upload Gratitude Question
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Question Text"
                className="w-full mb-4 p-2 border rounded"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
              <div className="mb-4">
                <label className="mr-4">Active:</label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
              </div>
              <select
                className="w-full mb-4 p-2 border rounded"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Mood
                </option>
                <option value="grateful">Grateful</option>
                <option value="happy">Happy</option>
                <option value="content">Content</option>
                <option value="peaceful">Peaceful</option>
                <option value="neutral">Neutral</option>
              </select>
              <button
                type="submit"
                className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
            <button
              className="w-full mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              onClick={() => setShowGratitudeModal(false)}
            >
              Close
            </button>
          </>
        )}
      </div>

      {/* Snackbar for toast notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default GratitudeQuestionModal;
