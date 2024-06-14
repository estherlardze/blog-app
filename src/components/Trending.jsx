import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';
import { CiBookmark } from "react-icons/ci";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; 
  const textLength = text?.split(/\s+/).length; 
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  return `${readingTime} min read`;
};

const Trending = ({ blogs }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -400, behavior: "smooth" });
    } else if (direction === "right") {
      current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  console.log("blogs from trending: ", blogs);
  return (
    <section className="">
      <div
        className="overflow-x-scroll flex gap-6 container scroll-container"
        ref={scrollRef}
      >
        {blogs.map((blog) => (
          <article key={blog.id} className="relative ">
            {blog.trending === "yes" && (
              <Link to={`/blog/${blog.id}`} className="">
                <img
                  src={blog.image}
                  alt="thumbnail"
                  className="min-w-[330px] h-[220px] rounded-md"
                />
                <div className="mt-3">
                  <h1 className="capitalize text-lg text-black/80 font-bold">{blog.title}</h1>
                  <div className="flex gap-[6px] items-center text-black/70 text-center text-[12px] my-2">
                    <p>{blog.author}</p>
                    {" - "}
                    <p>
                    {formatDistanceToNow(blog.timestamps.toDate(), { addSuffix: true })}
                    </p>
                    <div className="bg-black/60 h-3 w-[1px]"></div>
                    <p>{calculateReadingTime(blog.content)}</p>
                    <div className="bg-black/60 h-3 w-[1px]"></div>
                    <CiBookmark size={16}/>
                  </div>
                </div>
              </Link>
            )}
          </article>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-6">
        <IoIosArrowBack
          size={27}
          className="hover:bg-black/10 rounded-full p-1 cursor-pointer transition-all duration-500"
          onClick={() => scroll("left")}
        />
        <IoIosArrowForward
          size={27}
          className="hover:bg-black/10 rounded-full p-1 cursor-pointer transition-all duration-500"
          onClick={() => scroll("right")}
        />
      </div>
    </section>
  );
};

export default Trending;
