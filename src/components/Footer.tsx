const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-1xl text-white font-bold tracking-tight">
          TripEasy.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};
export default Footer;
