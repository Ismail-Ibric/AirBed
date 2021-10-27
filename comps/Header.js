import Image from "next/image";
import MenuIcon from "@heroicons/react/outline/MenuIcon"
import UserCircleIcon from "@heroicons/react/outline/UserCircleIcon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon"

function Header() {
  return (
    <header className="relative sticky top-0 z-50 grid grid-cols-3 bg-green-100 shadow-md py-2 px-2 opacity-90">
      <img className="absolute z-n100 w-full h-full bg-stars opacity-10"/>
      <div className="relative flex item-center h-10 w-15 my-auto">
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
        <input type="text" className="bg-gray-100 ml-3 mr-3 w-full" placeholder="Start your search" />
        <SearchIcon className="hidden md:inline-flex h-8 w-8 bg-red-400 rounded-full -ml-2 p-1 text-white cursor-pointer hover:shadow-md hover:scale-105 active:scale-100" />
      </div>

      <div className="flex items-center justify-end text-black">
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
  );
}

export default Header;
