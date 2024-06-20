import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ClassCard = ({ data }) => {
  const { details, "class-name": className, imageURL } = data;

  const axiosPublic = useAxiosPublic();

  const { data: trainers } = useQuery({
    queryKey: ["trainerss", className],
    queryFn: () =>
      axiosPublic.post("/trainer-list", {
        classesName: className,
      }),
  });

  return (
    <div className="w-56 bg-gray-300 rounded py-2">
      <img src={imageURL} className="h-36 w-full bg-cover" alt="" />
      <div className="text-gray-800 p-2">
        <h3 className="tracking-wide text-xl truncate">{className}</h3>
        <p className="line-clamp-3 text-xs">{details}</p>
      </div>

      {trainers?.data?.length > 0 && (
        <div className="flex gap-1">
          {trainers?.data?.map((item, i) => (
            <Link to={`/trainer/${item._id}`} key={i}><img className="h-10 rounded" src={item.photoURL} alt="" /></Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassCard;
