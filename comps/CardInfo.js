import Image from "next/image";
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import StarIcon from "@heroicons/react/solid/StarIcon";
import { useState } from "react";

function CardInfo(props) {
  const { img, loc, title, desc, star, price, total, key } = props;
  const [heart, setHeart] = useState(0);

  const toggleHeart = () => {
    setHeart(!heart);
  }

  let btnHeart;
  if (heart)
    btnHeart = <HeartIcon className="cursor-pointer h-7 text-red-500
    hover:scale-105 hover:text-red-600 active:scale-100"
    onClick={toggleHeart} />
  else
    btnHeart = <HeartIcon className="cursor-pointer h-7 text-gray-300
    hover:scale-105 hover:text-gray-400 active:scale-100"
    onClick={toggleHeart} />

  return (
    <div
      className="flex p-2 bg-white shadow-lg rounded-xl
        hover:opacity-90 hover:shadow-xl hover:scale-101 cursor-pointer
        transition duration-200 ease-out border border-gray-300"
      key={key}
    >
      <div className="relative flex-shrink-0 h-24 w-40 md:h-52 md:w-80">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{loc}</p>
          {btnHeart}
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{desc}</p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex">
            <StarIcon className="h-5 text-red-400 flex-grow" />
            {star}
          </p>
          <div>
            <p className="text-lg lg:text-2xl">{price}</p>
            <p className="text-sm text-right">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
