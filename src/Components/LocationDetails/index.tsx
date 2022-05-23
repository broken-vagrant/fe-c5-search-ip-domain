import { IpGeoInfo } from '../../type'
import classes from './index.module.css'

interface Props {
  data: IpGeoInfo | null
}
const LocationDetails = ({ data }: Props) => {
  const { ip, isp, city, zipcode, state_prov, time_zone } = data || {}

  return (
    <div className={classes.details__wrapper}>
      <dl className={classes.details}>
        <div>
          <dt>IP Address</dt>
          <dd>{ip ? ip : '...'}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>
            {city
              ? `${city || ''}, ${state_prov || ''} ${zipcode || ''}`
              : '...'}
          </dd>
        </div>
        <div>
          <dt>Timezone</dt>
          <dd>
            {time_zone
              ? `UTC ${
                  time_zone.offset > 0
                    ? `+${time_zone.offset}`
                    : time_zone.offset
                }`
              : '...'}
          </dd>
        </div>
        <div>
          <dt>ISP</dt>
          <dd>{isp ? isp : '...'}</dd>
        </div>
      </dl>
    </div>
  )
}

export default LocationDetails
