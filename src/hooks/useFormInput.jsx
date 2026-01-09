import { useState, useCallback } from 'react'

/**
 * @param {any} initialValue
 * @returns {{value: any, onChange: function}}
 */
export default function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e) => {
    // support both synthetic events and direct value calls
    if (e && e.target && typeof e.target.value !== 'undefined') {
      setValue(e.target.value)
    } else {
      setValue(e)
    }
  }, [])

  return { value, onChange }
}
