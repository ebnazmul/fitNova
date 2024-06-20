import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";

const Payment = ({ trainerData, selectedSlot }) => {
  const { user } = useContext(AuthContext);

  const packagePrice =
    selectedSlot === "basic"
      ? 10
      : selectedSlot === "standard"
      ? 50
      : selectedSlot === "premium"
      ? 100
      : 0;

  return (
    <div className="w-full h-[100vh] bg-gray-800/30 fixed top-0 left-0 z-10">
      <div className="max-w-screen-md mt-40 mx-auto h-80 bg-sky-600 text-gray-200 rounded p-4">
        <div className="flex">
          <div className="flex-1">
            <h3>Trainer name: {trainerData?.trainerName}</h3>
            <p className="text-2xl">{`${trainerData?.["slot-name"]} slot, ${trainerData?.["slot-time"]} hours, ${trainerData?.class?.label} class`}</p>
            <p>Package Name: {selectedSlot}</p>
            <p>Price: {`$${packagePrice}`}</p>
          </div>
          <div className="flex-1">
            <p className="text-xl">Your name: {user.displayName}</p>
            <p>Your email: {user.email}</p>
          </div>
        </div>
        <div className="p-4 border mt-4">Card info</div>
      </div>
    </div>
  );
};

export default Payment;
