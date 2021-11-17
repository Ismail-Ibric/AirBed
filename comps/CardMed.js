import Image from "next/image"
import { useRouter } from "next/dist/client/router"

function CardMed(props) {
  const {img, title} = props;
  const router = useRouter();

  const search = (title) => {

    const parts = title.split(", ")
    const location = parts[0];

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
    <div className="cursor-pointer hover:scale-105 active:scale-100
      transform duration-200 ease-out" onClick={(e) => {search(title)}}>
      <div className="relative h-80 w-80">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <span className="text-2xl">{title}</span>
    </div>
  )
}

export default CardMed
