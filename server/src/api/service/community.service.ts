import { Types } from 'mongoose'

import { Unauthorized, NotFound } from '../../errors'
import {
  Community,
  CommunityData,
  CommunityRegistration,
  CommunitySelect,
  Role
} from '../../types'
import {
  CommunityAdminModel,
  CommunityModel,
  UserCommunityModel
} from '../model'

async function saveNewCommunity(
  newCommunity: CommunityRegistration,
  userId: string
): Promise<CommunityData> {
  const { title, description } = newCommunity

  const community = new CommunityModel({
    title,
    description
  })

  const savedCommunity = await community.save()

  const {
    _id,
    title: savedTitle,
    description: savedDescription
  } = savedCommunity._doc

  const adminRole: Role = {
    role: 'admin',
    communityId: _id
  }

  await CommunityAdminModel.findOneAndUpdate(
    { userId },
    {
      $push: { roles: { ...adminRole } }
    },
    { upsert: true }
  )

  return {
    id: _id.toString(),
    title: savedTitle,
    description: savedDescription
  }
}

async function getAllCommunities(
  showBlockedCommunities = false
): Promise<CommunityData[]> {
  const communities = await CommunityModel.find<CommunitySelect>(
    showBlockedCommunities
      ? {}
      : {
          isBlocked: false
        }
  )

  return communities.map((community) => {
    return {
      id: community._id.toString(),
      title: community.title,
      description: community.description
    }
  })
}

// TODO add posts to response
async function findCommunityById(
  communityId: string,
  showBlockedCommunities = false
): Promise<Community> {
  const result = await CommunityModel.aggregate<Community>([
    { $match: { _id: new Types.ObjectId(communityId) } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        title: 1,
        description: 1,
        isBlocked: 1,
        members: {
          $map: {
            input: '$members',
            in: {
              userId: { $toString: '$$this.userId' },
              username: '$$this.username'
            }
          }
        }
      }
    }
  ])

  const community = result[0]

  if (!community) {
    throw new NotFound('No community by that id')
  }

  if (!showBlockedCommunities && community.isBlocked) {
    throw new Unauthorized('This community has been blocked by an admin')
  }

  return community
}

async function deleteCommunityById(id: string) {
  const userCommunityResult = await UserCommunityModel.updateMany(
    {},
    {
      $pull: {
        communities: {
          communityId: new Types.ObjectId(id)
        }
      }
    }
  )

  const communityResult = await CommunityModel.deleteOne({
    _id: new Types.ObjectId(id)
  })

  const communityAdminResult = await CommunityAdminModel.updateMany(
    {},
    {
      $pull: {
        roles: {
          communityId: new Types.ObjectId(id)
        }
      }
    }
  )

  return {
    isCommunityDeleted: communityResult.acknowledged,
    isUserCommunityDeleted: userCommunityResult.acknowledged,
    isCommunityAdminDeleted: communityAdminResult.acknowledged
  }
}

const CommunityService = {
  saveNewCommunity,
  getAllCommunities,
  findCommunityById,
  deleteCommunityById
}

export default CommunityService
