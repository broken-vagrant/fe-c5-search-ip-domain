import isValidIP from "./isValidIP";

const fetchIpforDomain = async (value: string) => {
  const response = await fetch(`${import.meta.env.VITE_IPLIST_URL}/${value}`);
  if (response.ok) {
    const data = await response.json();
    return data.ip;
  }
  else {
    throw new Error(`failed to fetch ip for domain ${value}!`);
  }
}
const fetchLocation = async (value: string) => {
  let queryString = `apiKey=${import.meta.env.VITE_GEO_API_KEY}`;

  if (isValidIP(value)) {
    queryString += `&ip=${value}`;
  }
  else {
    const ip = await fetchIpforDomain(value);
    queryString += `&ip=${ip}`;
  }
  const response = await fetch(`${import.meta.env.VITE_GEO_API_URL}?${queryString}`, {
    method: 'GET',
  })
  return response
}

export default fetchLocation;