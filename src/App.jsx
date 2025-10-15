import Header from './components/Header.jsx'
import UserProfile from './components/UserProfile.jsx'
import Feed from './components/Feed.jsx'
import PostCard from './components/PostCard.jsx'
import InputLogger from './components/InputLogger.jsx'
import LoginForm from './components/LoginForm.jsx'
import MessageBoard from './components/MessageBoard.jsx'

export default function App() {
  const handleAddPost = () => {
    console.log('Ouverture du formulaire')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
   
      <Header onAddPost={handleAddPost} />


      <UserProfile />

      <LoginForm />

      <h1>je test Messageboard en mode GOATESQUE</h1>
      <MessageBoard />

    
      <Feed />

  
      <div style={{ marginTop: 24 }}>
        <h3>Exemple de PostCard autonome</h3>
        <PostCard
          author="Demo"
          content="Ceci est une PostCard affichée directement depuis App.jsx."
          initialLikes={1}
        />
      </div>

      <InputLogger />

      

    </div>
  )
}