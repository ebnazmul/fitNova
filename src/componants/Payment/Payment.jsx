import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../TrainerBooking/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = ({ trainerData, selectedSlot, slotId }) => {
  const { user } = useContext(AuthContext);

  const packagePrice =
    selectedSlot === "basic"
      ? 10
      : selectedSlot === "standard"
      ? 50
      : selectedSlot === "premium"
      ? 100
      : 0;

    //   const othersData = {

    //   }

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
        <div className="p-4 border mt-4">
          <Elements stripe={stripePromise}>
            <CheckoutForm slotId={slotId} packagePrice={packagePrice} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
