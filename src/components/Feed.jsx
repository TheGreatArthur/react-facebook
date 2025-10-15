import { useState, useEffect } from 'react'
import Header from './Header.jsx'

export default function Feed() {
  const [totalPosts, setTotalPosts] = useState(0)

  const handleAddPost = () => {
    console.log("Ouverture du formulaire")

  }


  useEffect(() => {
    document.title = `ReactBook | ${totalPosts} Posts`
  }, [totalPosts]) 
  return (
    <section>
      <Header onAddPost={handleAddPost} />
      <h2>Fil d’actualités</h2>
      <p>Nombre total de posts : {totalPosts}</p>
    </section>
  )
}