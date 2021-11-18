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
      <header className="relative flex h-14 shadow-md py-2 px-2">
        <div className="absolute top-0 left-0 z-n100 w-full h-14 bg-black opacity-60"></div>
        <div className="flex item-center pr-1 mr-1 my-auto min-w-[40px]"
          onClick={(e) => router.push("/")}>
          <Image
            className="cursor-pointer rounded-md hover:scale-102 active:scale-100"
            src="/airBnB.svg"
            //layout="fill"
            //objectFit="contain"
            //objectPosition="left"
            width="40px"
            height="40px"
            title="AirBed"
          />
        </div>

        <div className="flex w-full max-w-sm sm:max-w-md items-center
          border-2 rounded-full shadow-md bg-gray-100 ml-auto mr-auto">
          <input
            type="text"
            className="bg-gray-100 ml-3 mr-3 w-full outline-none focus:bg-red-100"
            placeholder={ place || "Search for a Location" }
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
          />
          <SearchIcon className="hidden md:inline-flex h-8 w-8
            bg-red-400 rounded-full -ml-2 p-1 text-white cursor-pointer
            hover:shadow-md hover:scale-105 active:scale-100"
            onClick={() => setInputVal("London")}
          />
        </div>

        <div className="flex items-center justify-end text-white">
          <div className="flex space-x-1 mr-1 hidden md:flex">
            <span className="mr-2 hover:scale-102 active:scale-100">
              <a className="text-shadow-md hover:text-shadow-xl"
                href="/hosting">
                <div className="leading-3 mb-1">Become</div>
                <div className="leading-3 ml-0">a Host</div>
              </a>
            </span>
            <div className="" title="In Development">
              <GlobeAltIcon className="h-6 mt-1 mr-1 hover:scale-105 active:scale-100 cursor-pointer" />
            </div>
          </div>
          <div className="flex space-x-1 border-2 p-1 ml-2 rounded-md" title="In Development">
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
              <span className="text-lg ml-auto mr-5 mt-1 font-semibold">
                Number Of Guests
              </span>
              <UsersIcon className="h-5 mt-2 mr-2 mb-1" />
              <input
                type="number"
                className="bg-gray-100 focus:bg-red-100 outline-none mr-auto mt-1 mb-1 w-16 px-2"
                placeholder="###"
                value={guests}
                min={1}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div className="flex justify-center space-x-4 bg-white py-3 rounded-bl-lg rounded-br-lg">
              <button className="rounded bg-red-100 p-1 hover:shadow-md hover:scale-105 active:scale-100" onClick={() => setInputVal("")}>Close</button>
              <button className="rounded bg-red-400 p-1 text-white hover:shadow-md hover:scale-105 active:scale-100" onClick={(e) => {search(); setInputVal("")}}>Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
