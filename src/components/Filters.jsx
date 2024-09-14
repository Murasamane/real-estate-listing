/* eslint-disable react/prop-types */
import Button from "./Button";
import FilterMenu from "./FilterMenu";
import Region from "../features/Region";
import Price from "../features/Price";
import Space from "../features/Space";
import Rooms from "../features/Rooms";
import FilterTag from "./FilterTag";
import { useFilters } from "../context/FilterContext";

export default function Filters({ regions }) {
  const { filters } = useFilters();

  const { region, minPrice, maxPrice, minSpace, maxSpace, rooms } = filters;

  const rangeSpace =
    minSpace > 0 && maxSpace > 0 ? (
      <div className="text-sm">
        {minSpace} მ<sup>2</sup> - {maxSpace} მ<sup>2</sup>`
      </div>
    ) : null;

  const rangePrice =
    minPrice > 0 && maxPrice > 0 ? (
      <div className="text-sm">
        {minPrice} ₾ - {maxPrice} ₾`
      </div>
    ) : null;

  const fullFilter = [...region, rangeSpace, rangePrice, rooms];
  console.log(region, minPrice, maxPrice, minSpace, maxSpace);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-4 max-w-nav">
        <ul className="flex items-center gap-9 border-2 border-primaryGrey-100 rounded-[10px] py-1.5 px-4">
          <FilterMenu target={"რეგიონი"}>
            <Region regions={regions} />
          </FilterMenu>
          <FilterMenu target={"საფასო კატეგორია"}>
            <Price />
          </FilterMenu>
          <FilterMenu target={"ფართობი"}>
            <Space />
          </FilterMenu>
          <FilterMenu target={"საძინებლების რაოდენობა"}>
            <Rooms />
          </FilterMenu>
        </ul>
        <div className="flex items-center gap-2 flex-wrap">
          {fullFilter.map((filter, index) =>
            filter !== null && filter !== 0 ? <FilterTag key={index}>{filter}</FilterTag> : null
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 self-start">
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
