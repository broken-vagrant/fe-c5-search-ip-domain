import isValidIP from "./isValidIP";

const fetchLocation = async (value: string) => {
  let queryString = `apiKey=${import.meta.env.VITE_GEO_API}`;

  if (isValidIP(value)) {
    queryString += `&ipAddress=${value}`;
  }
  else {
    queryString += `&domain=${value}`
  }
  const response = await fetch(`https://geo.ipify.org/api/v1?${queryString}`, {
    method: 'GET',
  })
  return response
}

export default fetchLocation;