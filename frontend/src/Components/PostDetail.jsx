import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'; // Import Swiper styles

function PostDetail() {
  let { id } = useParams();
  let { user } = useSelector((state) => state.user);
  let { allPosts } = useSelector((state) => state.post);

  console.log(allPosts)
  
  let post =
    allPosts &&
    allPosts.filter((post) => post._id === id.toString())[0];

  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center text-white flex-col gap-5">
      <Link to={'/home'} className="text-blue-600">Go to home</Link>
    <h1 className="text-3xl font-semibold">This is read only</h1>
    <div
      className="w-full md:w-[390px] h-fit border-2 border-white mb-5"
      key={post?._id}
    >
      <div className="w-full h-[70px] border-b-2 border-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
            {post?.user?.profilePicture ? (
              <img
                src={post?.user?.profilePicture}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <img
                src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                alt=""
              />
            )}
          </div>
          <h2>{post?.user?.username}</h2>
          <p>
            {post.createdAt
              ? formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })
              : ""}
          </p>
        </div>
        
      </div>
      <div className="w-full h-[390px] border-b-2 border-white">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          style={{ height: "100%" }}
        >
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
    </div>
  );
}

export default PostDetail;
