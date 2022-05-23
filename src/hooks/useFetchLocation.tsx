import * as React from 'react'
import { IpGeoInfo } from '../type'
import fetchLocation from '../utils/fetchLocation'

const useFetchLocation = (value: string) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<IpGeoInfo>()
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    if (!value) return
    try {
      setIsLoading(true)
      fetchLocation(value).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setData(data)
          })
        } else {
          setError('Not Found!')
        }
        setIsLoading(false)
      })
    } catch (err) {
      setIsLoading(false)
      setError('Something went wrong!')
      console.error(err)
    }
  }, [value])
  return {
    data,
    isLoading,
    error,
  }
}

export default useFetchLocation
