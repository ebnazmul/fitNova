import { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import Loading from "../../Extra/Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BeATrainer = () => {
  const { user, userLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()


  const {data: wantToBeTrainer=false} = useQuery({
    queryKey: ['wantToBeTrainer'],
    queryFn: ()=> axiosPublic.get(`/want-to-be-trainer?email=${user.email}`)
  })

  console.log(wantToBeTrainer);

  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const dayOptions = [
    { value: "sun", label: "Sunday" },
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
    { value: "wed", label: "Wednesday" },
    { value: "thu", label: "Thursday" },
    { value: "fri", label: "Friday" },
    { value: "sat", label: "Saturday" },
  ];

  const skillOptions = [
    { value: "yoga", label: "Yoga" },
    { value: "bodybuilding", label: "Bodybuilding" },
    { value: "powerlifting", label: "Powerlifting" },
    { value: "weightlifting", label: "Weightlifting" },
    { value: "crossfit", label: "CrossFit" },
  ];

  //   console.log(errors);

  const imageUpload = (img) => {
    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMAGE_UPLOAD_API);
    body.append("image", img);
    return axios.post("https://api.imgbb.com/1/upload", body);
  };

  const onSubmit = (data) => {
    console.log(data);
    
    imageUpload(data.image[0])
      .then((res) => {
      
        const info = {...data, photoURL: res.data.data.display_url}
        delete info.image
        // do something here! 🍕
        axiosSecure.post('/trainer-application', info)
        .then(res=>console.log(res.data))
        
      })

      .catch(() =>
        toast.error("Something went wrong. Try again after some time.")
      );
  };

  if (userLoading) {
    return <Loading />;
  }

  if(wantToBeTrainer){
    return <div className="text-2xl mt-10 bg-green-300 text-gray-800 h-fit px-20 py-40">
        <h2>You already applied to be a trainer. Wait for admins response.</h2>
    </div>
  }

  return (
    <div className="border-2 px-10">
      <h2 className="text-2xl text-center my-6 font-semibold">Be a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-wrap gap-2">
          <div>
            <p className="text-xl">Full Name:</p>
            <input
              {...register("name")}
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              defaultValue={user.displayName || ""}
              placeholder="Your name..."
              required
            />
          </div>
          <div>
            <p className="text-xl">Email:</p>
            <input
              {...register("email")}
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              value={user.email}
            />
          </div>

          <div>
            <p className="text-xl">Age:</p>
            <input
              {...register("age", { required: true })}
              type="number"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              placeholder="Your age"
            />
          </div>

          <div>
            <p className="text-xl">Profile Image:</p>
            <input
              {...register("image", { required: true })}
              type="file"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              placeholder="Your age"
            />
          </div>

          <div>
            <p className="text-xl mb-2">Available days a week:</p>
            <Controller
              name="days" // The field name in your form data
              control={control} // The control object from useForm()
              defaultValue={[]} // Optional default value
              render={({ field }) => (
                <Select
                  {...field} // Spread the field props (value, onChange, etc.)
                  isMulti
                  options={dayOptions}
                  // ...your other Select props
                />
              )}
            />
          </div>

          <div>
            <p className="text-xl">Available time:</p>
            
            <select
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
            {...register("time", { required: true })} name="cars" id="cars">
              <option value="9am,12pm">9AM - 12PM</option>
              <option value="12pm,2pm">12PM - 2PM</option>
              <option value="2pm,9pm">2PM - 9PM</option>
            </select>
          </div>
        </div>

        <div>
            <p className="text-xl mb-2">Skills:</p>
            <Controller
              name="skills" // The field name in your form data
              control={control} // The control object from useForm()
              defaultValue={[]} // Optional default value
              render={({ field }) => (
                <Select
                  {...field} // Spread the field props (value, onChange, etc.)
                  isMulti
                  options={skillOptions}
                  // ...your other Select props
                />
              )}
            />
          </div>


        <button
          type="submit"
          className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300 mt-4">
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
