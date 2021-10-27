import Image from "next/image"

function CardMed(props) {
  const {img, title} = props;

  return (
    <div className="cursor-pointer hover:scale-105 active:scale-100 transform duration-200 ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} layout="fill" className="rounded-xl"/>
      </div>
      <span className="text-2xl">{title}</span>
    </div>
  )
}

export default CardMed
