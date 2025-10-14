import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImage from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then(async (token) => {
      console.log("Token:", token);

      const res = await fetch("http://localhost:3000/api/ai/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: "Generate an image of a cat in Studio Ghibli style",
        }),
      });

      const data = await res.json();
      console.log("AI Response:", data);
    });
  }, []);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImage />} />

          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
