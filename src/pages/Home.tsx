import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  FaMusic,
  FaHistory,
  FaPalette,
  FaHeart,
  FaSadTear,
  FaBolt,
  FaWind,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";
import SongRecommendations from "../components/SongRecommendations";
import ErrorAlert from "../components/ErrorAlert";
import { Song } from "../types/song";
import { MUSIC_GENRES, INSTRUMENTS, customStyles } from "../utils";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    mood: {
      emotion: {
        happiness: 50,
        sadness: 50,
        energy: 50,
        calmness: 50,
      },
      color: "#FF5733",
      description: "",
    },
    customization: {
      genre: [] as string[],
      instruments: [] as string[],
      tempo: 120,
      energyLevel: 50,
      duration: 180,
      includeLyrics: true,
    },
  });

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showResults]);

  const handleEmotionChange = (emotion: string, value: number) => {
    setFormData({
      ...formData,
      mood: {
        ...formData.mood,
        emotion: {
          ...formData.mood.emotion,
          [emotion]: value,
        },
      },
    });
  };

  const handleCustomizationChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      customization: {
        ...formData.customization,
        [field]: value,
      },
    });
  };

  const generateSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/songs/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate songs");
      }

      const data = await response.json();

      if (!data.songs || !Array.isArray(data.songs)) {
        throw new Error("Invalid response format from server");
      }

      setGeneratedSongs(data.songs);
      setShowResults(true);

      // Store in localStorage for history
      const history = JSON.parse(localStorage.getItem("songHistory") || "[]");
      localStorage.setItem(
        "songHistory",
        JSON.stringify([...history, ...data.songs])
      );
    } catch (error) {
      console.error("Error generating songs:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate songs. Please try again."
      );
      setGeneratedSongs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setGeneratedSongs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-2 sm:p-4 md:p-6 lg:p-8">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaMusic className="text-white text-xl sm:text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Auramuse
            </h1>
          </div>
          <button
            onClick={() => navigate("/history")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaHistory />
            <span className="font-medium">History</span>
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {!showResults ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10 border border-purple-100/50">
            {/* Mood Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaHeart className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  How are you feeling?
                </h2>
              </div>

              {/* Emotion Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 bg-purple-50/50 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FaHeart className="text-red-500 text-lg" />
                    <label className="text-gray-700 font-medium">
                      Happiness
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.mood.emotion.happiness}
                    onChange={(e) =>
                      handleEmotionChange("happiness", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <span className="text-sm text-gray-500 block text-right">
                    {formData.mood.emotion.happiness}%
                  </span>
                </div>

                <div className="space-y-3 bg-blue-50/50 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FaSadTear className="text-blue-500 text-lg" />
                    <label className="text-gray-700 font-medium">Sadness</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.mood.emotion.sadness}
                    onChange={(e) =>
                      handleEmotionChange("sadness", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm text-gray-500 block text-right">
                    {formData.mood.emotion.sadness}%
                  </span>
                </div>

                <div className="space-y-3 bg-yellow-50/50 p-4 rounded-xl hover:bg-yellow-50 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FaBolt className="text-yellow-500 text-lg" />
                    <label className="text-gray-700 font-medium">Energy</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.mood.emotion.energy}
                    onChange={(e) =>
                      handleEmotionChange("energy", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                  />
                  <span className="text-sm text-gray-500 block text-right">
                    {formData.mood.emotion.energy}%
                  </span>
                </div>

                <div className="space-y-3 bg-green-50/50 p-4 rounded-xl hover:bg-green-50 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FaWind className="text-green-500 text-lg" />
                    <label className="text-gray-700 font-medium">
                      Calmness
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.mood.emotion.calmness}
                    onChange={(e) =>
                      handleEmotionChange("calmness", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="text-sm text-gray-500 block text-right">
                    {formData.mood.emotion.calmness}%
                  </span>
                </div>
              </div>

              {/* Color and Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 bg-purple-50/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FaPalette className="text-purple-500 text-lg" />
                    <label className="text-gray-700 font-medium">
                      Mood Color
                    </label>
                  </div>
                  <input
                    type="color"
                    value={formData.mood.color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mood: { ...formData.mood, color: e.target.value },
                      })
                    }
                    className="w-full h-12 rounded-lg cursor-pointer shadow-inner"
                  />
                </div>

                <div className="space-y-3 bg-purple-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    How are you feeling?
                  </label>
                  <textarea
                    value={formData.mood.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mood: { ...formData.mood, description: e.target.value },
                      })
                    }
                    placeholder="Describe your current mood..."
                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 shadow-inner"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            {/* Customization Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <FaMusic className="text-pink-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Customize Your Music
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Genre Selection */}
                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">Genre</label>
                  <Select
                    isMulti
                    options={MUSIC_GENRES.map((genre) => ({
                      value: genre.toLowerCase(),
                      label: genre,
                    }))}
                    value={formData.customization.genre.map((genre) => ({
                      value: genre,
                      label: genre.charAt(0).toUpperCase() + genre.slice(1),
                    }))}
                    onChange={(selectedOptions) => {
                      handleCustomizationChange(
                        "genre",
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                    styles={customStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Search and select genres..."
                    isSearchable
                    isClearable
                  />
                </div>

                {/* Instruments Selection */}
                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    Instruments
                  </label>
                  <Select
                    isMulti
                    options={INSTRUMENTS.map((instrument) => ({
                      value: instrument.toLowerCase(),
                      label: instrument,
                    }))}
                    value={formData.customization.instruments.map(
                      (instrument) => ({
                        value: instrument,
                        label:
                          instrument.charAt(0).toUpperCase() +
                          instrument.slice(1),
                      })
                    )}
                    onChange={(selectedOptions) => {
                      handleCustomizationChange(
                        "instruments",
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                    styles={customStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Search and select instruments..."
                    isSearchable
                    isClearable
                  />
                </div>

                {/* Tempo and Energy Level */}
                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    Tempo (BPM)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="200"
                    value={formData.customization.tempo}
                    onChange={(e) =>
                      handleCustomizationChange(
                        "tempo",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 shadow-inner"
                  />
                </div>

                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    Energy Level
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.customization.energyLevel}
                    onChange={(e) =>
                      handleCustomizationChange(
                        "energyLevel",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                  />
                  <span className="text-sm text-gray-500 block text-right">
                    {formData.customization.energyLevel}%
                  </span>
                </div>

                {/* Duration and Lyrics */}
                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="600"
                    value={formData.customization.duration}
                    onChange={(e) =>
                      handleCustomizationChange(
                        "duration",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 shadow-inner"
                  />
                </div>

                <div className="space-y-3 bg-pink-50/50 p-4 rounded-xl">
                  <label className="text-gray-700 font-medium">
                    Include Lyrics
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.customization.includeLyrics}
                      onChange={(e) =>
                        handleCustomizationChange(
                          "includeLyrics",
                          e.target.checked
                        )
                      }
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
                    />
                    <span className="text-gray-700">Yes</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Generate Button */}
            <button
              onClick={generateSong}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg font-medium"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FaMusic className="text-xl" />
                  Generate Song
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleBackToForm}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaArrowLeft />
              <span className="font-medium">Back to Form</span>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              Generated Songs
            </h2>
            <SongRecommendations songs={generatedSongs} />
          </div>
        )}
      </div>
    </div>
  );
}
