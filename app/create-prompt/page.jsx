"use client";
import Form from "@components/Form";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
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
      type={"Create"}
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
