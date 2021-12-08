import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import * as L from 'leaflet';

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
  const [{ info, error }, setData] = useState<{
    info: IpGeoInfo | null,
    error: string
  }>({
    info: null,
    error: ''
  });
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {

    if (info) {

      const { lat, lng } = info.location;

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

  }, [info]);


  const fetchData = useCallback(async (search: string) => {

    let queryString: string;

    const ipv4orIpv6 = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

    if (search.match(ipv4orIpv6)) {
      queryString = `apiKey=${import.meta.env.VITE_GEO_API}&ipAddress=${search}`
    }
    else {
      queryString = `apiKey=${import.meta.env.VITE_GEO_API}&domain=${search}`
    }
    const response = await fetch(`https://geo.ipify.org/api/v1?${queryString}`, {
      method: 'GET',
    })

    if (response.status === 200) {
      const data = await response.json();
      setData({
        info: data,
        error: ''
      })
    }
    else {
      setData({
        info: null,
        error: response.statusText
      })
    }
  }, [])

  useEffect(() => {
    // load first search data on render
    fetchData(search)
  }, [])

  return (
    <div className="App">
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
        <section className="details-wrapper">
          <div className="details">
            <div className="box">
              <span className="label">IP Address</span>
              <span className="value">{info ? info.ip : '...'}</span>
            </div>
            <div className="box">
              <span className="label">Location</span>
              <span className="value">{info ? `${info.location.city} ${info.location.region} ${info.location.postalCode}` : '...'}</span>
            </div>
            <div className="box">
              <span className="label">Timezone</span>
              <span className="value">{info ? `UTC${info.location.timezone}` : '...'}</span>
            </div>
            <div className="box">
              <span className="label">ISP</span>
              <span className="value">{info ? info.isp : '...'}</span>
            </div>
          </div>
        </section>
      </div>
      <section className="bottom-half">
        <div id="map"></div>
      </section>
    </div>
  );
}

export default App;
