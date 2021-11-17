import Image from "next/image"
import { useRouter } from "next/dist/client/router"

function CardSmall(props) {
  const {img, location, distance} = props;
  const router = useRouter();

  const search = (location) => {
    router.push({
      pathname: "/search",
      query: {
        loc: location,
        start: new Date().toLocaleDateString('en-US'),
        end: new Date().toLocaleDateString('en-US'),
        ppl: 1
      }
    })
  }

  return (
    <div className="flex items-center m-2 mt-5
      space-x-4 rounded-xl cursor-pointer
      hover:bg-gray-100 hover:scale-105
      active:scale-100
      transform duration-200 ease-out"
      onClick={(e) => {search(location)}}>
      <div className="relative h-16 w-16">
        <Image className="rounded-xl"
          src={img}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div>
        <h2>{location}</h2>
        <h3>{distance}</h3>
      </div>
    </div>
  )
}

export default CardSmall
