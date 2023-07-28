"use client";
import Form from "@components/Form";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptData = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    };

    if (promptId) getPromptData();
  }, promptId);

  const editPost = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    if (!promptId) alert("Prompt Id not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Form
      type={"Edit"}
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={editPost}
    />
  );
};

export default EditPrompt;
