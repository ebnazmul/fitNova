import { useContext } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import { AuthContext } from "../../Contexts/AuthContexts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const imageUpload = useUploadImage();
  const navigate = useNavigate();
  const { updateUserProfile, user } = useContext(AuthContext);

  const handleUpdate = async (e) => {

    e.preventDefault();

    const img = e.target.image.files[0];
    const newName = e.target.fullName.value || user.displayName;

    const res = img && await imageUpload(img) || ""
    const imageURL = res?.data?.data?.display_url || user.photoURL


    (newName, imageURL);

    // eslint-disable-next-line no-unused-vars
    const updateRes = await updateUserProfile(newName, imageURL).catch((err) =>
      (err)
    );

    toast.success("Profile Updated!");
    navigate("/dashboard/profile");

  };

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl">Update Profile</h1>
      <form onSubmit={handleUpdate} className="mt-20">
        <div className="mb-4">
          <h4>Name:</h4>
          <input
            name="fullName"
            type="text"
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200 max-w-56"
          />
        </div>
        <div>
          <h4>Profile Picture :</h4>
          <input
            name="image"
            type="file"
            className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200 max-w-56"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300 mt-4 max-w-56">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
