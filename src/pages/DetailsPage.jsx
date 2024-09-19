import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getSimilar } from "../services/apiServices";
import { formatDate } from "../utils/utils";
import Modal from "../components/Modal";
import Button from "../components/Button";
import DeleteListing from "../features/DeleteListing";
import Carousel from "../components/Carousel";
import ListingCard from "../components/ListingCard";
function DetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["estate", id],
    queryFn: () => getSimilar(id),
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <div className="p-9">
        <header className="mb-7">
          <Link to={-1}>
            <img src="/images/back.png" alt="go back" />
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-16">
          <div>
            <img src={data.estate.image} className="w-full" alt="" />
            <p className="text-primaryGrey-200 text-base font-normal text-end mt-3.5">
              გამოქვეყნების თარიღი: {formatDate(data.estate.created_at)}
            </p>
          </div>

          <div className="flex flex-col py-7">
            <div>
              <h2 className="text-4xl font-bold text-primaryBlack-300 mb-6">
                {data.estate.price} ₾
              </h2>
              <div className="flex flex-col justify-center gap-4">
                <div className="flex gap-1 items-center justify-start">
                  <img src="/images/address.png" alt="address" />
                  <p className="font-normal text-base text-primaryBlack-300/70">{`${data.estate.city.name}, ${data.estate.address}`}</p>
                </div>
                <div className="flex gap-1 items-center justify-start">
                  <img src="/images/sign.png" alt="area" className="-ml-0.5" />
                  <p className="font-normal text-base text-primaryBlack-300/70">
                    {data.estate.area} მ<sup>2</sup>
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-start">
                  <img src="/images/bed.png" alt="bedrooms" className="-ml-1" />
                  <p className="font-normal text-base text-primaryBlack-300/70">
                    საძინებელი {data.estate.bedrooms}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-start">
                  <img src="/images/post.png" alt="zipcode" />
                  <p className="font-normal text-base text-primaryBlack-300/70">
                    საფოსტო ინდეხი {data.estate.zip_code}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-4 pr-20">
              <p className="text-base font-normal text-primaryGrey-200">
                {data.estate.description}
              </p>
            </div>

            <div className="border-2 border-primaryGrey-150 rounded-lg flex flex-col gap-4 justify-center py-6 px-5">
              <div className="flex items-center gap-3.5">
                <img src={data.estate.agent.avatar} alt="" />
                <div className="flex flex-col gap-1">
                  <p className="text-primaryBlack-300 text-base font-bold">
                    {data.estate.agent.name} {data.estate.agent.surname}
                  </p>
                  <p className="text-sm text-primaryGrey-300 font-bold">
                    აგენტი
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img src="/images/email.png" alt="email" />
                  <p className="text-sm text-primaryGrey-200">
                    {data.estate.agent.email}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/phone.png" alt="phone" />
                  <p className="text-sm text-primaryGrey-200">
                    {data.estate.agent.phone}
                  </p>
                </div>
              </div>
              <Modal>
                <Modal.Open opens="delete">
                  <Button
                    text={"ლისტინგის წაშლა"}
                    buttonStyles={
                      "text-primaryGrey-300 self-start font-bold  px-4 py-3 rounded-[10px] border-2 border-primaryGrey-300 hover:bg-primaryGrey-200 hover:text-white"
                    }
                  />
                </Modal.Open>
                <Modal.Window name="delete">
                  <DeleteListing id={data.estate.id} />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-16 gap-14">
        <h2 className="font-bold text-2xl text-primaryBlack-300 px-9">
          ბინები მსგავს ლოკაციაზე
        </h2>
        <Carousel>
          {data.similars.map((estate) => (
            <ListingCard key={estate.id} data={estate} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default DetailsPage;
