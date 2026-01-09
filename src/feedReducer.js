export const initialFeedState = [
  {
    id: 'seed_1',
    title: 'Bienvenue sur ReactBook',
    content: 'Premier post de la communaute. Partagez vos idees !',
    author: 'Admin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    liked: false,
    likesCount: 3,
  },
  {
    id: 'seed_2',
    title: 'Conseils React',
    content: 'Utilisez des composants petits et re-utilisables pour garder un code propre.',
    author: 'Camille',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    liked: true,
    likesCount: 8,
  },
  {
    id: 'seed_3',
    title: 'Team front',
    content: 'Qui vient au meetup JS de vendredi ?',
    author: 'Nabil',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    liked: false,
    likesCount: 1,
  },
  {
    id: 'seed_4',
    title: 'Design system',
    content: 'Je teste un nouveau theme clair, vous preferez quoi ?',
    author: 'Lea',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    liked: false,
    likesCount: 0,
  },
]

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
    liked: typeof payload.liked === 'boolean' ? payload.liked : false,
    likesCount:
      typeof payload.likesCount === 'number'
        ? payload.likesCount
        : Array.isArray(payload.likes)
        ? payload.likes.length
        : 0,
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

    case 'REMOVE_POST':
    case 'DELETE_POST': {
      const id = action.payload
      return state.filter((p) => p.id !== id)
    }

    case 'UPDATE_POST': {
      const { id, updates } = action.payload || {}
      if (!id || !updates) return state
      return state.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }

    case 'TOGGLE_LIKE': {
      const payload = action.payload
      if (!payload) return state

      const id = typeof payload === 'string' ? payload : payload.id
      if (!id) return state

      return state.map((p) => {
        if (p.id !== id) return p
        const newLiked = !Boolean(p.liked)
        const delta = newLiked ? 1 : -1
        const likesCount = Math.max(0, (p.likesCount || 0) + delta)
        return { ...p, liked: newLiked, likesCount }
      })
    }

    case 'SET_POSTS':
      return Array.isArray(action.payload) ? action.payload.slice() : state

    case 'CLEAR_POSTS':
      return []

    default:
      return state
  }
}
