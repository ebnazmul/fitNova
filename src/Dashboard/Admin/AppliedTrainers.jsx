import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AppliedTrainers = () => {

    const axiosSecure = useAxiosSecure()


    const {data=[]} = useQuery({
        queryKey: ['applied-data'],
        queryFn: () => axiosSecure.get('/trainer-requests')
    })

    console.log(data?.data);

  return (
    <div className="pt-20 pl-10">
      <h3 className="text-2xl py-4">Applied Trainers</h3>
      {
        data?.data?.length > 0 ? <div>
        {data?.data?.map((data, i)=><div key={i} className="bg-gray-800 p-4 rounded text-gray-200 flex gap-20 items-center justify-between mb-2">
          <div>
            <p>Request Email : {data.email} </p>
          </div>
          <Link to={`/dashboard/applied-trainers/${data._id}`}><button
            // onClick={() => handleTrainerDelete(trainer._id)}
            className="px-2 py-1 bg-green-400 rounded text-gray-800">
            View Detailes
          </button></Link>
        </div>)}
      </div> : <h2>No application at the moment!</h2>
      }
    </div>
  );
};

export default AppliedTrainers;
