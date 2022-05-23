import { IpGeoInfo } from '../../type'
import classes from './index.module.css'

const LocationDetails = ({ data }: { data: RightSidePaneProps['data'] }) => {
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
interface RightSidePaneProps {
  data?: IpGeoInfo
  show: boolean
}
const RightSidepane = ({ data, show }: RightSidePaneProps) => {
  if (!show) return null
  return (
    <aside className={classes['right-side-pane']}>
      <LocationDetails data={data!} />
    </aside>
  )
}

export default RightSidepane
