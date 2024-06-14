import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddNewClass = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const imageUpload = (img) => {
    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMAGE_UPLOAD_API);
    body.append("image", img);
    return axios.post("https://api.imgbb.com/1/upload", body);
  };

  const onSubmit = (data) => {
    // console.log(data);

    imageUpload(data.image[0])
      .then((res) => {
        const imageURL = res.data.data.display_url;
        const info = { ...data, imageURL };
        delete info.image;

        axiosSecure.post("/new-class", info)
        .then(res=>{
            if(res.data.acknowledged){
                toast.success("Class added successfully")
            }
        })


      })

      .catch(() =>
        toast.error("Something went wrong. Try again after some time.")
      );
  };

  return (
    <div className="py-20 px-10">
      <h3 className="text-2xl mb-4">Add a new class</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h4>Class Name:</h4>
          <input
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
            type="text"
            placeholder="Enter your full name..."
            {...register("class-name", { required: true })}
          />
        </div>

        <div className="mb-4">
          <h4>Image:</h4>
          <input
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
            type="file"
            {...register("image", { required: true })}
          />
        </div>

        <div className="mb-4">
          <h4>Details:</h4>
          <input
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
            type="text"
            placeholder="Class details..."
            {...register("details", { required: true })}
          />
        </div>

        <div className="mb-4">
          <h4>Additional Details:</h4>
          <input
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
            type="text"
            placeholder="Additional details..."
            {...register("additional-details", { required: true })}
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

export default AddNewClass;
