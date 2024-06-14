import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContexts";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { emailSignUp, updateUserProfile, continueWithGoogle } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageUpload = (img) => {
    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMAGE_UPLOAD_API);
    body.append("image", img);
    return axios.post("https://api.imgbb.com/1/upload", body);
  };

  const onSubmit = (data) => {
    imageUpload(data.image[0])
      .then((res) => {
        const photoURL = res.data.data.display_url;

        emailSignUp(data.email, data.password)
          .then(() => {
            updateUserProfile(data.name, photoURL).then(() => {
              axios
                .post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                  email: data.email,
                })
                .then((res) => {
                  if (res.data.acknowledged) {
                    toast.success("Signup successfully.");
                    // navigate user from here!!! 👈👈👈
                  }
                })
                .catch(() => toast.error("Something went wrong"));
            });
          })

          .catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              return toast.error("Email already used");
            }
            toast.error("Something went wrong");
          });
      })

      .catch(() =>
        toast.error("Something went wrong. Try again after some time.")
      );
  };

  const handleContinueWithGoogle = () => {
    continueWithGoogle()
      .then((res) => {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
            email: res.user.email,
          })
          .then((res) => {
            if (res.data.acknowledged) {
              toast.success("Signup successfully.");
              // navigate user from here!!! 👈👈👈
            } else {
              toast.success("Login successfully");
            }
          })
          .catch(() => toast.error("Something went wrong"));
      })
      .catch((err) => console.log("Something went wrong", err));
  };

  return (
    <div className="max-w-screen-2xl mx-auto bg-gray-200 mt-10 rounded p-10">
      <Helmet>
        <title>Register | FitNova</title>
      </Helmet>
      <div className="w-fit mx-auto border border-gray-300 p-10">
        <h3 className="text-xl md:text-3xl text-center mb-4">Register</h3>
        <button
          onClick={handleContinueWithGoogle}
          className="w-full py-1 bg-blue-600 rounded text-white flex justify-center gap-2 items-center text-xl">
          Continue with Google <FaGoogle />
        </button>
        <p className="text-center">or</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <h4>Full Name :</h4>
              <input
                className="px-2 py-2 outline-blue-400 mt-2 rounded w-full"
                type="text"
                placeholder="Enter your full name..."
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  {errors.name.type === "required"
                    ? "Name is required"
                    : "Something wrong"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h4>Photo :</h4>
              <input
                className="px-2 py-1 outline-blue-400 mt-2 rounded"
                type="file"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500 text-xs">
                  {errors.image.type === "required"
                    ? "Image is required"
                    : "Something wrong"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h4>Email :</h4>
              <input
                className="px-2 py-2 outline-blue-400 mt-2 rounded w-full"
                type="text"
                placeholder="Enter your email..."
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">
                  {errors.email.type === "required"
                    ? "Email is required"
                    : "Something wrong"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h4>Password :</h4>
              <input
                className="px-2 py-2 outline-blue-400 mt-2 rounded w-full"
                type="password"
                placeholder="Enter a password..."
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.type === "required"
                    ? "Password is required"
                    : "Something wrong"}
                </p>
              )}
            </div>

            <button
              className={`w-full py-2 text-xl rounded ${
                Object.keys(errors).length > 0 ? "bg-blue-400" : "bg-blue-600"
              } mt-4 text-white`}>
              Register
            </button>
            <p className="mt-4 text-black">
              Already have an account?{" "}
              <Link className="text-gray-600" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
