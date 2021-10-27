import Image from "next/image";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] md:[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/3 w-full text-center mt-5">
        <div className="text-black font-bold text-shadow-xl sm:text-lg mb-2 w-52 sm:w-60 ml-auto mr-auto">
          Let's explore destinations you'll want to stay in!
        </div>
        <button className="bg-red-400 shadow-md text-purple-400 hover:scale-105 active:scale-100 transition duration-100 text-white font-bold py-2 px-4 rounded-xl w-40">
          Show Me
        </button>
      </div>
    </div>
  );
}

export default Banner;
