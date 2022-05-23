import * as React from 'react'
import './App.css'
import SearchBar from './Components/SearchBar'
import useMap from './hooks/useMap'
import useMobileKeyboardShrinkFix from './hooks/useMobileKeyboardShrinkFix'
import useFetchLocation from './hooks/useFetchLocation'
import FloatingButton from './Components/FloatingButton'
import RightSidepane from './Components/RightSidePane'

const initialSearch = '192.212.174.101'
const prevSearchStoreKey = 'zkindest-Prev-Search'
function App() {
  useMobileKeyboardShrinkFix()
  const [search, setSearch] = React.useState(() => {
    return (
      (sessionStorage && sessionStorage.getItem(prevSearchStoreKey)) ||
      initialSearch
    )
  })

  const [showDetails, setShowDetails] = React.useState(true)

  const { data, isLoading, error } = useFetchLocation({
    search,
    onSuccess: () => {
      setShowDetails(true)
    },
  })

  useMap(data?.latitude, data?.longitude as string)
  const handleSubmit = (search: string) => {
    if (sessionStorage) {
      sessionStorage.setItem(prevSearchStoreKey, search)
    }
    setSearch(search)
  }

  return (
    <div className="app">
      <header className="app__header">
        <SearchBar
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
          initialValue={search}
        />
      </header>
      <RightSidepane data={data} show={showDetails} />
      <FloatingButton onClick={() => setShowDetails((prev) => !prev)} />
      <main>
        <div className="map__wrapper">
          <div id="map"></div>
        </div>
      </main>
    </div>
  )
}

export default App
