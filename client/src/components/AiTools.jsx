import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleToolClick = (toolPath) => {
    if (user) {
      navigate(toolPath);
    } else {
      openSignIn();
    }
  };

  return (
    <section className="px-6 sm:px-16 xl:px-32 my-28">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-[36px] sm:text-[44px] font-extrabold text-slate-800 tracking-tight">
          Discover AI Magic
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
          Explore a collection of intelligent tools designed to boost your
          creativity and productivity.
        </p>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => handleToolClick(tool.path)}
            className="w-full max-w-xs bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group"
          >
            {/* Icon Wrapper */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-xl shadow-inner text-white mb-6 group-hover:rotate-3 transition-transform duration-200"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-6 h-6" />
            </div>

            {/* Tool Info */}
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
