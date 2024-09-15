/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "../services/apiServices";
import Button from "../components/Button";
import InputElement from "../components/InputElement";
import FileReader from "../components/FileReader";

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
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
            validate: (value) =>
              value.endsWith("@redberry.ge") || "გამოიყენეთ @redberry.ge ფოსტა",
          })}
          requirement={`გამოიყენეთ @redberry.ge
            ფოსტა`}
          errors={errors.email}
        />
        <InputElement
          type="text"
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
      <FileReader
        type="file"
        accept="image/*"
        id="fileUpload"
        name="file"
        register={{ ...register("avatar", { required: true }) }}
        requirement={"ატვირთეთ ფოტო"}
        errors={errors.avatar}
      />
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
