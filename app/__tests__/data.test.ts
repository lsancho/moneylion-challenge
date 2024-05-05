import { expect, test } from 'vitest'

import { getFeed } from '../lib/api'

test('API feed ordered', async () => {
  const data = await getFeed()

  //asert that is ordered
  expect(data[0].metadata.priority).toBeGreaterThanOrEqual(data[1].metadata.priority)
  expect(data[1].metadata.priority).toBeGreaterThanOrEqual(data[2].metadata.priority)
  expect(data[2].metadata.priority).toBeGreaterThanOrEqual(data[3].metadata.priority)
  expect(data[3].metadata.priority).toBeGreaterThanOrEqual(data[4].metadata.priority)
})

test('API feed has data', async () => {
  const data = await getFeed()

  //assert that data is not empty
  expect(data.length).toBeGreaterThan(0)

  const d = data[0]
  expect(d.id).toBeDefined()
  expect(d.metadata.publishDate).toBeDefined()
  expect(d.metadata.priority).toBeDefined()
  expect(d.data.title).toBeDefined()
  expect(d.data.subTitle).toBeDefined()
  expect(d.data.body).toBeDefined()
  expect(d.data.imageUri).toBeDefined()
  expect(d.comments).toBeDefined()
})
