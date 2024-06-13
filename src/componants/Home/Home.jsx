import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import ReviewCard from "../../Cards/ReviewCard";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {

  const handleNewslatter = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    axios.post(`${import.meta.env.VITE_SERVER_URL}/newslatter`, {email})
    .then(res=>{
      if(res.data.acknowledged){
        toast.success("Successfully subscribed!")
        e.target.email.value = ""
      }
    })
    .catch(()=>toast.error("Something went wrong!"))
    
  }


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
              Book your class today!
            </button>
          </div>
          <img
            className="absolute w-80 right-4 top-10 z-10 rounded"
            src="/trainer.jpeg"
            alt=""
          />
        </div>
      </section>
      <section className="max-w-screen-md mx-auto my-10">
        <h2 className="text-2xl tracking-wide text-center my-4 font-semibold">Testimonials 🏆</h2>
        <Swiper
        navigation={true}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide><ReviewCard/></SwiperSlide>
          <SwiperSlide><ReviewCard/></SwiperSlide>
          <SwiperSlide><ReviewCard/></SwiperSlide>
          <SwiperSlide><ReviewCard/></SwiperSlide>
          <SwiperSlide><ReviewCard/></SwiperSlide>
        </Swiper>
      </section>
      <section className="bg-gray-700 py-10 grid justify-center">
        {/* newsletter */}
        <h2 className="text-2xl tracking-wide text-center font-semibold text-gray-200">Subscribe to our newsletter 📕</h2>
        <p className="text-gray-300 mb-4">for receive intersting offer update!</p>

        <form onSubmit={handleNewslatter}>
        <input name="email" type="email" placeholder="Your email..." className="px-2 py-2 outline-none text-black rounded w-full"  />
        <input className="w-full py-1 bg-blue-600 rounded mt-4 text-gray-200 text-xl tracking-wide cursor-pointer" type="submit" value="Subscribe" />
        </form>



      </section>
    </div>
  );
};

export default Home;
