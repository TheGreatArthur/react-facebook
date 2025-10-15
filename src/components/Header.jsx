export default function Header({ onAddPost }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <h1>Mon Réseau Social</h1>
      {/* On utilise la fonction passée en prop */}
      <button onClick={onAddPost}>Ajouter un Post</button>
    </header>
  )
}