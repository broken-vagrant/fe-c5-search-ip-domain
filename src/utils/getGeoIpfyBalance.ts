const getGeoIpfyBalance = async () => {
  const geoIpfyKey = import.meta.env.VITE_GEO_API;

  if (!geoIpfyKey) {
    console.error(`VITE_GEO_API(curr: ${geoIpfyKey}) env var not found`);
  }
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://geo.ipify.org/service/account-balance?apiKey=${geoIpfyKey}`, {
      method: 'GET',
    })
    if (response.status === 200) {
      const { credits } = await response.json();
      return credits;
    }
  } catch (err) {
    console.error(err);
  }
}

export default getGeoIpfyBalance;