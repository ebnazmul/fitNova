import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const RejectModal = ({setIsRejectModal, data}) => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const handleTrainerReject = (e) => {
        e.preventDefault()
        const reason = e.target.reason.value;
        (reason)
        axiosSecure.patch('/reject-trainer', {email: data.email, reason: reason})
        .then(res=>{
            if(res.data.acknowledged){
                toast.error("Rejected")
                navigate('/dashboard/applied-trainers')
            }
        })

        


    }


  return (
    <div className="fixed bg-gray-600 p-40 top-[20vh] left-96 rounded text-xl">
      <form onSubmit={handleTrainerReject}>
        <h2 className=" text-red-200 mb-4">Reject Reason:</h2>
        <input
          className="px-2 py-2 outline-blue-400 mt-2 rounded w-full mb-4"
          type="text"
          name="reason"
          id=""
          placeholder="Enter the reason of rejecting..."
          required
        />
        <input onClick={()=>setIsRejectModal(false)} className="cursor-pointer px-2 py-1 bg-green-500 mr-2" type="button" value="Close" />
        <input className="cursor-pointer px-2 py-1 bg-red-500 text-gray-200" type="submit" value="Reject Trainer Request" />
      </form>
    </div>
  );
};

export default RejectModal;
