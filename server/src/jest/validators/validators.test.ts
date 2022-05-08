import mongoose from 'mongoose'

import { JoiValidators } from '../../validation'
import { approvedTestUsers } from './approved.users'
import { nonApprovedTestUsers } from './non-approved.users'

const { MONGODB_HOST = 'localhost', MONGODB_PORT = '27017' } = process.env

beforeAll(async () => {
  await mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}`)
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoose.disconnect()
})

test('Validation a user registation', () => {
  approvedTestUsers.forEach((user) => {
    const result = JoiValidators['registration'].validate(user)
    expect(result.error).toBeUndefined()
  })

  nonApprovedTestUsers.forEach((user) => {
    const result = JoiValidators['registration'].validate(user)
    expect(result.error).toBeDefined()
  })
})
