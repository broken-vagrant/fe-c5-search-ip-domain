import { useEffect, useState } from 'react';
import './App.css';
import * as L from 'leaflet';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState('');
  useEffect(() => {

    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiemtpbmRlc3QiLCJhIjoiY2t3dzNwZDZrMjYwYjJ3dXNqNGNpZmxlNyJ9.L4FXi8Ii66CLsE2cKVR-XQ'
    }).addTo(map);

  }, [])
  const handleSearch = async () => {
    const options: any = {};

    const ipv4orIpv6 = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

    if (search.match(ipv4orIpv6)) {
      options.ipAddress = search
    }
    else {
      options.domain = search;
    }
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_GEO_API}&ipAddress=8.8.8.8`, {
      method: 'GET'
    }).catch((err) => console.log(err)
    )
    console.log(response);

  }
  return (
    <div className="App">
      <section className="bg-top">
        <div className="search-wrapper">
          <h2>IP Address Tracker</h2>
          <div className="search">
            <input name="search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for any IP address or domain" />
            <button className="end-adornment" aria-label="click to search" onClick={handleSearch}>
            </button>
          </div>
        </div>
      </section>
      <section className="details-wrapper">
        <div className="details">
          <div className="box">
            <span className="label">IP Address</span>
            <span className="value">192.212.174.101</span>
          </div>
          <div className="box">
            <span className="label">Location</span>
            <span className="value">Brooklyn, NY 10001</span>
          </div>
          <div className="box">
            <span className="label">Timezone</span>
            <span className="value">UTC-05:00</span>
          </div>
          <div className="box">
            <span className="label">ISP</span>
            <span className="value">SpaceX Starlink</span>
          </div>
        </div>
      </section>
      <section className="map-wrapper">
        <div id="map"></div>
      </section>
    </div>
  );
}

export default App;
