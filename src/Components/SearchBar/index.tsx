import { useState } from 'react'
import { SearchIcon, LoadingAnimationIcon } from '../icons'
import TextField from '../TextField'
import classes from './index.module.css'

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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(search)
        }}
      >
        <TextField
          tag="input"
          name="search"
          type="text"
          value={search}
          placeholder="Search for any IP address or domain"
          onChange={(e: any) => setSearch(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          spellCheck={false}
          InputProps={{
            endAdornment: (
              <button
                type="submit"
                className={classes['end-adornment']}
                aria-label="search"
              >
                {isLoading ? <LoadingAnimationIcon /> : <SearchIcon />}
              </button>
            ),
          }}
        />
      </form>
    </div>
  )
}

export default SearchBar
