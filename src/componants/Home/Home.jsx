import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReviewCard from "../../Cards/ReviewCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import FeaturedPostCard from "./FeaturedPostCard";

const Home = () => {
  const { forumPosts } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data: featuredPostData } = useQuery({
    queryKey: ["featured-posts"],
    queryFn: () => axiosPublic.get("/most-booked"),
  });

  const {data: reviews = []} = useQuery({
    queryKey: ['reviews-data'],
    queryFn: () => axiosPublic.get("/reviews")
  })

  // console.log(reviews.data);

  const handleNewslatter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/newslatter`, { email })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Successfully subscribed!");
          e.target.email.value = "";
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div>
      <section className="mt-4 bg-gray-800 min-h-96">
        <div className="max-w-screen-2xl mx-auto py-20 relative">
          <div className="absolute z-20">
            <h1 className="text-gray-200 text-6xl font-bold tracking-wide font-Bebas bg-gray-400 bg-opacity-80 p-4 rounded">
              Train with the <br />
              best personal trainers
            </h1>
            <p className="text-gray-800 sm:text-gray-200 my-1">
              FitNova is the best place in the area to get top-notch training
              services!
            </p>
            <button className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300">
              <Link to="/all-classes" className="w-full h-full">
                Book your class today!
              </Link>
            </button>
          </div>
          <img
            className="absolute w-80 right-4 top-10 z-10 rounded"
            src="/trainer.jpeg"
            alt=""
          />
        </div>
      </section>
      <section className="flex justify-center gap-2 my-4">
        <div className="h-60 w-80 border border-gray-400 rounded flex flex-col justify-center">
          <h2 className="text-4xl font-Bebas text-center mt-4">Yoga Basics</h2>
          <p className="text-center">
            Perfect for beginners, this class introduces fundamental yoga poses,
            breathing exercises, and relaxation techniques. Build strength,
            flexibility, and mindfulness in a welcoming environment.
          </p>
        </div>
        <div className="h-60 w-80 border border-gray-400 rounded flex flex-col justify-center">
          <h2 className="text-4xl font-Bebas text-center mt-4">
            Cardio Kickboxing
          </h2>
          <p className="text-center">
            High-energy workout combining punching and kicking movements with
            cardio drills. Burn calories, improve coordination, and have a
            blast.
          </p>
        </div>
        <div className="h-60 w-80 border border-gray-400 rounded flex flex-col justify-center">
          <h2 className="text-4xl font-Bebas text-center mt-4">
            Strength Training
          </h2>
          <p className="text-center">
            Build muscle and strength through targeted exercises using free
            weights, machines, and bodyweight. Learn proper form to maximize
            results and prevent injury.
          </p>
        </div>
      </section>
      <section className="max-w-screen-md mx-auto my-10">
        <h2 className="text-2xl tracking-wide text-center my-4 font-semibold">
          Testimonials 🏆
        </h2>
        <Swiper
          navigation={true}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper">

            {
              reviews.data?.map((item, i)=><SwiperSlide key={i}>
              <ReviewCard item={item}/>
            </SwiperSlide>)
            }
          
          
        </Swiper>
      </section>
      <section className="bg-gray-700 py-10 grid justify-center my-4">
        <h2 className="text-2xl tracking-wide text-center font-semibold text-gray-200">
          About us
        </h2>
        <p className="max-w-screen-sm text-gray-300 text-center">
          FitNova has the best trainers in the whole area, we are a passionate
          team dedicated to helping you achieve your fitness goals.
        </p>
      </section>

      <section className="max-w-screen-md mx-auto">
        <h2 className="text-2xl tracking-wide text-center font-semibold text-gray-800">
          Recent forum posts
        </h2>

        <div className="flex gap-2 flex-wrap my-2">
          {forumPosts?.data?.map((it) => (
            <div key={it._id} className="bg-gray-300 px-8 py-4 w-fit rounded">
              <h3 className="text-xl">{it.postTitle}</h3>
              <p>This is me ...</p>
            </div>
          ))}
          <button className="bg-gray-400 px-8 py-4 w-fit rounded">
            <Link to="/forum">See More</Link>
          </button>
        </div>
      </section>
      <section className="max-w-screen-2xl mx-auto my-4">
        <h2 className="text-2xl text-center my-4">Featured Classes</h2>

        <div className=" flex gap-4">
          {featuredPostData?.data?.map((item, i) => (
            <FeaturedPostCard data={item} key={i} />
          ))}
        </div>
      </section>

      <section className="bg-gray-700 py-10 grid justify-center">
        {/* newsletter */}
        <h2 className="text-2xl tracking-wide text-center font-semibold text-gray-200">
          Subscribe to our newsletter 📕
        </h2>
        <p className="text-gray-300 mb-4">
          for receive intersting offer update!
        </p>

        <form onSubmit={handleNewslatter}>
          <input
            name="email"
            type="email"
            placeholder="Your email..."
            className="px-2 py-2 outline-none text-black rounded w-full"
          />
          <input
            className="w-full py-1 bg-blue-600 rounded mt-4 text-gray-200 text-xl tracking-wide cursor-pointer"
            type="submit"
            value="Subscribe"
          />
        </form>
      </section>
    </div>
  );
};

export default Home;
