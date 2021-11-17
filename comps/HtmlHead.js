import Head from "next/head";

function HtmlHead() {
  return (
    <Head>
      <title>AirBed's</title>
      <link rel="icon" href="/favicon.ico" />
      <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}

export default HtmlHead
