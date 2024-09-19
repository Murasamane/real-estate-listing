/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "../services/apiServices";
import Button from "../components/Button";
import InputElement from "../components/InputElement";
import FileReader from "../components/FileReader";
import toast from "react-hot-toast";

function AddAgent({ onCloseModal }) {
  const queryClient = useQueryClient();
  const [image, setImage] = useState(null);
  const { mutate } = useMutation({
    mutationKey: ["agentUpload"],
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("აგენტი წარმატებით დაემატა 🥳🥳🥳🥳");
      reset();
      onCloseModal();
    },
    onError: () => {
      toast.error(
        "აგენტის დამატება ვერ მოხერხდა, გთხოვთ სცადოთ ხელახლა ! 😔😔😔"
      );
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    const agent = {
      name: data.firstName,
      surname: data.lastName,
      email: data.email,
      avatar: data.avatar,
      phone: data.phone,
    };
    mutate(agent);
  };

  const imagePreview = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImage(imgUrl);
  };

  const clearImageSelection = () => {
    setImage(null);
    reset({ avatar: null });
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
        <InputElement
          type="text"
          label={"სახელი"}
          name="firstName"
          id="firstName"
          register={{
            ...register("firstName", { required: true, minLength: 2 }),
          }}
          errors={errors.firstName}
          requirement={"მინიმუმ ორი სიმბოლო"}
        />
        <InputElement
          type="text"
          label={"გვარი"}
          name="lastName"
          id="lastName"
          register={{
            ...register("lastName", { required: true, minLength: 2 }),
          }}
          errors={errors.lastName}
          requirement={"მინიმუმ ორი სიმბოლო"}
        />
      </div>
      <div className="flex items-center gap-5">
        <InputElement
          label={"ელ-ფოსტა"}
          type="email"
          name="email"
          id="email"
          register={{
            ...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@redberry\.ge$/,
                message: "გამოიყენეთ @redberry.ge ფოსტა",
              },
            }),
          }}
          requirement={`გამოიყენეთ @redberry.ge
            ფოსტა`}
          errors={errors.email}
        />
        <InputElement
          type="text"
          label={"ტელეფონის ნომერი"}
          name="phone"
          id="phone"
          register={{
            ...register("phone", {
              required: "ტელეფონის ნომერი აუცილებელია",
              pattern: {
                value: /^5\d{8}$/,
                message:
                  "მხოლოდ ქართული მობილურის ნომერი (9 ციფრი, უნდა დაიწყოს 5-ით)",
              },
              validate: (value) =>
                value.length === 9 ||
                "ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან",
            }),
          }}
          requirement={`მხოლოდ რიცხვები`}
          errors={errors.phone}
        />
      </div>
      <div className="flex flex-col relative">
        <FileReader
          type="file"
          accept="image/*"
          id="fileUpload"
          name="file"
          register={{
            ...register("avatar", {
              required: true,
              onChange: imagePreview,
            }),
          }}
          preview={image}
          requirement={"ატვირთეთ ფოტო"}
          errors={errors.avatar}
          label={"ატვირთეთ ფოტო"}
        />
        {image && (
          <button
            type="button"
            onClick={clearImageSelection}
            className="absolute top-1/2 left-1/2 translate-x-7 translate-y-5"
          >
            <img src="/images/clear.png" alt="clear file" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          text={"გაუქმება"}
          buttonStyles={
            "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px] hover:bg-primaryRed-200 hover:text-white"
          }
          onClick={onCloseModal}
        />
        <Button
          text={"დაამატე აგენტი"}
          buttonStyles={
            "text-white font-bold bg-primaryRed-200 px-4 py-3 rounded-[10px] border-2 border-primaryRed-200 hover:bg-primaryRed-300"
          }
          type="submit"
        />
      </div>
    </form>
  );
}

export default AddAgent;
