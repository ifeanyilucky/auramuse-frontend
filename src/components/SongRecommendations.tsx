import {
  FaSpotify,
  FaYoutube,
  FaMusic,
  FaUser,
  FaTags,
  FaHeart,
  FaClock,
  FaKey,
  FaLightbulb,
  FaUsers,
  FaThumbsUp,
  FaChevronRight,
} from "react-icons/fa";
import { Song } from "../types/song";

interface SongRecommendationsProps {
  songs: Song[];
}

const SongRecommendations: React.FC<SongRecommendationsProps> = ({ songs }) => {
  return (
    <>
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50 overflow-hidden transition-all duration-300 hover:shadow-2xl mx-2 sm:mx-0"
        >
          <div className="p-4 sm:p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaMusic className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {song.title}
                </h3>
                <p className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                  <FaUser className="text-purple-500" />
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Song Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaTags className="text-purple-600 text-sm sm:text-base" />
                  </div>
                  <div>
                    <span className="font-medium">Genre:</span> {song.genre}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <FaHeart className="text-pink-600 text-sm sm:text-base" />
                  </div>
                  <div>
                    <span className="font-medium">Mood:</span> {song.mood}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FaClock className="text-indigo-600 text-sm sm:text-base" />
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {song.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaKey className="text-blue-600 text-sm sm:text-base" />
                  </div>
                  <div>
                    <span className="font-medium">Key:</span> {song.key}
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FaLightbulb className="text-yellow-600 text-sm sm:text-base" />
                    </div>
                    Why This Song?
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base pl-9 sm:pl-10">
                    {song.whyThisSong}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-green-600 text-sm sm:text-base" />
                    </div>
                    Similar Artists
                  </h4>
                  <div className="flex flex-wrap gap-2 pl-9 sm:pl-10">
                    {song.similarArtists.map((artist, index) => (
                      <span
                        key={index}
                        className="bg-purple-50 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FaThumbsUp className="text-red-600 text-sm sm:text-base" />
                    </div>
                    Perfect For
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base pl-9 sm:pl-10">
                    {song.perfectFor}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <a
                href={song.spotifyUrl}
                target={song.spotifyUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                disabled={!song.spotifyUrl}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                  !song.spotifyUrl ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaSpotify className="text-xl sm:text-2xl" />
                <span className="font-medium">Listen on Spotify</span>
                <FaChevronRight className="text-xs sm:text-sm" />
              </a>
              <a
                href={song.youtubeUrl}
                target={song.youtubeUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                disabled={!song.youtubeUrl}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                  !song.youtubeUrl ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaYoutube className="text-xl sm:text-2xl" />
                <span className="font-medium">Watch on YouTube</span>
                <FaChevronRight className="text-xs sm:text-sm" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SongRecommendations;
