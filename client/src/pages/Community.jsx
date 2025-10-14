import React, { useEffect, useState, useCallback } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = useCallback(() => {
    setCreations(dummyPublishedCreationData);
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User:", user);
      fetchCreations();
    }
  }, [user, fetchCreations]);

  const imageLikeToggle = (id) => {
    setCreations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.likes.includes(user.id)
                ? item.likes.filter((uid) => uid !== user.id)
                : [...item.likes, user.id],
            }
          : item
      )
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {creations.map((creation, index) => (
          <div key={index} className="relative group w-full">
            <img
              src={creation.content}
              alt=""
              className="w-full h-60 object-cover rounded-lg"
            />

            <div className="absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg transition">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
