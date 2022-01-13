import { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import getGeoIpfyBalance from './utils/getGeoIpfyBalance';
import { IPGeoAddressAction, IpGeoInfo } from './type';
import Details from './Details';
import Search from './Search';
import useMap from './hooks/useMap';
import fetchLocation from './utils/fetchLocation';

const initialState = {
  data: null,
  error: '',
  loading: false,
  search: '192.212.174.101',
  geoIPFYBalance: 0
}
interface InitialState {
  data: null | IpGeoInfo,
  error: string,
  loading: boolean
  search: string
  geoIPFYBalance: number
}

function reducer(state: InitialState, action: IPGeoAddressAction) {
  switch (action.type) {
    case 'INIT_SEARCH':
      return { ...state, search: action.payload.search };
    case 'FETCH_LOCATION_STARTED':
      return { ...state, loading: true };
    case 'FETCH_LOCATION_FAILED':
      return { ...state, loading: false, error: action.payload.error };
    case 'FETCH_LOCATION_SUCCESS':
      return { ...state, loading: false, error: '', data: action.payload };
    case 'IPFY_BALANCE':
      return { ...state, geoIPFYBalance: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const map = useMap(state?.data?.location.lat, state.data?.location.lng);

  const fetchData = useCallback(async (value: string) => {
    try {
      dispatch({ type: 'FETCH_LOCATION_STARTED' })
      const response = await fetchLocation(value);

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: 'FETCH_LOCATION_SUCCESS', payload: data })
      }
      else {
        dispatch({
          type: "FETCH_LOCATION_FAILED", payload: {
            error: 'Not Found!'
          }
        })
      }
    }
    catch (err) {
      dispatch({
        type: "FETCH_LOCATION_FAILED", payload: {
          error: 'Something went wrong!'
        }
      })
      console.error(err);
    }
  }, [dispatch])

  useEffect(() => {
    console.log('searching for:', state.search);
    // if (state.geoIPFYBalance > 0) {
    fetchData(state.search)
    // }

  }, [state.search])

  useEffect(() => {
    // check API credit balance on first load
    // fetch data if balance !== 0
    getGeoIpfyBalance().then((balance) => {
      dispatch({ type: 'IPFY_BALANCE', payload: balance })
      if (balance === 0) {
        alert('Oops, I ran out free credits for Geo Ipify Service. This Website doesn\'t work without it, Bye!')
        return;
      }
    });
  }, [])

  useEffect(() => {
    // source: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css
    let viewheight = window.innerHeight;
    let viewport = document.querySelector("meta[name=viewport]") as HTMLMetaElement;
    if (!viewport) {
      console.error('Please set viewport meta tag!');
      return;
    }
    viewport?.setAttribute("content", viewport.content + "," + "height=" + viewheight);
  }, [])

  return (
    <div className="App">
      <main>
        <div className="top-half">
          <section className="bg-top">
            <div className="search-wrapper">
              <h1>IP Address Tracker</h1>
              <Search isLoading={state.loading} error={state.error} dispatch={dispatch} />
            </div>
          </section>
          <Details data={state.data} />
        </div>
        <div className="bottom-half">
          <div id="map"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
