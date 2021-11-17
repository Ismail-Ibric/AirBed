import HtmlHead from "../comps/HtmlHead";
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
      <HtmlHead />
      <Header />
      <Banner
        img="/gg-bridge2.jpeg"
        msg="Let's explore destinations nearby to stay at..."
        btn="Explore Near Me"
        goto="/search"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        <section className="mt-6">
          <div className="flex justify-center">
            <span className="font-nukab text-4xl font-semibold">
              US Destinations
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

        <section className="mt-6">
          <div className="flex justify-center mb-2">
            <span className="font-nukab text-4xl font-semibold">
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

        <section className="my-12">
          <CardLrg
            img="/forest01.jpg"
            title="The Great Outdoors"
            description="Wishlist curated by AirBnB"
            buttonText="Get Some Rest"
          />
        </section>

      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context) {
  const { req, query, res, asPath, pathname } = context;

  let host = "http://localhost:3000";

  if (req)
    host = req.headers.host

  const exploreData = await fetch( host + "/explore.json" )
  .then( (res) => res.json() );

  const cardsData = await fetch( host + "/abroad.json" ).then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
