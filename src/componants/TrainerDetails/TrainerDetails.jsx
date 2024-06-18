import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Extra/Loading/Loading";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data = {} } = useQuery({
    queryKey: ["trainer-details"],
    queryFn: () => axiosPublic.get(`/trainer/${id}`),
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ["slots-data", data?.data?.email],
    queryFn: () => axiosPublic.get(`/trainer-slots?email=${data?.data?.email}`),
    enabled: !!data.data?.email,
  });


  if(slotsLoading){
    return <Loading/>
  }

  return (
    <div className="flex gap-2 max-w-screen-2xl mx-auto mt-20">
      <div className="flex-1 border border-gray-200 p-10">
        <img className="h-40 w-40 rounded" src={data.data?.photoURL} alt="" />
        <h3 className="text-xl font-semibold">{data.data?.name}</h3>
        <div>
          <p>Age: {data.data?.age}</p>
          <p>Experiance: {data.data?.experiance}</p>
          <p>Skill: {data.data?.skills?.map((item) => item.label)}</p>
        </div>
      </div>
      <div className="flex-1 bg-green-400">
        {slots?.data?.map((item) => (
          <div
            key={item._id}
            className="p-10 bg-gray-400 flex justify-between mb-4">
            <div>
              <p className="font-Bebas">{item.class.label}</p>
              <h2 className="text-xl">{item["slot-name"]}</h2>
              <p>Time: {item["slot-time"]} hour</p>
            </div>
            <button className="px-4 py-6 text-gray-600 h-full rounded bg-green-400">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDetails;
