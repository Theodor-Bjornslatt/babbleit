import mongoose from 'mongoose'

import { JoiValidators } from '../../validation'
import users from './approved.users.json'
import notApprovedUsers from './non-approved.users.json'

const { MONGODB_HOST = 'localhost', MONGODB_PORT = '27017' } = process.env

beforeAll(async () => {
  await mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}`)
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoose.disconnect()
})

test('Test of the validations from a user registation', async () => {
  users.forEach(async (user) => {
    const result = JoiValidators['registration'].validate(user)
    expect(result.error).toBeUndefined()
  })

  notApprovedUsers.forEach(async (user) => {
    const result = JoiValidators['registration'].validate(user)
    expect(result.error).toBeDefined()
  })
})
