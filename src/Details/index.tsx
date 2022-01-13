import { IpGeoInfo } from "../type";
import classes from './index.module.css';

interface Props {
  data: IpGeoInfo | null
}
const Details = ({ data }: Props) => {

  const { ip, isp, location } = data || {};

  return (
    <div className={classes.details__wrapper}>
      <dl className={classes.details}>
        <div>
          <dt>IP Address</dt>
          <dd>{ip ? ip : '...'}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{location ? `${location.city || ''} ${location.region || ''} ${location.postalCode || ''}` : '...'}</dd>
        </div>
        <div>
          <dt>Timezone</dt>
          <dd>{location ? `UTC${location.timezone}` : '...'}</dd>
        </div>
        <div>
          <dt>ISP</dt>
          <dd>{isp ? isp : '...'}</dd>
        </div>
      </dl>
    </div>
  )
}

export default Details;