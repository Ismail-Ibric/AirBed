import Image from "next/image";

function Banner(props) {
  const {img, msg, btn, goto} = props;

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[450px]
      lg:h-[500px] xl:h-[550px] 2xl:h-[600px]">
      <Image
        src={img}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute left-0 right-0 ml-auto mr-auto
        top-0 bottom-0 mt-auto mb-auto
        w-[240px] h-[124px] p-5 text-center">
      {/* <div className="absolute top-1/3 left-1/3 w-[250px] p-5 text-center mt-5"> */}
        <div className="absolute z-10 top-0 w-full h-full bg-white
          opacity-50 rounded-2xl border border-red-400"></div>
        <div className="absolute z-20 top-2 text-black font-bold
          text-shadow-xl w-[240px] text-lg mb-2 ml-auto mr-auto">
          {msg}
        </div>
        <button className="absolute z-20 bottom-3 left-16 bg-red-400
          shadow-2xl hover:scale-105 active:scale-100
          transition duration-100 text-white font-bold py-2 px-4 rounded-xl w-40">
          {goto ?
            <a href={goto} className="text-shadow-lg">
              {btn}
            </a> :
            <span title="In Development">
              {btn}
            </span>
          }
        </button>
      </div>
    </div>
  );
}

export default Banner;
