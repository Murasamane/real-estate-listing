import Button from "./Button";
import Svg from "./Svg";

export default function Filters() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <ul className="flex items-center gap-9 border-2 border-primaryGrey-100 rounded-[10px] py-1.5 px-4">
          <li className="flex items-center gap-1.5 font-bold text-base">
            რეგიონი <Svg />
          </li>
          <li className="flex items-center gap-1.5 font-bold text-base">
            საფასო კატეგორია <Svg />
          </li>
          <li className="flex items-center gap-1.5 font-bold text-base">
            ფართობი <Svg />
          </li>
          <li className="flex items-center gap-1.5 font-bold text-base">
            საძინებლის რაოდენობა <Svg />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Button
          text={"+ ლისტინგის დამატება"}
          buttonStyles={
            "text-white font-bold bg-primaryRed-200 px-4 py-3 rounded-[10px] border-2 border-primaryRed-200"
          }
        />
        <Button
          text={"+ აგენტის დამატება"}
          buttonStyles={
            "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px]"
          }
        />
      </div>
    </div>
  );
}
