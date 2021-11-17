import React from "react"
import HtmlHead from "../comps/HtmlHead";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import Banner from "../comps/Banner"

function Hosting() {

  const hosts = [
    {
      img: "https://a0.muscache.com/im/pictures/4f3047b2-58ea-4335-8430-dfc6f436634d.jpg?im_w=480",
      who: "from Reka. Host in Milan",
      says: "Hosting my studio changed my life and gifted me with memorable experiences and people.",
    },
    {
      img: "https://a0.muscache.com/im/pictures/31fb3cb1-c2a1-4e14-a9e9-6f279991790b.jpg?im_w=480",
      who: "from Darrel. Host in Atlanta",
      says: "Hosting my home allowed me to become an entrepreneur and laid down a path to financial freedom.",
    },
  ]

  return (
    <div>
      <HtmlHead />
      <Header /> 
      <Banner
        img="/sleep01.jpg"
        msg="You can host anything... anywhere"
        btn="Learn More"
        goto=""
      />
      <main className="flex flex-wrap pt-6 px-4 sm:px-8 justify-center">
        
        {/* <section className="w-full max-w-[1280px] overflow-hidden" >
          <div className="relative">
            <img className="rounded-3xl" src="https://images.unsplash.com/photo-1502727051360-3656ce291c5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80" alt="" />
            <div className="absolute top-0 left-1/2 w-[230px] h-[225px]
              text-gray-700 m-2 w-64 text-4xl m-8 border
              border-red-500 rounded-xl bg-gray-100 p-3
              shadow-2xl transform -translate-x-1/2 opacity-90 text-center">
              You can host anything... anywhere
              <button className="bg-red-300 text-xl text-red-700 rounded
                mt-5 p-3 hover:bg-red-200 hover:scale-105
                active:scale-100 transform duration-200 ease-out">
                  Learn More
              </button>
            </div>
          </div>
        </section>
        
        <div className="flex-break" /> */}

        <div className="font-nukab text-3xl">
          What are Hosts saying?
        </div>

        <section className="max-w-[1280px] w-full mt-2 shadow-2xl rounded-3xl border bg-gray-100">
          { hosts.map( (host, key) => {
            const says = 
              <div className="p-4 w-1/3">
                <div className="text-xl">"{host.says}"</div>
                <div className="mt-5 text-gray-500">{host.who}</div>
              </div>

            if( key % 2 === 0 ) {
              return (
                <div key={key} className="flex flex-col-1 bg-red-100 m-4 rounded-2xl">
                  {says}
                  <img className="w-2/3 rounded-r-2xl" src={host.img} alt="" />
                </div>
              )
            } else {
              return (
                <div key={key} className="flex flex-col-1 bg-red-200 m-5 rounded-2xl">
                  <img className="w-2/3 rounded-l-2xl" src={host.img} alt="" />
                  {says}
                </div>
              )
            }
          })
        }
        </section>
        
        <div className="flex-break" />

        <div className="max-w-[1280px] w-full relative overflow-hidden mt-10 shadow-2xl rounded-2xl">
          <div className="w-full">
            <img className="rounded-2xl" src="https://a0.muscache.com/im/pictures/93ef1829-62d1-4349-8b4a-b02ebc650a25.jpg?im_w=2560&amp;im_q=highq" loading="lazy" />
          </div>
          <div className="absolute w-[320px] text-center top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl">
            <div className="absolute z-n100 bg-white w-full h-full opacity-60 rounded-xl" />
            <div className="mt-5 ml-5 text-lg">
              Questions about hosting? <br/>Ask a Superhost.
            </div>
            <div className="w-full ml-5 mt-5 mb-2">
              <a className="bg-red-200 p-3 rounded-xl" href="/askahost">Learn more</a>
            </div>
          </div>
        </div>

        <div className="flex-break" />

        <section className="w-full mt-8 mb-16 text-center">
          <div className="font-nukab text-2xl">
            Turn your extra space into extra income on AirBed's.
          </div>
          <button className="bg-red-200 w-[160px] p-3 mt-6 rounded-lg">Try Hosting Now</button>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default Hosting
