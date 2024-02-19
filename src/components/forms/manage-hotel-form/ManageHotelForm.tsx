import {useEffect} from 'react';
import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../shared-types";

type Props = {
  hotel?:HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(()=>{
  reset(hotel);
  },[hotel, reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log("adding hotel", formDataJson);
    const formData = new FormData();
    if(hotel){
        formData.append("hotelId",hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
        formDataJson.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 px-3">
        <DetailSection />
        <TypesSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-sm disabled:bg-gray-500"
          >
            {isLoading ?"Saving...":"Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
