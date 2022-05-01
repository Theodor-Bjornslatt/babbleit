import { Request, Response } from 'express'

import { createResponseMessage } from '../../utility'
import { PostService } from '../service'

const getPostsInCommunity = async (req: Request, res: Response) => {
  const posts = await PostService.getPosts(req.params.id)

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

const postController = {
  getPostsInCommunity,
  createPost,
  updatePost
}

export default postController
