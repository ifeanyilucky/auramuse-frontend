import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaHome,
  FaTrashAlt,
  FaHistory,
  FaMusic,
} from "react-icons/fa";
import SongRecommendations from "../components/SongRecommendations";
import { Song } from "../types/song";

export default function History() {
  const navigate = useNavigate();
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    // Load saved songs from localStorage
    const history = JSON.parse(localStorage.getItem("songHistory") || "[]");
    setSavedSongs(history);
  }, []);

  const deleteSong = (songId: string) => {
    const updatedHistory = savedSongs.filter((song) => song.id !== songId);
    setSavedSongs(updatedHistory);
    localStorage.setItem("songHistory", JSON.stringify(updatedHistory));
  };

  const clearAllHistory = () => {
    setShowClearModal(true);
  };

  const confirmClearHistory = () => {
    setSavedSongs([]);
    localStorage.removeItem("songHistory");
    setShowClearModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4 md:p-8">
      {/* Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl border border-purple-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FaTrashAlt className="text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
                Clear History
              </h3>
            </div>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              Are you sure you want to clear all your song history? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearHistory}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaHistory className="text-white text-lg md:text-2xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Song History
            </h1>
          </div>
        </div>
        <div className="flex gap-4 mb-12 justify-end">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
          >
            <FaHome />
            <span className="font-medium text-sm md:text-base">
              Back to Home
            </span>
          </button>
          <button
            onClick={clearAllHistory}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <FaTrashAlt />
            <span className="font-medium text-sm md:text-base">
              Clear All History
            </span>
          </button>
        </div>
        {savedSongs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-purple-100/50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaMusic className="text-purple-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                No History Found
              </h2>
              <p className="text-gray-600 max-w-md">
                Your song generation history will appear here. Start creating
                some music to see your history!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {savedSongs.map((song) => (
              <div key={song.id} className="relative group">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => deleteSong(song.id)}
                    className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    title="Delete from history"
                  >
                    <FaTrash />
                  </button>
                </div>
                <SongRecommendations songs={[song]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
