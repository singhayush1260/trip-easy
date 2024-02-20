import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/hotel_search_filter/StarRatingFilter";
import HotelTypesFilter from "../components/hotel_search_filter/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/hotel_search_filter/HotelFacilitiesFilter";
import PriceFilter from "../components/hotel_search_filter/PriceFilter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const[selectedStars, setSelectedStars]=useState<string[]>([]);
  const[selectedHotelTypes, setSelectedHotelTypes]=useState<string[]>([]);
  const[selectedHotelFacilities, setSelectedHotelFacilities]=useState<string[]>([]);
  const[selectedPrice, setSelectedPrice]=useState<number|undefined>();
  const[sortOption, setSortOption]=useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotel", searchParams], () =>
    apiClient.searchHotel(searchParams)
  );
  //console.log(search);
  //console.log("data from search hotel", hotelData);

 const handleStarsChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
 const starRating=event.target.value;

 setSelectedStars((prevStars)=>{
    return event.target.checked?[...prevStars,starRating]:prevStars.filter(star=>star!=starRating);
 }) 

 }

 const handleHotelTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const hotelType=event.target.value;
   
    setSelectedHotelTypes((prevHotelTypes)=>{
       return event.target.checked?[...prevHotelTypes,hotelType]:prevHotelTypes.filter(type=>type!=hotelType);
    }) 
   
    }

    const handleHotelFacilitiesChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
     const hotelFacility=event.target.value;
     setSelectedHotelFacilities((prevSelectedHotelFacilities)=>{
        return event.target.checked?[...prevSelectedHotelFacilities,hotelFacility]:prevSelectedHotelFacilities.filter(facility=>facility!=hotelFacility);
     })
    }



  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5 px-2">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <HotelFacilitiesFilter selectedHotelFacilities={selectedHotelFacilities} onChange={handleHotelFacilitiesChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number)=>setSelectedPrice(value)}/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">
            {hotelData?.pagination.total} hotels found
            {search.destination ? `in ${search.destination}` : ""}
          </span>
          <select value={sortOption} onChange={(event)=>setSortOption(event.target.value)} className="p-2 border rounded-md">
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => {
          return <SearchResultCard key={hotel._id} hotel={hotel} />;
        })}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page)=>setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;
