import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Blogs from "../components/Blogs";
import { db } from "../firebase";
import Trending from "../components/Trending";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import Popular from "../components/Popular";
import Loader from "../components/Loader";



const Home = ({ user, setActive }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unSub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push({ ...doc.get("tags") });
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => console.log(error)
    );

    return () => {
      unSub();
    };
  }, []);

  //console.log(blogs)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        setLoading(false);
        toast.success("Blog Deleted Successfully!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main>
      <div className="bg-blog bg-cover bg-center bg-no-repeat h-[80vh] w-full">
        <div className="bg-black/60 w-full h-full flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center w-[90%] md:w-[45%] mx-auto leading-[2.6rem] sm:leading-[4rem]">
            A Blog for Passionate people and Content Lovers
          </h1>
        </div>
      </div>


     <section className="mt-[70px]">
     {loading ? (
        <Loader/>
      ) : (
        <section className="flex flex-col items-center">
          <div className="w-[90%] mx-auto">
            <h1 className="mb-3 pb-2 border-b-2 text-3xl font-bold">Trending Blogs</h1>
            <Trending blogs={blogs} />
          </div>

          <div className="grid grid-cols-3 gap-x-8 mt-4 w-[90%] mx-auto">
            <article className="col-span-3 lg:col-span-2">
            <h1 className='mb-3 pb-2 border-b-2 text-3xl font-bold'>Daily Blogs</h1>
              <Blogs blogs={blogs} handleDelete={handleDelete} user={user} />
            </article>

            <article className="col-span-3 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col">
              <div>
                <Tags tags={tags} />
              </div>
              <div>
                <Popular blogs={blogs} />
              </div>
            </article>
          </div>
        </section>
      )}
     </section>
    </main>
  );
};

export default Home;
