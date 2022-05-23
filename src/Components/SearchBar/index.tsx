import { Dispatch, useState } from 'react'
import { SearchIcon, LoadingAnimationIcon } from '../icons'
import { IPGeoAddressAction } from '../../type'
import classes from './index.module.css'

interface Props {
  isLoading?: boolean
  dispatch: Dispatch<IPGeoAddressAction>
  error?: string
}
const SearchBar = ({ dispatch, isLoading, error }: Props) => {
  const [search, setSearch] = useState('192.212.174.101')
  return (
    <div className={classes.search}>
      <div className={classes.inner__wrapper}>
        <form
          onSubmit={(e) => {
            e.preventDefault() // don't actually submit the form
            dispatch({ type: 'INIT_SEARCH', payload: { search } })
          }}
        >
          <input
            name="search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search for any IP address or domain"
          />
          <button
            type="submit"
            className={classes['end-adornment']}
            aria-label="click to search"
            onClick={() =>
              dispatch({ type: 'INIT_SEARCH', payload: { search } })
            }
          >
            {isLoading ? <LoadingAnimationIcon /> : <SearchIcon />}
          </button>
        </form>
      </div>
      {error ? <p className={classes.error}>{error}</p> : null}
    </div>
  )
}

export default SearchBar
