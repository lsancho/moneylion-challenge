import { cache } from 'react'

import { getFeed as getFeedAPI } from './api'

import 'server-only'

export const preload = () => {
  void getFeed()
}

export const getFeed = cache(getFeedAPI)
