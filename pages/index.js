import Head from "next/head";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import Banner from "../comps/Banner";
import CardSml from "../comps/CardSml";
import CardMed from "../comps/CardMed";
import CardLrg from "../comps/CardLrg";

export default function Home(props) {
  const { exploreData, cardsData } = props;

  return (
    <div>
      <Head>
        <title>Sleep Inns</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="//db.onlinewebfonts.com/c/fa6fb08b2ef2e7c6c1cb626ff35fe3f0?family=Last+to+sleep"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//db.onlinewebfonts.com/c/0801c08e5412f54e4b4e9ad146d83a12?family=Ink+Free"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//db.onlinewebfonts.com/c/96996b95c19ecf8733387b6c0b2311e3?family=Rossetti"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//db.onlinewebfonts.com/c/02408ccd8efcf169db4e41d6e0551118?family=NeueKabelW01-Regular"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//db.onlinewebfonts.com/c/1412bea64d9ba801365a8a4b8c6ee782?family=BlogScriptW00-Regular"
          rel="stylesheet"
          type="text/css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        <section className="mt-4">
          <div className="flex justify-center">
            <span className="font-sleep text-4xl font-semibold">
              Explore Nearby
            </span>
          </div>
          <span
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5"
          >
            {exploreData?.map((item, key) => (
              <CardSml
                key={key}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </span>
        </section>

        <section className="mt-4">
          <div className="flex justify-center mb-2">
            <span className="font-sleep text-4xl font-semibold">
              Stay Anywhere
            </span>
          </div>
          <div className="flex p-2 space-x-3 overflow-scroll scrollbar-hide">
            {cardsData?.map( (item, key) => (
              <CardMed
                key={key}
                img={item.img}
                title={item.title}
              />
            ))}
          </div>
        </section>

        <CardLrg
          img="https://links.papareact.com/4cj"
          title="The Great Outdoors"
          description="Wishlist curated by AirBnB"
          buttonText="Get Some Rest"
        />
        
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
