import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContexts";
import toast from "react-hot-toast";

const NewForumPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useContext(AuthContext);

  const onSubmit = (data) => {
    axiosSecure
      .post("/forum-post", {
        ...data,
        posterImg: user.photoURL,
        posterEmail: user.email,
        posterName: user.displayName,
        posterRole: role
      })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Posted");
          reset();
        }
      });
  };

  return (
    <div className="flex-1 py-10">
      <h2 className="text-2xl">Forum Post</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-wrap gap-4">
        <div>
          <p className="text-xl">Post Title:</p>
          <input
            {...register("postTitle", { required: true })}
            type="text"
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
            placeholder="Forum post title..."
          />
        </div>
        <div>
          <p className="text-xl">Post Description:</p>
          <input
            {...register("postDecription", { required: true })}
            type="text"
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
            placeholder="Forum post description..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300 mt-4">
          Post On Forum
        </button>
      </form>
    </div>
  );
};

export default NewForumPost;
