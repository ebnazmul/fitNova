import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading, refetch } = useQuery({
    queryKey: ["all-trainers"],
    queryFn: () => axiosSecure.get("/trainers"),
  });

  const handleTrainerDelete = (userid) => {
    (userid)
    axiosSecure.patch(`/trainer?userid=${userid}`)
    .then(res=>{
        if(res.data.acknowledged){
           refetch()
        }
    })

  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mx-10 my-10">All Trainers</h3>
      <div className="ml-4">
        {isLoading ? (
          <Skeleton
            className="bg-gray-800 p-4 rounded text-gray-200 flex items-center justify-between mb-2"
            width={"50%"}
          />
        ) : (
          trainers?.data?.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-gray-800 p-4 rounded text-gray-200 flex gap-20 items-center justify-between mb-2">
              <div>
                <p>Trainer Email : {trainer.email}</p>
              </div>
              <button
                onClick={() => handleTrainerDelete(trainer._id)}
                className="text-3xl">
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
      <div></div>
    </div>
  );
};

export default AllTrainer;
