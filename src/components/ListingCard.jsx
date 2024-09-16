import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function ListingCard({ data }) {
  return (
    <Link
      to={`/estates/${data.id}`}
      className="grid items-center justify-center hover:drop-shadow-md max-w-fit  relative"
    >
      <img
        src={data.image}
        alt="listing photo"
        className="w-full h-[307px] object-cover rounded-t-xl"
      />
      <div className="min-w-20 min-h-7 absolute top-6 left-4 bg-primaryBlack-300/50 text-white px-4 py-1.5 flex items-center justify-center rounded-2xl">
        {data.is_rental === 1 ? "ქირავდება" : "იყიდება"}
      </div>
      <div className="px-6 py-5 border-2 border-primaryGrey-150 rounded-b-xl">
        <h2 className="font-bold text-3xl mb-1.5">{data.price} ₾</h2>
        <div className="flex items-center gap-2 mb-5">
          <img src="/images/address.png" alt="address" />
          <p className="font-normal text-base text-primaryBlack-300/70">
            {data.address}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/images/bed.png" alt="rooms" />
            <p className="font-normal text-base text-primaryBlack-300/70">
              {data.bedrooms}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/sign.png" alt="area" />
            <div className="flex font-normal text-base text-primaryBlack-300/70">
              {data.area} მ<sup>2</sup>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src="/images/post.png" alt="zipcode" />
            <p className="font-normal text-base text-primaryBlack-300/70">
              {data.zip_code}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
