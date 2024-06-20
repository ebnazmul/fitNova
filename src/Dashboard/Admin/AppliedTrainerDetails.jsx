import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Extra/Loading/Loading";
import toast from "react-hot-toast";
import RejectModal from "../../Extra/Modal/RejectModal";
import { useState } from "react";

const AppliedTrainerDetails = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const [isRejectModal, setIsRejectModal] = useState(false)

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => axiosSecure.get(`/trainer-req-info/${id.id}`),
  });

  (user.data);

  if (isLoading) {
    return <Loading />;
  }

  const { photoURL, name, email, age, skills, experiance } = user.data;

  const acceptTrainer = (email) => {
    axiosSecure.post('/accept-trainer', {email: email})
    .then(res=>{
        if(res.data.acknowledged){
           toast.success("Successfully accepted.")
           navigate('/dashboard/applied-trainers')
        }
    })
  }



  return (
    <div className="py-20 px-10">
      <img
        className="border h-40 w-40 rounded-full mb-4"
        src={photoURL}
        alt=""
      />
      <ul className="text-xl">
        <li>Name: {name}</li>
        <li>Email: {email}</li>
        <li>Age: {age}</li>
        <li className="flex items-center gap-2">
          Skills:{" "}
          <ul>
            {skills.map((item, i) => (
              <li key={i}>{item.label}</li>
            ))}
          </ul>
        </li>
        <li>Experiance: {experiance} years</li>
      </ul>
      <div className="text-white space-x-4 mt-4">
        <button onClick={()=>acceptTrainer(email)} className="px-4 py-2 rounded bg-green-600">Accept</button>
        <button onClick={()=>setIsRejectModal(true)} className="px-4 py-2 rounded bg-red-500">Reject</button>
      </div>
      <div className={`absolute ${!isRejectModal && "hidden"}`}>
        <RejectModal data={user.data} setIsRejectModal={setIsRejectModal}/>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
