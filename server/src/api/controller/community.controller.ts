import { Request, Response } from 'express'

import { BadRequest, Unauthorized } from '../../errors'
import { createResponseMessage } from '../../utility'
import { CommunityService } from '../service'

const createCommunity = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error(`You shouldn't be here`)
  }

  const community = await CommunityService.saveNewCommunity(
    req.body,
    req.session.userId
  )

  res.json({ community })
}

const getCommunities = async (req: Request, res: Response) => {
  const communities = await CommunityService.getAllCommunities(
    req.session.isAdmin
  )
  res.json({ communities })
}

const getCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.findCommunityById(
    req.params.id,
    req.session.isAdmin
  )
  res.json({ community })
}

const postModerator = async (req: Request, res: Response) => {
  if (req.communityAdminRole !== 'admin') {
    throw new Unauthorized(
      'Access not allowed as you are not an admin of this community'
    )
  }
  const isModeratorAdded = await CommunityService.addModerator(
    req.params.id,
    req.body.userId
  )

  if (!isModeratorAdded) {
    throw new BadRequest('Moderator already exists')
  }

  res.json(createResponseMessage('Moderator added'))
}

const deleteCommunity = async (req: Request, res: Response) => {
  const acknowledgedResults = await CommunityService.deleteCommunityById(
    req.params.id
  )

  if (!acknowledgedResults.isCommunityDeleted) {
    throw new Error(
      'Something went wrong and the community could not be properly deleted'
    )
  }

  res.json(createResponseMessage(`Successfully deleted community`))
}

const communityController = {
  createCommunity,
  getCommunities,
  getCommunity,
  postModerator,
  deleteCommunity
}

export default communityController
