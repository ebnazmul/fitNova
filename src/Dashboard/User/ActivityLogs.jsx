import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContexts";



const ActivityLogs = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const axiosSecure = useAxiosSecure();
  const [isReasonModal, setIsReasonModal] = useState(false);

  // const
  useEffect(() => {
    axiosSecure
      .post("/activity", { email: user.email })
      .then((res) => setData(res.data));
  }, [axiosSecure, user.email]);

  console.log(data);

  return (
    <div className="py-20 px-10">
      <h2 className="text-2xl mb-4">Activity Logs</h2>

      <div className="bg-blue-400 px-8 py-4 rounded flex items-center justify-between gap-40">
        <div>
          <h3 className="text-xl">Applied for Trainer</h3>
          <p className="text-xs">
            At {new Date(data.timeApplied).toLocaleString()}
          </p>
        </div>
        <button className="px-2 py-1 rounded bg-blue-200">
          {data.wantTobeTrainer}
        </button>
        {data.rejectedReason && (
          <button
            onClick={() => setIsReasonModal(true)}
            className="text-2xl text-white">
            <FaEye />
          </button>
        )}
      </div>
      <div className={`absolute ${!isReasonModal && "hidden"}`}>
        {/* <ReasonModal/> */}
      </div>
    </div>
  );
};

export default ActivityLogs;
