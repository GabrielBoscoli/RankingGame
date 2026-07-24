import { useState } from 'react'
import questionsData from './data/questions.json'
import type { Category, QuestionsFile } from './types'

const data: QuestionsFile = questionsData

function pickRandomCategory(categories: Category[]): Category {
  return categories[Math.floor(Math.random() * categories.length)]
}

function App() {
  const [current, setCurrent] = useState<Category>(() =>
    pickRandomCategory(data.categories),
  )

  function reroll() {
    const others = data.categories.filter((c) => c.id !== current.id)
    if (others.length === 0) return
    setCurrent(pickRandomCategory(others))
  }

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
      <button type="button" className="reroll-button" onClick={reroll}>
        Reroll
      </button>
    </main>
  )
}

export default App
