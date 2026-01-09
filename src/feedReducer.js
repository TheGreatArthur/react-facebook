
export const initialFeedState = []

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * @param {{content: string, author?: string, createdAt?: string, likes?: string[]}} payload
 */
export function createPostObject(payload) {
  return {
    id: payload.id || generateId(),
    content: payload.content || '',
    author: payload.author || 'Anonyme',
    createdAt: payload.createdAt || new Date().toISOString(),
    likes: Array.isArray(payload.likes) ? payload.likes.slice() : [],
    // champ simple pour toggler l'état "liked" (utile pour UI locale)
    liked: typeof payload.liked === 'boolean' ? payload.liked : false,
    // compteur indépendant (simplifie l'affichage)
    likesCount: typeof payload.likesCount === 'number' ? payload.likesCount : (Array.isArray(payload.likes) ? payload.likes.length : 0),
   
  }
}

/**
 * @param {Array} state 
 * @param {{type: string, payload: any}} action
 * @returns {Array}
 */
export default function feedReducer(state = initialFeedState, action) {
  switch (action && action.type) {
    case 'ADD_POST': {
      const payload = action.payload || {}
      const post = payload && payload.content ? createPostObject(payload) : null
      if (!post) return state
      return [...state, post]
    }

    case 'REMOVE_POST': {
      const idToRemove = action.payload
      return state.filter((p) => p.id !== idToRemove)
    }

    // alias : même comportement que REMOVE_POST
    case 'DELETE_POST': {
      const idToDelete = action.payload
      return state.filter((p) => p.id !== idToDelete)
    }

    case 'UPDATE_POST': {
      const { id, updates } = action.payload || {}
      if (!id || !updates) return state
      return state.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }

    case 'TOGGLE_LIKE': {
   
      const payload = action.payload
      if (!payload) return state

      // forme courte : payload est l'id (string)
      const id = typeof payload === 'string' ? payload : payload.id
      if (!id) return state

      const userId = typeof payload === 'object' && payload.userId ? payload.userId : null

      if (userId) {
        // Ancien comportement : gérer le tableau likes par userId
        return state.map((p) => {
          if (p.id !== id) return p
          const has = Array.isArray(p.likes) && p.likes.includes(userId)
          const likes = has ? p.likes.filter((u) => u !== userId) : [...(p.likes || []), userId]
          const likesCount = likes.length
          return { ...p, likes, likesCount }
        })
      }

      // Nouveau comportement : toggle boolean `liked`
      return state.map((p) => {
        if (p.id !== id) return p
        const newLiked = !Boolean(p.liked)
        const delta = newLiked ? 1 : -1
        const likesCount = Math.max(0, (typeof p.likesCount === 'number' ? p.likesCount : 0) + delta)
        return { ...p, liked: newLiked, likesCount }
      })
    }

    case 'SET_POSTS': {
      const posts = Array.isArray(action.payload) ? action.payload.slice() : state
      return posts
    }

    case 'CLEAR_POSTS':
      return []

    default:
      return state
  }
}
