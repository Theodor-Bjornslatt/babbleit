import { Request, Response } from 'express'

import { ExampleService } from '../service'

const apiGetHello = async (_: Request, res: Response) => {
  const hello = await ExampleService.getHello()
  res.json(hello)
}

const ExampleController = {
  apiGetHello
}

export default ExampleController
