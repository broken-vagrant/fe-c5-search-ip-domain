import { ComponentProps } from 'react'
import { ListBulletIcon } from '../icons'
import classes from './index.module.css'

interface FloatingButtonProps extends ComponentProps<'button'> {}
const FloatingButton = (props: FloatingButtonProps) => {
  return (
    <button
      className={classes.floating__button}
      aria-label="Toggle details"
      {...props}
    >
      <ListBulletIcon />
    </button>
  )
}

export default FloatingButton
