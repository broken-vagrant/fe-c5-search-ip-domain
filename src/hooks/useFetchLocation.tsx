import * as React from 'react'
import { IpGeoInfo } from '../type'
import fetchLocation from '../utils/fetchLocation'

interface UseFetchLocationProps {
  search: string
  onSuccess?: () => void
}
const useFetchLocation = ({ search, onSuccess }: UseFetchLocationProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<IpGeoInfo>()
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    if (!search) return
    setIsLoading(true)
    setError('')
    fetchLocation(search)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setData(data)
            onSuccess?.()
          })
        } else {
          setError('Not Found!')
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setError(
          "Something went wrong! (If you're using Brave browser try disabling shields.)"
        )
        setIsLoading(false)
      })
  }, [search])
  return {
    data,
    isLoading,
    error,
  }
}

export default useFetchLocation
