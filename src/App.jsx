import { useState } from "react";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import UserCard from "./components/UserCard";
import Footer from "./components/Footer";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error("User not found!", error);
      setUser(null);
      setError("User not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearUser = () => {
    setUser(null);
    setUsername("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 flex flex-col justify-between items-center">
      <div className="max-w-3xl m-auto flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-blue-600">
          GitHub User Search
        </h1>
        <form onSubmit={handleSubmit} className="m-4 flex w-[70%]">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-gray-800 text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className={`ml-4 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 flex items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <FaSearch className="text-xl" />
          </button>
          {user && (
            <button
              className="ml-4 p-3 rounded-full bg-zinc-600 hover:bg-red-600 text-white focus:outline-none disabled:opacity-50"
              onClick={handleClearUser}
              disabled={!user || loading}
            >
              <FaTrashAlt className="text-xl" />
            </button>
          )}
        </form>
        {error && (
          <p className="text-red-500 text-center mb-4 w-full">{error}</p>
        )}
        {user && <UserCard user={user} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
