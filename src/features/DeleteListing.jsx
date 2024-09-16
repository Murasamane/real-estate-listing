import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "../services/apiServices";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function DeleteListing({ onCloseModal, id }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
      toast.success("ლისტინგი წარმატებით წაიშალა");
    },
    onError: () => {
      toast.error("ლისტინგის წაშლა ვერ მოხერხდა, სცადეთ თავიდან");
    },
  });

  const handleDelete = () => {
    mutate();
  };
  return (
    <div className="w-[622px]">
      <header className="flex items-center justify-end">
        <img src="/images/cancel.png" alt="" />
      </header>

      <div className="flex flex-col justify-center gap-8 items-center">
        <p className="text-primaryBlue-200 text-xl font-semibold">
          გსურთ წაშალოთ ლისტინგი?
        </p>
        <div className="flex items-center gap-4">
          <Button
            text={"გაუქმება"}
            buttonStyles={
              "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px]"
            }
            onClick={onCloseModal}
          />
          <Button
            text={"დადასტურება"}
            buttonStyles={
              "text-white font-bold bg-primaryRed-200 px-4 py-3 rounded-[10px] border-2 border-primaryRed-200"
            }
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteListing;
