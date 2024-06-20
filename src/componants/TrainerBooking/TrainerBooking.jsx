import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Payment from "../Payment/Payment";

const TrainerBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [paymentWindow, setPaymentWindow] = useState(false)
  const { slotId } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data = {} } = useQuery({
    queryKey: ["s-s-data"],
    queryFn: () => axiosPublic.get(`/slot-details/${slotId}`),
  });

  return (
    <div className="max-w-screen-2xl mx-auto my-10 *:cursor-pointer">
      <div className="h-60 p-10 border">
        <h2 className="text-xl">Trainer name: {data.data?.trainerName}</h2>
        <p className="text-2xl">{`${data?.data?.["slot-name"]} slot, ${data.data?.["slot-time"]} hours, ${data.data?.class?.label} class`}</p>
      </div>
      <h2 className="my-4 text-xl p-4 border">
        Select a membership and procced
      </h2>
      <div className="grid grid-cols-3 mt-4 gap-2">
        <div
          onClick={() => setSelectedSlot("basic")}
          className={`h-40 w-full bg-green-200 p-2 ${
            selectedSlot === "basic" && "border-2 border-red-500"
          }`}>
          <h2 className="text-xl tracking-wide text-center">
            Basic Membership $10
          </h2>
          <ul className="text-center">
            <li>Access to gym facilities during regular operating hours.</li>
            <li>Use of cardio and strength training equipment.</li>
            <li>Access to locker rooms and showers.</li>
          </ul>
        </div>
        <div
          onClick={() => setSelectedSlot("standard")}
          className={`h-40 w-full bg-green-300 p-2 ${
            selectedSlot === "standard" && "border-2 border-red-500"
          }`}>
          <h2 className="text-xl tracking-wide text-center">
            Standard Membership $50
          </h2>
          <ul className="text-center">
            <li>All benefits of the basic membership.</li>
            <li>
              Access to group fitness classes such as yoga, spinning, and Zumba.
            </li>
            <li>Use of additional amenities like a sauna or steam room.</li>
          </ul>
        </div>
        <div
          onClick={() => setSelectedSlot("premium")}
          className={`h-40 w-full bg-green-400 p-2 ${
            selectedSlot === "premium" && "border-2 border-red-500"
          }`}>
          <h2 className="text-xl tracking-wide text-center">
            Premium Membership $100
          </h2>
          <ul className="text-center">
            <li>All benefits of the standard membership</li>
            <li>
              Access to personal training sessions with certified trainers.
            </li>
            <li>
              Discounts on additional services such as massage therapy or
              nutrition counseling.
            </li>
          </ul>
        </div>
      </div>
      {selectedSlot && (
        <button onClick={()=>setPaymentWindow(true)} className="text-2xl py-4 bg-green-400 rounded w-full mt-4">
          Procced
        </button>
      )}
      {paymentWindow && <Payment selectedSlot={selectedSlot} trainerData={data.data} />}
    </div>
  );
};

export default TrainerBooking;
