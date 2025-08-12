'use client'

import { useEffect } from 'react'
import { analytics } from 'roaarrr-browser'

export function Analytics() {
  useEffect(() => {
    analytics.init(
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0SWQiOiIzNDI1NDEwYi1iMGQ5LTRhNDMtYmUwZC0wNzU1NjA3MDEwNzYiLCJpYXQiOjE3NTUwMTgwNzEsImV4cCI6MTc4NjU3NTY3MX0.JVRvT7U7GjClV0eUpl35SqiX4GH5WjQPAxbjKDsxJdo'
    )
  }, [])

  return null
}
