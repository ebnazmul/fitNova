import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Contexts/AuthContexts";
import toast from "react-hot-toast";

const CheckoutForm = ({packagePrice, slotId}) => {

    const {user} = useContext(AuthContext)
    
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("")

  const axiosPublic = useAxiosPublic()

  const stripe = useStripe();
  const elements = useElements();
  
  useEffect(()=>{
    axiosPublic.post('/create-checkout-intent', {
        price: packagePrice
    })
    .then(res=>{
        setClientSecret(res.data.paymentSecret)
    })
    .catch(err=>console.log(err))


  },[axiosPublic, packagePrice])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error);
    }

    if (paymentMethod) {
      setPaymentError("");
    }

    const {paymentIntent, error: paymentError} = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user.displayName || "anonymous"
                }
            }
        }
    )

    if(paymentError){
        console.log(paymentError);
    }
    else{
        
        if(paymentIntent.status === "succeeded"){
            toast.success("Payment successfully")
            axiosPublic.post('/slot-booking', {
                slotId: slotId,
                userEmail: user?.email,
                package: packagePrice
            })
            .then(()=>{

                

            })




        }
    }




  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {paymentError && (
        <p className="text-xs text-red-300">{paymentError?.message}</p>
      )}
      
      <button
        className="bg-blue-400 w-full py-2 mt-4 rounded"
        type="submit"
        disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
