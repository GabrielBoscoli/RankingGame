import { useState } from 'react'
import questionsData from './data/questions.json'
import type { Category, QuestionsFile } from './types'

const data: QuestionsFile = questionsData

function pickRandomCategory(categories: Category[]): Category {
  return categories[Math.floor(Math.random() * categories.length)]
}

function App() {
  const [current] = useState<Category>(() => pickRandomCategory(data.categories))

  return (
    <main>
      <h1>{data.game}</h1>
      <div className="category-card">
        <span className="category-text">{current.category}</span>
      </div>
    </main>
  )
}

export default App
