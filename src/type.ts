export interface IpGeoInfo {
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

export type Action<T, P = undefined> = P extends undefined ? { type: T } : { type: T, payload: P }

export type IPGeoAddressAction = Action<'INIT'> | Action<'FETCH_LOCATION_STARTED'> | Action<'FETCH_LOCATION_FAILED', { error: string }> | Action<'FETCH_LOCATION_SUCCESS', IpGeoInfo> | Action<'INIT_SEARCH', { search: string }> | Action<'IPFY_BALANCE', number>