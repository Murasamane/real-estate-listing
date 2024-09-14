/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../components/Button";
import UploadWidget from "../components/UploadWidget";
import { createAgent } from "../services/apiServices";
function AddAgent({ onCloseModal }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["agentUpload"],
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries();
      reset();
      onCloseModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const handleFormSubmit = async (data) => {
    const agent = {
      name: data.firstName,
      surname: data.lastName,
      avatar: imageUrl,
    };

    console.log(imageUrl);
    mutate(agent);
  };
  return (
    <form
      className="flex flex-col justify-center gap-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="font-medium text-primaryBlack-300 text-center text-3xl">
        აგენტის დამატება
      </h2>

      <div className="flex items-center gap-5">
        <div className="flex flex-col justify-center">
          <label htmlFor="firstName">სახელი*</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
            {...register("firstName", { required: true, minLength: 2 })}
          />
          <p
            className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
              errors.firstName ? "text-primaryRed-200" : ""
            }`}
          >
            <img src="./images/check.png" alt="check" /> მინიმუმ ორი სიმბოლო
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="lastName">გვარი*</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
            {...register("lastName", { required: true, minLength: 2 })}
          />
          <p
            className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
              errors.firstName ? "text-primaryRed-200" : ""
            }`}
          >
            <img src="./images/check.png" alt="check" /> მინიმუმ ორი სიმბოლო
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col justify-center">
          <label htmlFor="email">ელ-ფოსტა*</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
              validate: (value) =>
                value.endsWith("@redberry.ge") ||
                "გამოიყენეთ @redberry.ge ფოსტა",
            })}
          />
          <p
            className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
              errors.email ? "text-primaryRed-200" : ""
            }`}
          >
            <img src="./images/check.png" alt="check" /> გამოიყენეთ @redberry.ge
            ფოსტა
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="phone">ტელეფონის ნომერი*</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
            {...register("phone", { required: true })}
          />
          <p className="flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm">
            <img src="./images/check.png" alt="check" /> მხოლოდ რიცხვები
          </p>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2.5 font-medium text-primaryBlack-300 text-sm">
          ატვირთეთ ფოტო *
        </p>
        <UploadWidget setImageUrl={setImageUrl} />
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          text={"გაუქმება"}
          buttonStyles={
            "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px]"
          }
          onClick={onCloseModal}
        />
        <Button
          text={"დაამატე აგენტი"}
          buttonStyles={
            "text-white font-bold bg-primaryRed-200 px-4 py-3 rounded-[10px] border-2 border-primaryRed-200"
          }
          type="submit"
        />
      </div>
    </form>
  );
}

export default AddAgent;
