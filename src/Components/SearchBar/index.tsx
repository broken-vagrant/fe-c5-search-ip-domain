import {
  ChangeEventHandler,
  ComponentProps,
  Dispatch,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react'
import { SearchIcon, LoadingAnimationIcon } from '../icons'
import { IPGeoAddressAction } from '../../type'
import classes from './index.module.css'
import useFetchLocation from '../../hooks/useFetchLocation'

interface SearchBarProps {
  isLoading?: boolean
  error?: string
  onSubmit: (search: string) => void
  initialValue: string
}
const SearchBar = ({
  isLoading,
  error,
  onSubmit,
  initialValue,
}: SearchBarProps) => {
  const [search, setSearch] = useState(initialValue || '')
  return (
    <div className={classes.search}>
      <div className={classes.inner__wrapper}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(search)
          }}
        >
          <input
            name="search"
            type="text"
            value={search}
            placeholder="Search for any IP address or domain"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className={classes['end-adornment']}
            aria-label="click to search"
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
