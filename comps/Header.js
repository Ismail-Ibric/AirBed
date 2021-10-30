import Image from "next/image";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import UserCircleIcon from "@heroicons/react/outline/UserCircleIcon";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon";
import UsersIcon from "@heroicons/react/outline/UsersIcon";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/dist/client/router"

function Header(props) {
  const [inputVal, setInputVal] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const router = useRouter();
  const { place } = props;

  const ranges = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelected = (ranges) => {
    console.log("ranges", ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        loc: inputVal,
        start: startDate.toLocaleDateString('en-US'),
        end: endDate.toLocaleDateString('en-US'),
        ppl: guests
      }
    })
  }

  return (
    <div className="sticky top-0 w-full h-14 z-50 -mb-14">
      <header className="relative grid grid-cols-3 shadow-md py-2 px-2">
        <div className="absolute top-0 z-n100 w-full h-14 bg-black opacity-40"></div>
        {/* <img className="absolute z-n100 w-full h-full bg-stars opacity-25" /> */}
        <div className="relative flex item-center h-10 w-15 my-auto" onClick={(e) => router.push("/")}>
          <Image
            className="cursor-pointer"
            src="/SleepInns-Opt.svg"
            //layout="fill"
            //objectFit="contain"
            //objectPosition="left"
            width="40px"
            height="40px"
          />
        </div>

        <div className="flex items-center border-2 rounded-full shadow-md bg-gray-100">
          <input
            type="text"
            className="bg-gray-100 ml-3 mr-3 w-full outline-none focus:bg-red-100"
            placeholder={ place || "Search for a Location" }
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
          />
          <SearchIcon className="hidden md:inline-flex h-8 w-8 bg-red-400 rounded-full -ml-2 p-1 text-white cursor-pointer hover:shadow-md hover:scale-105 active:scale-100" />
        </div>

        <div className="flex items-center justify-end text-white">
          <div className="flex space-x-1 mr-3">
            <span className="hidden md:inline">Become a Host</span>
            <GlobeAltIcon className="h-6 mr-1" />
          </div>
          <div className="flex space-x-1 border-2 p-1 rounded-md">
            <UserCircleIcon className="h-6" />
            <MenuIcon className="h-6" />
          </div>
        </div>
      </header>
      {inputVal && (
        <div className="relative">
          <div className="absolute -top-1 left-1/2 bg-red-100 p-3 border border-red-500 rounded-xl shadow-2xl transform -translate-x-1/2">
            <div className="flex justify-evenly space-x-10 bg-white rounded-tl-lg rounded-tr-lg">
              <span className="">Starting</span>
              <span className="">Ending</span>
            </div>
            <DateRange
              ranges={[ranges]}
              minDate={new Date()}
              rangeColors={["#f77272"]}
              onChange={handleSelected}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
            />
            <div className="flex bg-white border-b">
              <span className="text-2xl ml-4 flex-grow font-semibold">
                Number Of Guests
              </span>
              <UsersIcon className="h-5 mt-2 mr-2" />
              <input
                type="number"
                className="bg-gray-100 focus:bg-red-100 outline-none w-16 px-2"
                placeholder="###"
                value={guests}
                min={1}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div className="flex justify-center space-x-4 bg-white py-3 rounded-bl-lg rounded-br-lg">
              <button className="rounded bg-red-100 p-1">Close</button>
              <button className="rounded bg-red-400 p-1" onClick={(e) => search()}>Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
