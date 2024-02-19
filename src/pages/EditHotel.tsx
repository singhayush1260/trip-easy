import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../components/forms/manage-hotel-form/ManageHotelForm";
import { useAppContext } from "../context/AppContext";
const EditHotel = () => {

  const{showToast}=useAppContext();

  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {mutate, isLoading}=useMutation(apiClient.updateMyHotelById,{
    onSuccess:()=>{
    showToast({message:"Changes saved!",type:"SUCCESS"});
    },
    onError:()=>{
     showToast({message:"Error saving changes",type:"ERROR"});
    }
  })

  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData);
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;
};
export default EditHotel;
