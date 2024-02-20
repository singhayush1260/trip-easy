import { lazy, Suspense } from "react";
import { Route, Routes, Navigate,} from "react-router-dom";
import Loader from "./components/Loader";
import { useAppContext } from "./context/AppContext";
const Home=lazy(()=>import("./pages/Home"));
const Layout=lazy(()=>import("./layouts/Layout"));
const Register=lazy(()=>import("./pages/Register"));
const SignIn=lazy(()=>import("./pages/SignIn"));
const AddHotel=lazy(()=>import("./pages/AddHotel"));
const MyHotels=lazy(()=>import("./pages/MyHotels"));
const EditHotel=lazy(()=>import("./pages/EditHotel"));
const Search=lazy(()=>import("./pages/Search"));  
const HotelDetail=lazy(()=>import("./pages/HotelDetail"));
const Booking=lazy(()=>import("./pages/Booking"));
const MyBookings=lazy(()=>import("./pages/MyBookings"));

const App = () => {

 const{isLoggedIn}=useAppContext();

  return (
    <Suspense fallback={<Loader/>}>
        <Routes>
        <Route path="/" element={<Layout><Home/></Layout>}/>
        <Route path="/register" element={ <Layout> <Register /></Layout>}/>
        <Route path="/sign-in" element={ <Layout> <SignIn /> </Layout>}/>
        <Route path="/search" element={<Layout><Search /> </Layout>} />
        <Route path="/detail/:hotelId" element={<Layout><HotelDetail /></Layout>}/>
        {
          isLoggedIn && (
            <>
            <Route path="/hotel/:hotelId/booking" element={<Layout><Booking/></Layout> }/>
            <Route path="/add-hotel" element={<Layout><AddHotel /></Layout> }/>
            <Route path="/my-hotels" element={ <Layout> <MyHotels /> </Layout> }/> 
            <Route path="/edit-hotel/:hotelId" element={ <Layout> <EditHotel /> </Layout> } />
            <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>}/>
            </>
          )
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;