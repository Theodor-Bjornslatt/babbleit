import { createContext, useReducer } from 'react'

import { Community, CommunityPost, User, Id } from '../types'

const initialState = {
  user: {},
  communities: [],
  posts: []
}

type GlobalState = {
  user: Partial<User>
  communities: Community[]
  posts: CommunityPost[]
}

type SetStateAction =
  | { type: 'user'; payload: User }
  | { type: 'setCommunities'; payload: Community[] }
  | { type: 'setPosts'; payload: CommunityPost[] }
  | { type: 'removeCommunity'; payload: Id }
  | { type: 'removePost'; payload: Id }

type GlobalContextType = {
  state: GlobalState
  dispatch: (action: SetStateAction) => void
}

export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null
})

const GlobalReducer = (state: GlobalState, action: SetStateAction) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: action.payload
      }
    case 'setCommunities':
      return {
        ...state,
        communities: action.payload
      }
    case 'removeCommunity':
      const communityIndex = state.communities.findIndex(
        (community) => community.id === action.payload.id
      )
      const communities = [...state.communities]
      communities.splice(communityIndex, 1)
      return {
        ...state,
        communities
      }
    case 'setPosts':
      return {
        ...state,
        posts: action.payload
      }
    case 'removePost':
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      )
      const posts = [...state.posts]
      posts.splice(postIndex, 1)
      return {
        ...state,
        posts
      }

    default:
      return { ...state }
  }
}

type ContextProps = {
  children: JSX.Element[] | JSX.Element
}

export const GlobalContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer<
    (state: GlobalState, action: SetStateAction) => GlobalState
  >(GlobalReducer, {
    ...initialState
  })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
