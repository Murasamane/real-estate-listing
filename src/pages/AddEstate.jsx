/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createListing, getRegionsAndCities } from "../services/apiServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import FileReader from "../components/FileReader";
import Button from "../components/Button";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function AddEstate() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [savedCity, setSavedCity] = useState("");
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCancel = () => {
    sessionStorage.removeItem("addEstateForm");
    sessionStorage.removeItem("image");
    navigate(-1);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["regionsAndCities"],
    queryFn: getRegionsAndCities,
  });

  const { mutate } = useMutation({
    mutationKey: ["createListing"],
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries();
      sessionStorage.removeItem("addEstateForm");
      sessionStorage.removeItem("image");
      toast.success("ლისტინგი წარმატებით დაემატა 🥳🥳🥳🥳");
      navigate("/");
    },
    onError: () => {
      toast.error("ლისტინგის დამატება ვერ მოხერხდა, სცადეთ ახლიდან! 😔");
    },
  });
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
    handleSubmit,
  } = useForm();

  const regionWatch = watch("region");

  const formValues = watch();

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("addEstateForm");
    const savedImage = sessionStorage.getItem("image");

    const formDataFormat = JSON.parse(savedFormData);
    const formattedData = {
      address: formDataFormat?.address,
      agent: formDataFormat?.agent,
      area: formDataFormat?.area,
      bedrooms: formDataFormat?.bedrooms,
      city: formDataFormat?.city,
      deal: formDataFormat?.deal,
      description: formDataFormat?.description,
      price: formDataFormat?.price,
      region: formDataFormat?.region,
      zipcode: formDataFormat?.zipcode,
      image: JSON.parse(savedImage),
    };
    if (savedFormData) {
      Object.keys(formattedData).forEach((key) => {
        setValue(key, formattedData[key]);
        if (key === "region") {
          setSelectedRegion(+formattedData[key]);
        }
        if (key === "city") {
          setSavedCity(`${formattedData[key]}`);
        }
      });
    }
  }, [setValue]);

  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      sessionStorage.setItem("addEstateForm", JSON.stringify(formValues));
    }
  }, [formValues]);
  const handleFormSubmit = (data) => {
    const estate = {
      address: data.address,
      image: data.image[0],
      region_id: data.region,
      description: data.description,
      city_id: data.city,
      zip_code: data.zipcode,
      price: data.price,
      area: data.area,
      bedrooms: data.bedrooms,
      is_rental: data.deal === "rent" ? 1 : 0,
      agent_id: data.agent,
    };
    mutate(estate);
  };
  const imagePreview = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    sessionStorage.setItem(
      "image",
      JSON.stringify({
        File: {
          lastModified: e.target.files[0].lastModified,
          lastModifiedDate: new Date(
            e.target.files[0].lastModifiedDate
          ).toString(),
          name: e.target.files[0].name,
          size: e.target.files[0].size,
          type: e.target.files[0].type,
          webkitRelativePath: e.target.files[0].webkitRelativePath,
        },
      })
    );

    setImage(imgUrl);
  };

  const clearImageSelection = () => {
    setImage(null);
    reset({ image: null });
  };
  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId);
    setValue("region", regionId);
  };

  useEffect(() => {
    if (selectedRegion) {
      const cities = data?.cities.filter(
        (city) => city.region_id === Number(selectedRegion)
      );
      setFilteredCities(cities);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, data]);

  if (isLoading) return <Loader />;

  return (
    <form
      className="w-[780px] m-auto flex flex-col gap-14 py-16"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h1 className="text-center font-bold text-primaryBlack-300 text-3xl">
        ლისტინგის დამატება
      </h1>

      <div className="flex flex-col">
        <p className="font-bold text-base text-primaryBlack-400">
          გარიგების ტიპი
        </p>
        <div className="flex items-center gap-20">
          <label htmlFor="deal1" className="flex items-center gap-2">
            <input
              type="radio"
              name="deal"
              id="deal1"
              value="buy"
              className="accent-primaryBlack-300"
              {...register("deal", { required: true })}
            />
            იყიდება
          </label>
          <label htmlFor="deal2" className="flex items-center gap-2">
            <input
              type="radio"
              name="deal"
              id="deal2"
              value="rent"
              className="accent-primaryBlack-300"
              {...register("deal", { required: true })}
            />
            ქირავდება
          </label>
          {errors.deal && (
            <p
              className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
                errors.deal ? "text-primaryRed-200" : ""
              }`}
            >
              <img src="/images/check.png" alt="check" /> შეთანხმების ფორმა
              აუცილებელია
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-base text-primaryBlack-400">
          მდებარეობა
        </h2>

        <div className="flex items-center gap-5">
          <InputElement
            label={"მისამართი"}
            type="text"
            name="address"
            id="address"
            requirement="მინიმუმ ორი სიმბოლო"
            register={{
              ...register("address", { required: true, minLength: 2 }),
            }}
            errors={errors.address}
          />
          <InputElement
            label={"საფოსტო ინდექსი"}
            type="text"
            name="zipcode"
            id="zipcode"
            requirement="მხოლოდ რიცხვები"
            register={{
              ...register("zipcode", {
                required: "საფოსტო ინდექსი აუცილებელია",
                minLength: {
                  value: 2,
                  message:
                    "საფოსტო ინდექსი უნდა შედგებოდეს მინიმუმ 2 ციფრისგან",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "მხოლოდ რიცხვები",
                },
              }),
            }}
            errors={errors.zipcode}
          />
        </div>

        <div className="flex items-center gap-5">
          <div>
            <p className="font-bold text-base text-primaryBlack-400 mb-1">
              რეგიონი
            </p>
            <select
              name="region"
              id="region"
              className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
              {...register("region", { required: "რეგიონი აუცილებელია" })}
              onChange={handleRegionChange}
            >
              <option value="">აირჩიეთ რეგიონი</option>
              {data.regions.map((reg) => (
                <option key={reg.id} value={reg.id}>
                  {reg.name}
                </option>
              ))}
            </select>
            {errors.region && (
              <p
                className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
                  errors.region ? "text-primaryRed-200" : ""
                }`}
              >
                <img src="/images/check.png" alt="check" />
                {errors.region.message}
              </p>
            )}
          </div>

          {selectedRegion ? (
            <div>
              <p className="font-bold text-base text-primaryBlack-400 mb-1">
                ქალაქი
              </p>
              <select
                name="city"
                id="city"
                value={savedCity}
                className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
                {...register("city", {
                  required: "ქალაქი აუცილებელია",
                  onChange: (e) => setSavedCity(e.target.value),
                })}
              >
                <option value="">აირჩიეთ ქალაქი</option>
                {filteredCities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p
                  className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
                    errors.city ? "text-primaryRed-200" : ""
                  }`}
                >
                  <img src="/images/check.png" alt="check" />{" "}
                  {errors.city.message}
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-base text-primaryBlack-400">
          ბინის დეტალები
        </h2>

        <div className="flex items-center gap-5">
          <div>
            <InputElement
              label={"ფასი"}
              type="text"
              name="price"
              id="price"
              requirement="მხოლოდ რიცხვები"
              register={{
                ...register("price", {
                  required: "ფასი აუცილებელია",
                  minLength: {
                    value: 2,
                    message: "ფასი უნდა შედგებოდეს მინიმუმ 2 ციფრისგან",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                }),
              }}
              errors={errors.price}
            />
          </div>
          <div>
            <InputElement
              label={"ფართობი"}
              type="text"
              name="area"
              id="area"
              requirement="მხოლოდ რიცხვები"
              register={{
                ...register("area", {
                  required: "ფართობი აუცილებელია",
                  minLength: {
                    value: 2,
                    message: "ფართობი უნდა შედგებოდეს მინიმუმ 2 ციფრისგან",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                }),
              }}
              errors={errors.area}
            />
          </div>
        </div>
        <div className="mt-5">
          <InputElement
            label={"საძინებლების რაოდენობა"}
            type="text"
            name="bedrooms"
            id="bedrooms"
            requirement="მხოლოდ რიცხვები"
            register={{
              ...register("bedrooms", {
                required: "საძინებლების რაოდენობა აუცილებელია",
                minLength: 1,
              }),
            }}
            errors={errors.bedrooms}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="font-bold text-base text-primaryBlack-400"
        >
          აღწერა *
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          className="rounded-md p-2.5 border-2 border-primaryGrey-200 h-32 resize-none"
          {...register("description", { required: true, minLength: 5 })}
        />
        <p
          className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
            errors.description ? "text-primaryRed-200" : ""
          }`}
        >
          <img src="/images/check.png" alt="check" />
          მინიმუმ ხუთი სიტყვა
        </p>
      </div>
      <div className="flex flex-col relative">
        <FileReader
          type="file"
          accept="image/*"
          id="fileUpload"
          name="file"
          preview={image}
          // value
          register={{
            ...register("image", { required: true, onChange: imagePreview }),
          }}
          requirement={"ატვირთეთ ფოტო"}
          errors={errors.image}
          label={"ატვირთეთ ფოტო"}
        />
        {image && (
          <button
            type="button"
            onClick={clearImageSelection}
            className="absolute top-1/2 left-1/2 translate-x-9 translate-y-5"
          >
            <img src="/images/clear.png" alt="clear file" />
          </button>
        )}
      </div>
      <div>
        <h2 className="font-bold text-base text-primaryBlack-400 mb-3.5">
          აგენტი
        </h2>
        <p className="font-bold text-sm text-primaryBlack-300 mb-1">აირჩიე</p>
        <select
          name="agent"
          id="agent"
          className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
          {...register("agent", { required: "აგენტი აუცილებელია" })}
        >
          <option value="">აირჩიეთ აგენტი</option>
          {data?.agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} {agent.surname}
            </option>
          ))}
        </select>
        {errors.agent && (
          <p
            className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
              errors.agent ? "text-primaryRed-200" : ""
            }`}
          >
            <img src="/images/check.png" alt="check" /> {errors.agent.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          text={"გაუქმება"}
          buttonStyles={
            "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px] hover:bg-primaryRed-200 hover:text-white"
          }
          onClick={handleCancel}
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

export default AddEstate;
