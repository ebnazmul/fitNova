
import { MdBlock } from "react-icons/md";


const AppliedTrainers = () => {
    return (
        <div className="pt-20 pl-10">
            <h3 className="text-2xl py-4">Applied Trainers</h3>
            <div>
            <div
              
              className="bg-gray-800 p-4 rounded text-gray-200 flex gap-20 items-center justify-between mb-2">
              <div>
                <p>Request Email : ahhadh@jsajjd.com</p>
              </div>
              <button
                // onClick={() => handleTrainerDelete(trainer._id)}
                className="px-2 py-1 bg-green-400 rounded text-gray-800">
                View Detailes
              </button>
              <button
                // onClick={() => handleTrainerDelete(trainer._id)}
                className="text-3xl text-red-500">
                <MdBlock/>
              </button>
            </div>

            </div>
            
        </div>
    );
};

export default AppliedTrainers;