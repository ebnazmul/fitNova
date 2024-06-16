import { FaTrash } from "react-icons/fa";

const ManageSlotsCard = ({data}) => {

    console.log(data);

    return (
        <div className="p-5 bg-gray-200 mb-4 w-fit flex gap-2 flex-wrap">
            <p className="px-2 py-1 bg-gray-400 w-fit text-white">Slot Name: {data["slot-name"]
            }</p>
            <p className="px-2 py-1 bg-gray-400 w-fit text-white">Class Name: {data.class.label}</p>
            <p className="px-2 py-1 bg-gray-400 w-fit text-white">Time: {data["slot-time"]} {data["slot-time"] === "1" ? "hour" : "hours"}</p>
            <p className="px-2 py-1 bg-gray-400 w-fit text-white">Days: {data.days.map((item)=>item.label) }</p>
            <button
                // onClick={() => handleTrainerDelete(trainer._id)}
                className="ml-10 text-3xl">
                <FaTrash />
              </button>
            
        </div>
    );
};

export default ManageSlotsCard;