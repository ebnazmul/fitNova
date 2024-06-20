import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContexts";
import toast from "react-hot-toast";

const ReviewTrainer = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  const { user } = useContext(AuthContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.reviewText.value;
    axiosSecure
      .post("/trainer-review", {
        userEmail: user.email,
        slotId: id,
        reviewText: reviewText,
      })
      .then((res) => {
        (res);
        toast.success("Review added successfully");
      });
  };

  return (
    <div className="fixed top-[30vh] right-20 px-10 py-4 bg-gray-600">
      <form onSubmit={handleOnSubmit}>
        <input
          name="reviewText"
          type="text"
          className="bg-gray-200 px-2 py-1 outline-none w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 w-full rounded bg-blue-400 mt-2 text-gray-200">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ReviewTrainer;
