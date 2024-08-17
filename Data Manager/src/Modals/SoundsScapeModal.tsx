import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SoundscapeModal = ({ setShowSoundscapeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFileUpload = async (file, resourceType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qcp7ekpy");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dkscouusb/${resourceType}/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let thumbnailUrl = "";
    let mediaUrl = "";

    try {
      if (thumbnail) {
        thumbnailUrl = await handleFileUpload(thumbnail, "image");
      }

      if (media) {
        mediaUrl = await handleFileUpload(media, "video");
      }

      const soundscapeData = {
        title,
        description,
        author,
        thumbnailLink: thumbnailUrl,
        mediaLink: mediaUrl,
      };

      await axios.post(
        "http://localhost:1000/api/v1/mindfullspace/soundscape/create",
        soundscapeData
      );

      setSnackbarSeverity("success");
      setSnackbarMessage("Soundscape uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to upload soundscape.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      setShowSoundscapeModal(false);
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
              Upload Soundscape
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className="w-full mb-4 p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full mb-4 p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                className="w-full mb-4 p-2 border rounded"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label className="block mb-2">Upload Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
              <label className="block mb-2">Upload Media (Audio):</label>
              <input
                type="file"
                accept="audio/*"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setMedia(e.target.files[0])}
              />
              <button
                type="submit"
                className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
            <button
              className="w-full mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              onClick={() => setShowSoundscapeModal(false)}
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

export default SoundscapeModal;
