import { Request, Response } from 'express'

import { Unauthorized } from '../../errors'
import { createResponseMessage } from '../../utility'
import { PostService } from '../service'

const getPostsInCommunity = async (req: Request, res: Response) => {
  const posts = await PostService.getPosts(
    req.params.id,
    req.session.isAdmin,
    req.session.isAdmin || !!req.communityAdminRole
  )

  res.json({ posts: posts })
}

const createPost = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error(`You shouldn't be here`)
  }
  const newPost = await PostService.createPost(
    req.session.userId,
    req.params.id,
    req.body
  )
  res.json({ newPost })
}

const updatePost = async (req: Request, res: Response) => {
  const isUpdated = await PostService.updatePost(
    req.params.postId,
    req.session.userId as string,
    req.body
  )

  if (!isUpdated) {
    throw new Error('Update unsuccessful')
  }

  res.json(createResponseMessage('Successfully updated your post'))
}

const updateBlockedStatus = async (req: Request, res: Response) => {
  const { isBlocked } = req.body

  const isUpdated = await PostService.updateBlockedStatus(
    req.params.postId,
    isBlocked
  )

  if (!isUpdated) {
    throw new Error('Update of blocked status was unsuccessful')
  }

  res.json(
    createResponseMessage(
      `Post successfully ${isBlocked ? 'blocked' : 'unblocked'}`
    )
  )
}

const deletePost = async (req: Request, res: Response) => {
  const isDeleted = await PostService.deletePost(
    req.params.postId,
    req.session.userId as string,
    req.session.isAdmin || !!req.communityAdminRole
  )

  if (!isDeleted) {
    throw new Error('Could not delete post')
  }

  res.json(createResponseMessage('Successfully deleted post'))
}

const getPost = async (req: Request, res: Response) => {
  const post = await PostService.findPostById(
    req.params.postId,
    req.session.isAdmin || !!req.communityAdminRole
  )

  if (post.isBlocked && !req.session.isAdmin) {
    throw new Unauthorized('This post has been blocked')
  }

  res.json({ post })
}

const postController = {
  getPostsInCommunity,
  createPost,
  updatePost,
  updateBlockedStatus,
  deletePost,
  getPost
}

export default postController
