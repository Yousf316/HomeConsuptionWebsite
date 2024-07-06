import React, { createContext , useState } from 'react'

export const colorthem = createContext(null)

export default function ColorthemProvider({ children }) {
  const [color, setcolor] = useState('')
  return <colorthem.Provider value={{ color, setcolor }}>{children}</colorthem.Provider>
}
