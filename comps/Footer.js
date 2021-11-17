import Image from "next/image";
import MenuIcon from "@heroicons/react/outline/MenuIcon"
import UserCircleIcon from "@heroicons/react/outline/UserCircleIcon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"
import GlobeAltIcon from "@heroicons/react/outline/GlobeAltIcon"

function Footer() {
  return (
    <div className="flex justify-evenly items-start flex-wrap bg-gray-200 text-gray-500 p-8 space-y-4">
      <div className="space-y-4 text-xs mt-4">
        <h5 className="font-bold">ABOUT</h5>
        <p>AirBed's Workings</p>
        <p>Newsroom</p>
        <p>Investors</p>
        <p>AirBed's Plus</p>
        <p>AirBed's Luxe</p>
      </div>

      {/* <div className="space-y-4 text-xs">

      </div> */}

      <div className="space-y-4 text-xs">
        <h5 className="font-bold">COMMUNITY</h5>
        <p>Accessibility</p>
        <p>Referals Accepted</p>
        <p>Suggestions and Feedback</p>
        <p>This is an AirBnB Clone</p>
        <p>This is not an actual site</p>
      </div>

      <div className="space-y-4 text-xs">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Help Center</p>
        <p>Trust and Safety</p>
        <p>Regulations</p>
        <p>Refunds</p>
        <p>Chat Live with us</p>
      </div>

      {/* <div className="space-y-4 text-xs">

      </div> */}
    </div>
  );
}

export default Footer;
