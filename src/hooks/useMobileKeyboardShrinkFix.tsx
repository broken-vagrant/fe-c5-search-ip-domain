import * as React from 'react'

const useMobileKeyboardShrinkFix = () => {
  React.useEffect(() => {
    // source: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css
    let viewheight = window.innerHeight
    let viewport = document.querySelector(
      'meta[name=viewport]'
    ) as HTMLMetaElement
    if (!viewport) {
      console.error('Please set viewport meta tag!')
      return
    }
    viewport?.setAttribute(
      'content',
      viewport.content + ',' + 'height=' + viewheight
    )
  }, [])
}

export default useMobileKeyboardShrinkFix
