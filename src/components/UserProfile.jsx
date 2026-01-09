import { useState, useEffect } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        setUser(data)
        setIsLoading(false) 
      })
      .catch(error => {
        console.error('Erreur de chargement :', error)
        setIsLoading(false) 
      })
  }, [])

  if (isLoading) {
    return <p>Chargement...</p>
  }

  if (!user) {
    return <p>Erreur lors du chargement des données.</p>
  }

  return (
    <section className="card">
      <h2>Profil Utilisateur</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Entreprise :</strong> {user.company.name}</p>
    </section>
  )
}