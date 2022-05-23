import * as React from 'react'
import './App.css'
import { IPGeoAddressAction, IpGeoInfo } from './type'
import LocationDetails from './Components/LocationDetails'
import SearchBar from './Components/SearchBar'
import useMap from './hooks/useMap'
import fetchLocation from './utils/fetchLocation'
import useMobileKeyboardShrinkFix from './hooks/useMobileKeyboardShrinkFix'

const initialState = {
  data: null,
  error: '',
  loading: false,
  search: '192.212.174.101',
  geoIPFYBalance: 0,
}
interface InitialState {
  data: null | IpGeoInfo
  error: string
  loading: boolean
  search: string
  geoIPFYBalance: number
}

function reducer(state: InitialState, action: IPGeoAddressAction) {
  switch (action.type) {
    case 'INIT_SEARCH':
      return { ...state, search: action.payload.search }
    case 'FETCH_LOCATION_STARTED':
      return { ...state, loading: true }
    case 'FETCH_LOCATION_FAILED':
      return { ...state, loading: false, error: action.payload.error }
    case 'FETCH_LOCATION_SUCCESS':
      return { ...state, loading: false, error: '', data: action.payload }
    case 'IPFY_BALANCE':
      return { ...state, geoIPFYBalance: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useMap(state?.data?.latitude as string, state?.data?.longitude as string)
  useMobileKeyboardShrinkFix()

  const fetchData = React.useCallback(
    async (value: string) => {
      try {
        dispatch({ type: 'FETCH_LOCATION_STARTED' })
        const response = await fetchLocation(value)

        if (response.status === 200) {
          const data = await response.json()
          dispatch({ type: 'FETCH_LOCATION_SUCCESS', payload: data })
        } else {
          dispatch({
            type: 'FETCH_LOCATION_FAILED',
            payload: {
              error: 'Not Found!',
            },
          })
        }
      } catch (err) {
        dispatch({
          type: 'FETCH_LOCATION_FAILED',
          payload: {
            error: 'Something went wrong!',
          },
        })
        console.error(err)
      }
    },
    [dispatch]
  )

  React.useEffect(() => {
    console.log('searching for:', state.search)
    fetchData(state.search)
  }, [state.search])

  return (
    <div className="App">
      <main>
        <div className="top-half">
          <section className="bg-top">
            <div className="search-wrapper">
              <h1>IP Address Tracker</h1>
              <SearchBar
                isLoading={state.loading}
                error={state.error}
                dispatch={dispatch}
              />
            </div>
          </section>
          <LocationDetails data={state.data} />
        </div>
        <div className="bottom-half">
          <div id="map"></div>
        </div>
      </main>
    </div>
  )
}

export default App
