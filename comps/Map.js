import ReactMapGL, { Marker, Popup } from "react-map-gl"
import { useState } from "react"
import getCenter from "geolib/es/getCenter"

function Map(props) {
  const { searchResults } = props;
  const [selectedLoc, setSelectedLoc] = useState({});
  
  const locs = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }) );
  
  const mapCenter = getCenter(locs);
  
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: mapCenter.latitude,
    longitude: mapCenter.longitude,
    zoom: 11
  });

  return <ReactMapGL
    mapStyle="mapbox://styles/izzysoft/ckvebfbhz0xyl14nt4srl4m2u"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport) => setViewport(nextViewport)}
  >
    {searchResults.map((result, key) => (
      <div key={key}>
        <Marker
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <p
            role="img" 
            className="cursor-pointer text-2xl"
            onClick={() => setSelectedLoc(result)}
            aria-label="push-pin"
          >&#x1F4CD;</p>
        </Marker>

        {selectedLoc.long === result.long ? (
          <Popup
            className="z-10"
            onClose={() => setSelectedLoc({})}
            closeOnClick={true}
            latitude={result.lat}
            longitude={result.long}
          >
            {result.title}
          </Popup>
        ):(
          false
        )}
      </div>
    ))}
  </ReactMapGL>
}

export default Map
