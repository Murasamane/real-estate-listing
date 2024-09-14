function AddAgent() {
  return (
    <form className="flex flex-col justify-center gap-5">
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
          />
          <p className="flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm">
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
          />
          <p className="flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm">
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
          />
          <p className="flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm">
            <img src="./images/check.png" alt="check" /> გამოიყენეთ @redberry.ge
            ფოსტა
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="phone">ტელეფონის ნომერი*</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
          />
          <p className="flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm">
            <img src="./images/check.png" alt="check" /> მხოლოდ რიცხვები
          </p>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2.5 font-medium text-primaryBlack-300 text-sm">ატვირთეთ ფოტო *</p>
        <label
          htmlFor="photo"
          className="w-[800px] h-[120px] border-2 border-dotted border-primaryBlue-200 flex items-center justify-center rounded-lg"
        >
          <img src="./images/plus.png" alt="file upload" />
        </label>
        <input type="file" id="photo" name="photo" className="w-0 h-0" />
      </div>
    </form>
  );
}

export default AddAgent;
