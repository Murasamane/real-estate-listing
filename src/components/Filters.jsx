/* eslint-disable react/prop-types */
import { useFilters } from "../context/FilterContext";
import Modal from "./Modal";
import Button from "./Button";
import FilterMenu from "./FilterMenu";
import Region from "../features/Region";
import Price from "../features/Price";
import Space from "../features/Space";
import Rooms from "../features/Rooms";
import FilterTag from "./FilterTag";
import RangeSpace from "./RangeSpace";
import RangePrice from "./RangePrice";
import RoomsFilter from "./RoomsFilter";
import AddAgent from "../features/AddAgent";

export default function Filters({ regions }) {
  const { state, dispatch } = useFilters();

  const { region, minPrice, maxPrice, minSpace, maxSpace, rooms } = state;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-4">
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
        <div className="flex items-center gap-2 flex-wrap max-w-nav">
          {region.map((region) => (
            <FilterTag key={region} region={region} dispatch={dispatch} />
          ))}
          {minSpace > 0 && maxSpace > 0 ? (
            <RangeSpace
              minSpace={minSpace}
              maxSpace={maxSpace}
              dispatch={dispatch}
            />
          ) : null}
          {minPrice > 0 && maxPrice > 0 ? (
            <RangePrice
              minPrice={minPrice}
              maxPrice={maxPrice}
              dispatch={dispatch}
            />
          ) : null}

          {rooms > 0 && <RoomsFilter room={rooms} dispatch={dispatch} />}
          {region.length > 0 ||
          minPrice ||
          maxPrice ||
          minSpace ||
          maxSpace ||
          rooms ? (
            <button
              className="text-primaryBlack-300 text-sm font-medium"
              onClick={() => dispatch({ type: "Clear" })}
            >
              გასუფთავება
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-4 self-start">
        <Button
          href="/estates/createEstate"
          text={"+ ლისტინგის დამატება"}
          buttonStyles={
            "text-white font-bold bg-primaryRed-200 px-4 py-3 rounded-[10px] border-2 border-primaryRed-200"
          }
        />
        <Modal>
          <Modal.Open opens="addAgent">
            <Button
              text={"+ აგენტის დამატება"}
              buttonStyles={
                "text-primaryRed-200 font-bold bg-white border-2 border-primaryRed-200 px-4 py-3 rounded-[10px]"
              }
            />
          </Modal.Open>
          <Modal.Window name="addAgent">
            <AddAgent />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
