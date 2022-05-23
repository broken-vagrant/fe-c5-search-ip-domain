import * as React from 'react'
import './App.css'
import SearchBar from './Components/SearchBar'
import useMap from './hooks/useMap'
import useMobileKeyboardShrinkFix from './hooks/useMobileKeyboardShrinkFix'
import useFetchLocation from './hooks/useFetchLocation'
import FloatingButton from './Components/FloatingButton'
import RightSidepane from './Components/RightSidePane'

const initialSearch = '192.212.174.101'
function App() {
  useMobileKeyboardShrinkFix()
  const [search, setSearch] = React.useState(initialSearch)
  const [showDetails, setShowDetails] = React.useState(true)

  const { data, isLoading, error } = useFetchLocation(search)

  useMap(data?.latitude, data?.longitude as string)

  return (
    <div className="app">
      <header className="app__header">
        <SearchBar
          isLoading={isLoading}
          error={error}
          onSubmit={(search) => setSearch(search)}
          initialValue={initialSearch}
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
