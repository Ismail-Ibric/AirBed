import { useState, useEffect } from "react";
import HtmlHead from "../comps/HtmlHead";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import Map from "../comps/Map";
import CardInfo from "../comps/CardInfo";
import Paginate from "../comps/Paginate";
//import { useRouter } from "next/dist/client/router";
import { useRouter } from "next/router";
import { format } from "date-fns";
import queryString from "query-string"

function Search(props) {
  // const parse = (typeof window !== "undefined") ? window.location.search : ""
  // const qs = queryString.parse( parse );
  const router = useRouter();
  const { loc, start, end, ppl } = router.query;
  let validLoc = loc ?? "";
  const sStart = start?.length > 0 ? start : null;
  const validStart = format(new Date(sStart), "dd MMMM yy");
  const sEnd = end?.length > 0 ? end : null;
  const validEnd = format(new Date(sEnd), "dd MMMM yy");
  const range = `${sStart} - ${sEnd}`;
  const [airBnB, setAirBnB] = useState({});
  const [airBnB_Records, setAirBnB_Records] = useState([]);
  const [city, setCity] = useState(validLoc ?? "");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [startFrom, setStartFrom] = useState(0);


  const Local_fetchData = async () => {
    const url = "https://geolocation-db.com/json/"

    return await fetch(url)
    .then((res) => res.json())
    .catch((err) => ({ error: err }));
  }

  // const Local_getCity = async () => {

  //   const city1 = await Local_fetchData()
  //   .then((val) => {return val.city})


  //   await Local_fetchData()
  //   .then((json) => {
  //     if (json.error)
  //       console.log("AirBnB_fetchData encuntered an Error:  " + json.error);
  //     else {
  //       console.log("json.city", json.city);
  //       return json.city;
  //     }
  //   })
  // }

  const AirBnB_getURL = (find_city, find_country) => {
    //let sCity = find_city;
    //let sCountry = find_country;

    // if (validLoc !== sCity && validLoc !== undefined) {
    //   sCity = validLoc;
    //   setCity(validLoc);
    //   if( validLoc === undefined )
    //     console.log( "AirBnB_getURL  validLoc === undefined" )
    // }

    let url =
      "https://public.opendatasoft.com/api/records/1.0/search/?" +
      "dataset=airbnb-listings&lang=en&facet=host_response_time" +
      "&facet=host_response_rate&facet=host_verifications&facet=city" +
      "&facet=country&facet=property_type&facet=room_type&facet=bed_type" +
      "&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features" +
      "&q=&start=0&rows=50" +
      ""

    if( find_city )
      url += `&refine.city=${capitalizeFirstLetters(find_city)}`;
    
    if( find_country )
      url += `&refine.country=${capitalizeFirstLetters(find_country)}`

    return url;
  };

  function capitalizeFirstLetters(string) {
    const arr = string.split(" ");
    const result = arr.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return result.join(" ");
  }

  const AirBnB_fetchData = async (find_city) => {
    const url = AirBnB_getURL(find_city);
    const ret = await fetch(url)
      .then((res) => res.json())
      .catch((err) => ({ error: err }));

    return ret;
  };

  const AirBnB_getRecords = (find_city) => {
    setLoading(true);
    setAirBnB_Records([]);

    AirBnB_fetchData(find_city).then((json) => {
      if (json.error)
        console.log("AirBnB_fetchData encuntered an Error:  " + json.error);
      else {
        setAirBnB(json);
        let recs = [];
        for (let i = 0; i < json.records.length; i++) {
          recs.push(json.records[i]);
        }
        setAirBnB_Records(recs);
      }

      setLoading(false);
    });
  };

  const setValidLoc = async () => {

    console.log("setValidLoc START")

    if( validLoc !== null && validLoc !== "" )
      return;

    validLoc = localStorage.getItem("my-loc");

    if( validLoc === null || validLoc === "" ) {

      validLoc = await Local_fetchData()
      .then((json) => {
        if (json.error)
          console.log("Local_fetchData encuntered an Error:  " + json.error);
        else {
          return json.city;
        }
      })

      localStorage.setItem("my-loc", validLoc);

      console.log( "setValidLoc", validLoc );

    }
  }

  const updateSearch = async () => {
  
    let city1 = city.length === 0 ? validLoc : city;

    if( city !== "" && validLoc !== city )
       validLoc = city;

    //console.log( "updateSearch  city, validLoc, city1, loc", city, validLoc, city1, loc );
    
    router.push({
      pathname: "/search",
      query: {
        loc: city1,
        start: start ?? new Date().toLocaleDateString('en-US'),
        end: end ?? new Date().toLocaleDateString('en-US'),
        ppl: ppl ?? 1,
      },
    });

    //localStorage.setItem("router-loc", city1);

    console.log( "updateSearch  city", city )

    setCity( city1 );

    //AirBnB_getRecords();
  
  };

  const handleRouteChanged = (param) => {

    const params = param.split("?");
    const parsed = queryString.parse(params[1]);

    console.log("handleRouteChanged  parsed.loc ", parsed.loc);

    //if (loc === undefined && city === "") {

      let city1 = parsed.loc;
      if( city !== city1 )
        setCity( city1 );

      AirBnB_getRecords( city1 );
    //}

    // setReload(reload === 0 ? 1 : 0);
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const mapFrom = () => startFrom

  const redraw = async (startIndex) => {
    
    console.log( `redraw( starting: ${startIndex} )` );
    setStartFrom(startIndex);

    setLoading(true);
    await sleep(500);
    setLoading(false);
  }

  async function onComponentDidMount() {
    
    console.log("onComponentDidMount");

    if( validLoc === undefined || validLoc === "" ) {
      await setValidLoc();
    }

    updateSearch();

    // Needed when searching from Header, from this page
    router.events.on("routeChangeComplete", handleRouteChanged);
  }

  function onComponentWillUnmount() {
    router.events.off("routeChangeComplete", handleRouteChanged);
  }

  useEffect( () => {

    onComponentDidMount();

    return () => onComponentWillUnmount()
  
  }, []);

  return (
    <div>
      <HtmlHead />
      <Header place={`${validLoc} | ${range} | ${ppl}`} />

      <main className="flex pt-16 px-4 sm:px-8">
        <section className="m-2 flex-grow mt-0">
          <div className="m-2 mt-3 flex-grow w-full">
            <div className="hidden lg:inline-flex space-x-3">
              <p className="button-plain bg-gray-200">Location</p>
              <p className="button bg-gray-300" title="In Development">Price</p>
              <p className="button bg-gray-300" title="In Development">Rooms and Beds</p>
              <p className="button bg-gray-300" title="In Development">Ease of Canceling</p>
              <p className="button bg-gray-300" title="In Development">More...</p>
            </div>

            <div className="bg-gray-200 p-4 pt-1 space-y-3 mb-4 mr-2 rounded-xl lg:rounded-tl-none">
              <span className="whitespace-nowrap">
                <span className="mr-2">City:</span>
                <input
                  className="p-1 mr-4 border border-red-300 w-[180px]"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {/* list="cities" */}
                {/* <datalist id="cities">
                  <option>Los Angeles</option>
                  <option>London</option>
                  <option>Paris</option>
                  <option>Rome</option>
                  <option>Madrid</option>
                  <option>Chicago</option>
                  <option>San Francisco</option>
                </datalist> */}
              </span>

              <span className="whitespace-nowrap">
                <span className="mr-2">Country:</span>
                <input
                  className="p-1 mr-4 border border-red-300 w-[180px]"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled
                  title="In Development"
                />
                {/* list="countries" */}
                {/* <datalist id="countries">
                  <option>United States</option>
                  <option>France</option>
                  <option>Italy</option>
                  <option>Spain</option>
                  <option>United Kingdom</option>
                </datalist> */}
              </span>

              <button
                className="text-white bg-red-400 rounded shadow-md
              border border-red-500 py-1 px-2"
                onClick={() => updateSearch()}
              >
                Find Now
              </button>
              <br />
            </div>
          </div>

          <div className="flex flex-wrap">
            <p className="font-nukab text-3xl font-semibold mt-2 mb-1 mr-4 flex-grow">Stays in {validLoc}</p>

            <div className="p-2 mt-3">
              Dates: <span className="mx-1 text-green-600">{range}</span>{" "}
              for
              <span className="ml-2 mr-1 text-green-600">{ppl}</span> guest(s)
            </div>
          </div>

          <div className="p-2">
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <span className="mr-3">
                    Found: <span className="text-green-600">{airBnB.nhits}</span>{" "}
                    results
                    {airBnB.nhits > 50 ? (
                      <span className="text-gray-400"> (limiting to 1st 50)</span>
                    ) : (
                      ""
                    )}
                  </span>
                </>
              )}
            </div>          
          
          { loading }
          { (airBnB_Records.length > 0) ? (
            <div className="bg-gray-200 p-3 space-y-3 mb-8 rounded-xl">
              <Paginate
                data={airBnB_Records}
                RenderComponent={CardInfo}
                title=""
                pageLimit={5}
                dataLimit={5}
                redraw={redraw}
              />
            </div>
          ) : (
            <h1>No results to display</h1>
          )}
        </section>

        <section className="hidden sticky top-24 h-[600px] mt-[225px] xl:inline-flex xl:min-w-[600px]">
          { !loading ? <Map data={airBnB_Records} from={mapFrom}/> : <></>}          
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Search;

// export async function getServerSideProps(context) {
//   const searchResults = await fetch("http://localhost:3000/listings.json")
//   .then( (res) => res.json() );

//   return {
//     props: { searchResults }
//   };
// }
