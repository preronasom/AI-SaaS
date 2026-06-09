import { useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div
        className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
          sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="my-7 w-full">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-13 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>
          <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                    isActive
                      ? "bg-gradient-to-r from-[#73C2FB] to-[#2a748c] text-white"
                      : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.Icon
                      className={`w-4 h-4 ${isActive ? "text-white" : ""}`}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between gap-2">
          <div
            onClick={() => setShowProfile(true)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
            <h1 className="text-sm font-medium">{user.fullName}</h1>
          </div>
          <LogOut
            onClick={signOut}
            className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        </div>
      </div>

      {/* Custom Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Profile</h2>
              <X
                onClick={() => setShowProfile(false)}
                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <img
                src={user.imageUrl}
                className="w-20 h-20 rounded-full"
                alt=""
              />
              <h1 className="text-lg font-semibold">{user.fullName}</h1>
              <p className="text-sm text-gray-500">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <button
              onClick={signOut}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-200 py-2 rounded-lg hover:bg-red-100 transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
