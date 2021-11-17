import Image from "next/image";

function CardLrg(props) {
  const { img, title, description, buttonText } = props;

  return (
    <section className="relative my-6">
      <div className="relative h-96 min-w-[300px] p-6">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>

      <div className="absolute top-12 left-12 bg-white
        bg-opacity-60 rounded-lg p-6">
        <h3 className="font-nukab text-4xl mb-3 w-64 text-shadow-xl">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white bg-red-400 px-4 py-2
          rounded-lg mt-5 hover:shadow-md hover:scale-105
          active:scale-100" title="In Development">
          <span className="text-shadow-xl">{buttonText}</span>
        </button>
      </div>
    </section>
  );
}

export default CardLrg;
