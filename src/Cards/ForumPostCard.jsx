import { FaArrowUp, FaChalkboardTeacher } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContexts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ForumPostCard = ({ item, refetchForumData }) => {
  
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUpvote = () => {
    if (!user.email) {
      return navigate("/login");
    }

    if(item?.upvoted?.includes(user.email)){
        return toast.error("Already upvoted")
    }

    axiosSecure
      .post("/upvote", { _id: item._id, email: user.email })
      .then((res) => {
        
        if(res.data.acknowledged){
            toast.success("Upvoted")
            refetchForumData()
        }
      });

  };

//   (item);

  return (
    <div className="py-10 px-5 my-4 bg-gray-300 flex items-center justify-between">
      <div>
        <h4 className="text-xl">{item.postTitle}</h4>
        <p>{item.postDecription}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <img className="h-10 rounded-full" src={item.posterImg} alt="" />
          {item.posterRole === "Admin" ? (
            <MdAdminPanelSettings className="text-2xl" />
          ) : item.posterRole === "Trainer" ? (
            <FaChalkboardTeacher className="text-xl" />
          ) : (
            ""
          )}
        </div>
        <p>{item.posterName}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>{item?.upvoted?.length || 0}</p>
        <button onClick={handleUpvote}>
          <FaArrowUp className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ForumPostCard;
