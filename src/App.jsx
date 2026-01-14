import { useState } from 'react'
import './App.css'

function App() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])
  const [nextId, setNextId] = useState(1)
  const [search, setSearch] = useState('')

  function handleAdd() {
    const cleanedNote = note.trim()
    if (cleanedNote === '') return

    const newNote = { id: nextId, text: cleanedNote }
    setNotes([...notes, newNote])
    setNextId(nextId + 1)
    setNote('')
  }

  function handleDelete(id) {
    const filteredNotes = notes.filter((item) => item.id !== id)
    setNotes(filteredNotes)
  }

  const filteredNotes = notes.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h1>Daily Lines</h1>
      <p>A simple place to write daily notes.</p>

      <input
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
          }
        }}
      />

      <button onClick={handleAdd}>Add</button>

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredNotes.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App