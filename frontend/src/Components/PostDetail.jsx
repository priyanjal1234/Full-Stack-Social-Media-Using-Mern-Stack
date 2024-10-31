import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../services/PostService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";


function PostDetail() {
  let { id } = useParams();

  const [post, setpost] = useState({});

  useEffect(() => {
    async function fetchPostDetail() {
      let fetchPostDetailRes = await getPost(id);
      setpost(fetchPostDetailRes.data);
    }
    fetchPostDetail();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center flex-col">
      <Link to={"/home"} className="text-blue-600">
        Go to home
      </Link>

      <div className="w-[400px] h-[400px] border-2 border-white">
        <Swiper spaceBetween={10} slidesPerView={1} style={{ height: "100%" }}>
          {post?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Post image ${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PostDetail;
