import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen">
      <img src="/images/logo.png" alt="redberry logo" />
      <h1 className="font-bold text-3xl">Status: 404.</h1>
      <p className="text-xl text-primaryBlack-300/80 font-normal ">
        აღნიშნული მონაცემებით განცხადება არ იძებნება.
      </p>
      <Link to="/" className="text-2xl text-primaryRed-200 font-medium">
        უკან დაბრუნება
      </Link>
    </div>
  );
}

export default NotFound;
