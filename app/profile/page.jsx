"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [promts, setPrompts] = useState([]);
  console.log(session?.user.id);
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);
  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filteredPrompts = promts.filter((p) => p._id !== post._id);
        // setPrompts(filteredPrompts);
        console.log(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to my personalized profile page"
      data={promts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
