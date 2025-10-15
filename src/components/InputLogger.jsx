import { useState } from 'react'

export default function InputLogger() {
  const [text, setText] = useState('')

  const handleChange = (event) => {
console.log(event) 
setText(event.target.value)
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <label htmlFor="logger" style={{ display: 'block', marginBottom: 8 }}>
        VOUS DEVEZ SAISIR UN TEXTE ZEBI :
      </label>

      <input
        id="logger"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Écrire ici..."
       
      />

      <p style={{ marginTop: 12 }}>
        Texte trop stylé : <strong>{text || '...'}</strong>
      </p>
    </div>
  )
}