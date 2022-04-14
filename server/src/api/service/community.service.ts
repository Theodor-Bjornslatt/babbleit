import { Types } from 'mongoose'

import { Unauthorized, NotFound } from '../../errors'
import {
  CommunityData,
  CommunityMemberJoin,
  CommunitySelect,
  CommunityWithMembers
} from '../../types'
import { CommunityModel } from '../model'

// TODO add saving of user as communityAdmin
async function saveNewCommunity(newCommunity: {
  title: string
  description: string
}): Promise<CommunityData> {
  const { title, description } = newCommunity

  const community = new CommunityModel({
    title,
    description
  })

  const savedCommunity = await community.save()

  const {
    _id: id,
    title: savedTitle,
    description: savedDescription
  } = savedCommunity._doc

  return { id, title: savedTitle, description: savedDescription }
}

async function getAllCommunities(): Promise<CommunityData[]> {
  const communities = await CommunityModel.find<CommunitySelect>({
    isBlocked: false
  }).select('id title description')

  return communities.map((community) => {
    return {
      id: community._id,
      title: community.title,
      description: community.description
    }
  })
}

//TODO: add posts and members when fetching a community
async function findCommunityById(
  communityId: string,
  showBlockedCommunities?: boolean
): Promise<CommunityWithMembers> {
  const result = await CommunityModel.aggregate<CommunityMemberJoin>([
    { $match: { _id: new Types.ObjectId(communityId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'users',
        localField: 'members.userId',
        foreignField: '_id',
        as: 'matchingUsers',
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1
            }
          }
        ]
      }
    },
    {
      $project: {
        title: 1,
        description: 1,
        isBlocked: 1,
        members: {
          $map: {
            input: '$matchingUsers',
            as: 'userMatch',
            in: {
              $mergeObjects: [
                '$$userMatch',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$members',
                        as: 'communityMembers',
                        cond: {
                          $eq: ['$$communityMembers.userId', '$$userMatch._id']
                        }
                      }
                    },
                    0
                  ]
                }
              ]
            }
          }
        }
      }
    },
    {
      $unset: ['members._id']
    }
  ])

  const community = result[0]

  if (!community) {
    throw new NotFound('No community by that id')
  }

  if (!showBlockedCommunities && community.isBlocked) {
    throw new Unauthorized('This community has been blocked by an admin')
  }

  const communityResponse = {
    id: community._id.toString(),
    title: community.title,
    description: community.description,
    isBlocked: !!community.isBlocked,
    members: community.members.map((member) => {
      const { username, userId, isBlocked } = member
      return { id: userId.toString(), username, isBlocked: !!isBlocked }
    })
  }

  console.log('res', communityResponse)

  return communityResponse
}

const CommunityService = {
  saveNewCommunity,
  getAllCommunities,
  findCommunityById
}

export default CommunityService
