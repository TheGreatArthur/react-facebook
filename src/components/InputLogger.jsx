import { useState } from 'react'

export default function InputLogger() {
  const [text, setText] = useState('')

  const handleChange = (event) => {
console.log(event) 
setText(event.target.value)
  }

  return (
    <div className="card">
      <label htmlFor="logger" className="form-row">
        VOUS DEVEZ SAISIR UN TEXTE ZEBI :
      </label>

      <input
        id="logger"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Écrire ici..."
      />

      <p className="form-note">
        Texte trop stylé : <strong>{text || '...'}</strong>
      </p>
    </div>
  )
}