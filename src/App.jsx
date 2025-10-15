import Header from './components/Header.jsx'
import UserProfile from './components/UserProfile.jsx'
import Feed from './components/Feed.jsx'
import PostCard from './components/PostCard.jsx'

export default function App() {
  const handleAddPost = () => {
    console.log('Ouverture du formulaire')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      {/* Header utilisé avec la callback */}
      <Header onAddPost={handleAddPost} />

      {/* Profil récupéré via l’API */}
      <UserProfile />

      {/* Fil d’actualités (state + useEffect pour le titre) */}
      <Feed />

      {/* PostCard autonome pour montrer l’utilisation directe */}
      <div style={{ marginTop: 24 }}>
        <h3>Exemple de PostCard autonome</h3>
        <PostCard
          author="Demo"
          content="Ceci est une PostCard affichée directement depuis App.jsx."
          initialLikes={1}
        />
      </div>
    </div>
  )
}