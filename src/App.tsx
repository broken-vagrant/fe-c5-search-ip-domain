import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import * as L from 'leaflet';
import isValidIP from './utils/isValidIP';
import getGeoIpfyBalance from './utils/getGeoIpfyBalance';

interface IpGeoInfo {
  location: {
    country: string,
    region: string,
    city: string,
    lat: number,
    lng: number,
    postalCode?: string,
    timezone?: string,
    geonameId?: number
  }
  isp: string,
  ip: string
}

function App() {
  const [search, setSearch] = useState('192.212.174.101');
  const [{ data, error }, setData] = useState<{
    data: IpGeoInfo | null,
    error: string
  }>({
    data: null,
    error: ''
  });
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {

    if (data) {

      const { lat, lng } = data.location;

      if (!mapRef.current) {
        // store reference to Leaflet map instance if not exists

        const map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: import.meta.env.VITE_MAPBOX_TOKEN as string
        }).addTo(map);

        mapRef.current = map;
      }
      else {
        // if Leaflet instance exists, just mutate object
        mapRef.current.setView([lat, lng], 13)
      }
    }

  }, [data]);


  const fetchData = useCallback(async (search: string) => {

    let queryString = `apiKey=${import.meta.env.VITE_GEO_API}`;

    if (isValidIP(search)) {
      queryString += `&ipAddress=${search}`;
    }
    else {
      queryString += `&domain=${search}`
    }

    try {
      const response = await fetch(`https://geo.ipify.org/api/v1?${queryString}`, {
        method: 'GET',
      })

      if (response.status === 200) {
        const data = await response.json();
        setData({
          data: data,
          error: ''
        })
      }
      else {
        setData({
          data: null,
          error: response.statusText
        })
      }
    }
    catch (err) {
      setData({
        data: null,
        error: 'Something went Wrong!'
      })
      console.error(err);
    }
  }, [])

  useEffect(() => {
    // load first search data on render
    getGeoIpfyBalance().then((balance) => {
      if (balance === 0) {
        alert('Oops, I ran out free credits for Geo Ipify Service. This Website doesn\'t work without it, Bye!')
        return;
      } else {
        fetchData(search);
      }
    });
  }, [])

  return (
    <div className="App">
      <main>
        <div className="top-half">
          <section className="bg-top">
            <div className="search-wrapper">
              <h2>IP Address Tracker</h2>
              <div className="search">
                <form onSubmit={(e) => {
                  e.preventDefault(); // don't actually submit the form
                  fetchData(search);
                }}>
                  <input name="search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for any IP address or domain" />
                  {
                    error ? (
                      <p className="error">{error}</p>
                    ) : null
                  }
                  <button className="end-adornment" aria-label="click to search" onClick={() => fetchData(search)}>
                  </button>
                </form>
              </div>
            </div>
          </section>
          <div className="details-wrapper">
            <div className="details">
              <div className="box">
                <span className="label">IP Address</span>
                <span className="value">{data ? data.ip : '...'}</span>
              </div>
              <div className="box">
                <span className="label">Location</span>
                <span className="value">{data ? `${data.location.city} ${data.location.region} ${data.location.postalCode}` : '...'}</span>
              </div>
              <div className="box">
                <span className="label">Timezone</span>
                <span className="value">{data ? `UTC${data.location.timezone}` : '...'}</span>
              </div>
              <div className="box">
                <span className="label">ISP</span>
                <span className="value">{data ? data.isp : '...'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-half">
          <div id="map"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
