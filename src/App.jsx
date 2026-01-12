import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-blue-gray-900 flex items-center justify-center">
      <div className="text-white">
        <h1 className="text-4xl font-bold font-roboto mb-4">Weeb</h1>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App
