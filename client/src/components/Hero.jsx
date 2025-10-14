import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-6 sm:px-20 xl:px-36 py-20 min-h-screen flex items-center bg-gradient-to-br from-[#fef9f5] via-[#f3f4f6] to-[#e5f4ff]">
      {/* Text content */}
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-gray-900">
          Supercharge your creativity <br />
          with <span className="text-primary">smart AI tools</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg max-w-2xl">
          Whether you're designing, writing, or brainstorming, our intuitive
          platform helps you get more done, faster — powered by cutting-edge AI.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
          <button
            onClick={() => navigate("/ai")}
            className="bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-xl hover:shadow-xl transition hover:scale-[1.02]"
          >
            <Sparkles size={18} /> Launch AI Studio
          </button>
          <button className="bg-white border border-gray-300 px-6 py-3 rounded-xl hover:shadow transition hover:scale-[1.02]">
            Live Demo
          </button>
        </div>

        {/* Badge section */}
        <div className="flex items-center gap-3 pt-6 text-sm text-gray-600">
          <img src={assets.user_group} alt="users" className="h-7" />
          <span>10,000+ creators trust us daily</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
