import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import ReviewTrainer from "./ReviewTrainer";

const BookedTrainers = () => {

    const [reviewWindow, setReviewWindow] = useState(false)

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: trainersData = [] } = useQuery({
    queryKey: ["trainers", user],
    queryFn: () => axiosSecure.get(`/booked-trainers/${user.email}`),
  });



  return (
    <div className="flex-1">
      <h3 className="text-2xl py-10">Booked Trainers</h3>
      {trainersData.data && (
        <div>
          {trainersData.data.map((item, i) => (
            <div
              key={i}
              className="py-10 bg-gray-300 w-full px-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl">
                  {item.class.label}
                  <span className="text-xs ml-2">{item["slot-name"]}</span>,
                  <span className="text-xs ml-2">
                    {item["slot-time"]} hours
                  </span>
                </h3>

                <ul className="flex gap-2">
                  {item.days.map((item, i) => (
                    <li key={i}>{item.label}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Trainer Name: {item.trainerName || "Trainer"}</p>
                <p> Trainer Contact Email: {item.trainerEmail}</p>
              </div>
              <button onClick={()=>setReviewWindow(true)} className="px-4 py-1 bg-blue-400 rounded text-gray-200">
                Review
              </button>
              {reviewWindow && <ReviewTrainer id={item._id}/>}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default BookedTrainers;
