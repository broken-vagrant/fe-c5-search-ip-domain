import React, { RefObject, ComponentProps } from 'react'
import classes from './index.module.css'

interface OwnTextFieldProps<T> {
  InputProps?: {
    startAdornment?: JSX.Element | null
    endAdornment?: JSX.Element | null
  }
  fullWidth?: boolean
  label?: string
  error?: boolean
  helperText?: string
  tag: T
}
export type TextFieldProps<T extends 'input' | 'textarea'> =
  OwnTextFieldProps<T> & ComponentProps<T>

declare function TextFieldFn<T extends 'input' | 'textarea'>(
  props: TextFieldProps<T>
): JSX.Element

const TextField = React.forwardRef<HTMLElement, TextFieldProps<any>>(
  function TextField(props, ref) {
    const {
      InputProps = {},
      fullWidth,
      styles,
      label,
      tag,
      error,
      helperText,
      ...rest
    } = props
    const { startAdornment, endAdornment } = InputProps

    return (
      <div className={`${classes.field__root} ${error ? classes.error : ''}`}>
        <div className={classes.input__root}>
          {label ? <label>{label}</label> : null}
          {startAdornment ? startAdornment : null}
          {tag === 'textarea' ? (
            <textarea ref={ref as RefObject<HTMLTextAreaElement>} {...rest} />
          ) : (
            <input
              type="text"
              ref={ref as RefObject<HTMLInputElement>}
              {...rest}
            />
          )}
          <fieldset aria-hidden="true" className={classes.input__border}>
            <legend style={{ maxWidth: '100%' }}>
              <span>{label}</span>
            </legend>
          </fieldset>
          {endAdornment ? endAdornment : null}
        </div>
        {error ? <p className={classes.helper__text}>{helperText}</p> : null}
      </div>
    )
  }
) as typeof TextFieldFn

export default TextField
