import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <p className="flex items-center gap-1 text-md">
        made with <FaHeart className="text-red-600" />
      </p>
      <p className="text-sm ">
        <a
          href="https://push4ck-bio.netlify.app/"
          target="_blank"
          className="hover:text-indigo-600"
        >
          @push4ck
        </a>
      </p>
    </div>
  );
}

export default Footer;
