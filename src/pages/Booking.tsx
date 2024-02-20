import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "../components/forms/booking-form/BookingForm";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { useSearchContext } from "../context/SearchContext";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  
  const {stripePromise}=useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>{
        //console.log("inside create intent useQuery")
        return apiClient.createPaymentIntent(
            hotelId as string,
            numberOfNights.toString()
          )
    }
     ,
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  //console.log(currentUser?.email);

  if(!hotel){
    return <div className="text-center">No hotel with that ID exists.</div>
  }
  //console.log("currentUser, paymentIntentData", currentUser, paymentIntentData);
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-3 px-2">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {
        !currentUser && !paymentIntentData && <p>Loading checkout</p>
      }
      
      {currentUser && paymentIntentData && (
        
        <Elements stripe={stripePromise} options={{clientSecret:paymentIntentData.clientSecret}}>
            <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
        </Elements>
      )}
    </div>
  );
};
export default Booking;
