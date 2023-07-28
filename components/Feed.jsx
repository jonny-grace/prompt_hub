"use client";
import React, { useState, useEffect } from "react";
import PromptBox from "./PromptBox";

const PromptCardList = ({ prompts, handleTagClick }) => {
  // console.log(prompts);
  return (
    <div className=" mt-16 prompt_layout">
      {prompts.map((prompt) => {
        return (
          <PromptBox
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleChange = () => {};
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    };

    fetchPrompts();
  }, []);
  return (
    <section className="feed">
      <form className="  w-full flex-center">
        <input
          type=" text"
          placeholder=" Search for a tag or a username"
          value={searchText}
          onChange={handleChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList prompts={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
