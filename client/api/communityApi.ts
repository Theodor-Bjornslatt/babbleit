import {
  CommunitiesResponse,
  Community,
  CommunityRegistration,
  CommunityResponse,
  PostCreation,
  ResponseMessage
} from '../types'
import { createFetch, createServerSideFetch } from './createFetch'

export const apiGetCommunities = createServerSideFetch<
  never,
  CommunitiesResponse
>('communities', 'GET')

export const apiRemoveCommunity = createFetch<never, ResponseMessage>(
  'communities',
  'DELETE'
)

export const apiGetCommunity = createServerSideFetch<never, CommunityResponse>(
  'communities',
  'GET'
)

export const apiPutCommunity = createFetch<CommunityRegistration, Community>(
  'communities',
  'PUT'
)

export const apiPostNewCommunity = createFetch<
  CommunityRegistration,
  CommunityResponse
>('communities', 'POST')

export const apiPostNewCommunityPost = createFetch<PostCreation, undefined>(
  `communities`,
  'POST'
)
