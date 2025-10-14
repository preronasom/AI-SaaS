import { Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] p-6 flex flex-col md:flex-row gap-6 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:max-w-lg p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 text-[#73C2FB]" />
          <h1 className="text-lg font-medium text-slate-700">
            AI Title Generator
          </h1>
        </div>

        <label className="block mt-6 text-sm font-medium text-slate-600">
          Keyword
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 mt-2 rounded-md border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#73C2FB]/50"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <label className="block mt-5 text-sm font-medium text-slate-600">
          Category
        </label>
        <div className="mt-3 flex gap-2 flex-wrap">
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 rounded-full cursor-pointer transition border ${
                selectedCategory === item
                  ? "bg-[#73C2FB]/20 text-[#1e3a8a] border-[#73C2FB]/50"
                  : "text-slate-500 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#b33984] to-[#4ebbe2] hover:opacity-90 text-white px-4 py-2 mt-6 text-sm rounded-lg transition"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate title
        </button>
      </form>

      {/* Right column */}
      <div className="w-full md:max-w-xl p-6 bg-white rounded-xl flex flex-col border border-gray-100 shadow-sm min-h-96 max-h-[600px]">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-[#4aa6e7]" />
          <h1 className="text-lg font-medium text-slate-700">
            Generated Titles
          </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center text-center text-slate-400 mt-8">
            <div className="flex flex-col items-center gap-4">
              <Hash className="w-8 h-8" />
              <p className="text-sm">
                Enter a keyword and click “Generate title” to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 h-full overflow-y-auto text-sm text-slate-600">
            <div className="reset-tw prose prose-sm max-w-full">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
