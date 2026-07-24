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
        <a
          className="category-text"
          href={current.source_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {current.category}
        </a>
      </div>
    </main>
  )
}

export default App
