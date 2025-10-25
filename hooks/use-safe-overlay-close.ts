"use client"

import * as React from "react"

export function useSafeOverlayClose(onClose: () => void) {
  const pressedOnBackdrop = React.useRef(false)

  const onMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pressedOnBackdrop.current = e.target === e.currentTarget
  }, [])

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (pressedOnBackdrop.current && e.target === e.currentTarget) {
        onClose()
      }
      pressedOnBackdrop.current = false
    },
    [onClose],
  )

  return { onMouseDown, onClick }
}
