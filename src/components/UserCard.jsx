import PropTypes from "prop-types"; // Import PropTypes

import { FaGithub, FaGlobe, FaTwitter } from "react-icons/fa";

const UserCard = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-2xl">
      <div className="flex justify-center">
        <img
          src={user.avatar_url}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mt-4 text-white">
        {user.login}
      </h2>
      {user.bio && <p className="text-center mt-2 text-gray-300">{user.bio}</p>}
      {user.location && (
        <p className="text-center text-gray-400 mt-2">
          <span className="mr-1">📍</span>
          {user.location}
        </p>
      )}
      <div className="flex justify-center mt-4">
        <div className="mr-8">
          <p className="text-white text-center">{user.followers}</p>
          <p className="text-sm text-gray-400 text-center">Followers</p>
        </div>
        <div>
          <p className="text-white text-center">{user.public_repos}</p>
          <p className="text-sm text-gray-400 text-center">Repositories</p>
        </div>
      </div>
      <LinksList user={user} />
    </div>
  );
};

// Add PropTypes validation for UserCard component
UserCard.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    bio: PropTypes.string,
    location: PropTypes.string,
    followers: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
  }).isRequired,
};

const LinksList = ({ user }) => {
  const links = [
    { label: <FaGithub />, url: user.html_url },
    { label: <FaGlobe />, url: user.blog },
    {
      label: <FaTwitter />,
      url: `https://twitter.com/${user.twitter_username}`,
    },
  ];

  return (
    <div className="mt-4 flex justify-center flex-wrap gap-8">
      {links
        .filter((link) => link.url)
        .map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-4xl text-white bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 transition duration-300 ease-in-out shadow-md"
          >
            {link.label}
          </a>
        ))}
    </div>
  );
};

// Add PropTypes validation for LinksList component
LinksList.propTypes = {
  user: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    blog: PropTypes.string.isRequired,
    twitter_username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
