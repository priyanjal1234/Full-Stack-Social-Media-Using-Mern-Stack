import { toast } from "react-toastify";
import api from "../api";

export const createPost = async function (formdata) {
  try {
    let createPostRes = await api.post("/posts/create", formdata, {
      withCredentials: true,
    });
    return createPostRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Creating Post");
    }
  }
};

export const getAllPosts = async function () {
  try {
    let getAllPostsRes = await api.get("/posts/all-posts", {
      withCredentials: true,
    });
    return getAllPostsRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching posts");
    }
  }
};

export const likePost = async function (id) {
  try {
    let likePostRes = await api.post(
      `/posts/post/like/${id}`,
      {},
      { withCredentials: true }
    );
    return likePostRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error liking post");
    }
    if (error.response && error.response.status === 404) {
      toast.error("Post not found");
    }
  }
};

export const deletePost = async function (id) {
  try {
    let deletePostRes = await api.delete(`/posts/delete/${id}`, {
      withCredentials: true,
    });
    return deletePostRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
      toast.error("Error deleting post")
    }
  }
};



export const getPost = async function (id) {
  try {
    let getPostRes = await api.get(`/posts/specific/post/${id}`, {
      withCredentials: true,
    });
    return getPostRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
      console.log("Error fetching post")
    }
  }
};




