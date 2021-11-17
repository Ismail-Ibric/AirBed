import ReactMapGL, { Marker, Popup } from "react-map-gl"
import { useState } from "react"
import getCenter from "geolib/es/getCenter"

function Map(props) {
  const { data, from } = props;
  const mapFrom = from();
  const mapData = data.slice(mapFrom, mapFrom+5);
  const [selectedLoc, setSelectedLoc] = useState({});

  const locs = mapData.map(result => ({
    latitude: result.geometry.coordinates[1],
    longitude: result.geometry.coordinates[0],
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
    {mapData.map((result, key) => (
      <div key={key}>
        <Marker
          latitude={result.geometry.coordinates[1]}
          longitude={result.geometry.coordinates[0]}
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

        {selectedLoc?.geometry?.coordinates[0] === result.geometry.coordinates[0] ? (
          <Popup
            className="z-10"
            onClose={() => setSelectedLoc({})}
            closeOnClick={true}
            latitude={result.geometry.coordinates[1]}
            longitude={result.geometry.coordinates[0]}
          >
            {result.fields.name}
          </Popup>
        ):(
          false
        )}
      </div>
    ))}
  </ReactMapGL>
}

export default Map
