import { Types } from 'mongoose'
import { NextFunction, Request, Response } from 'express'

import { CommunityAdminModel } from '../api/model'
import { Role } from '../types'
import { Unauthorized } from '../errors'

export async function addCommunityAdminRole(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return next()
  }

  const result = await CommunityAdminModel.aggregate<Role>([
    {
      $match: {
        userId: new Types.ObjectId(req.session.userId)
      }
    },
    {
      $match: {
        'roles.communityId': new Types.ObjectId(req.params.id)
      }
    },
    { $unwind: '$roles' },
    { $replaceRoot: { newRoot: '$roles' } },
    { $limit: 1 }
  ])

  req.communityAdminRole = result[0]?.role
  next()
}

export async function allowOnlyCommunityAdminsAndAdmins(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!(req.session.isAdmin || req.communityAdminRole === 'admin')) {
    next(
      new Unauthorized(
        'You must be an admin of the page or community to access this route'
      )
    )
  }
  next()
}
