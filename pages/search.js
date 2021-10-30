import Header from "../comps/Header";
import Footer from "../comps/Footer";
import Map from "../comps/Map"
import CardInfo from "../comps/CardInfo";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";

function Search(props) {
  const router = useRouter();
  const { loc, start, end, ppl } = router.query;
  const sStart = format(new Date(start), "dd MMMM yy");
  const sEnd = format(new Date(end), "dd MMMM yy");
  const range = `${sStart} - ${sEnd}`;
  const { searchResults } = props;

  return (
    <div>
      <Header place={`${loc} | ${range} | ${ppl}`} />

      <main className="flex pt-16 px-4 sm:px-8">
        <section className="m-2 flex-grow ">
          <p className="text-xs">
            300+ Stays <span className="mx-1 text-gray-400">{range}</span> for
            <span className="ml-2 mr-1 text-gray-400">{ppl}</span> guest(s)
          </p>
          <p className="text-3xl font-semibold mt-4 mb-4">Stays in {loc}</p>
          <div className="hidden lg:inline-flex space-x-3">
            <p className="button-plain bg-gray-200">Location</p>
            <p className="button bg-gray-300">Price</p>
            <p className="button bg-gray-300">Rooms and Beds</p>
            <p className="button bg-gray-300">Ease of Canceling</p>
            <p className="button bg-gray-300">More...</p>
          </div>

          <div className="bg-gray-200 p-3 space-y-3 mb-8 rounded-xl lg:rounded-tl-none">
            {searchResults.map((o, key) => (
              <CardInfo
                key={key}
                img={o.img}
                loc={o.location}
                title={o.title}
                desc={o.description}
                star={o.star}
                price={o.price}
                total={o.total}
              />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: { searchResults }
  };
}
