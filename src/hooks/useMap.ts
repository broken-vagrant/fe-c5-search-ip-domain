import { useEffect, useRef } from 'react'
import * as L from 'leaflet'

const useMap = (_lat?: number | string, _lng?: number | string) => {
  const lat = Number(_lat)
  const lng = Number(_lng)
  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (lat && lng) {
      if (!mapRef.current) {
        // store reference to Leaflet map instance if not exists

        const map = L.map('map').setView([lat, lng], 13)

        L.tileLayer(
          'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: import.meta.env.VITE_MAPBOX_TOKEN as string,
          }
        ).addTo(map)

        mapRef.current = map
      } else {
        // if Leaflet instance exists, just mutate object
        mapRef.current.setView([lat, lng], 13)
      }
    }
  }, [lat, lng])
  return mapRef
}

export default useMap
