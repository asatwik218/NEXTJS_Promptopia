"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async () => {
    const response = await fetch(`api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    
    if(session?.user.id)
        fetchPosts();
  
    
  }, [])
  

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);

  };

  const handleDelete = async(post) => {

    const hasComfirmed = confirm("are you sure you want to delete this prompt?");

    if(hasComfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        } )


        const filteredPosts = posts.filter((p)=>post._id!=p._id )
        setPosts(filteredPosts)
      } catch (err) {
        console.log(err)
      }
    }

  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
