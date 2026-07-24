import { useState } from 'react'
import questionsData from './data/questions.json'
import Sidebar from './Sidebar'
import type { Category, QuestionsFile } from './types'

const data: QuestionsFile = questionsData

function pickRandomCategory(categories: Category[]): Category {
  return categories[Math.floor(Math.random() * categories.length)]
}

function App() {
  const [current, setCurrent] = useState<Category>(() =>
    pickRandomCategory(data.categories),
  )
  const [pickedFromSidebar, setPickedFromSidebar] = useState(false)

  function reroll() {
    const others = data.categories.filter((c) => c.id !== current.id)
    if (others.length === 0) return
    setCurrent(pickRandomCategory(others))
    setPickedFromSidebar(false)
  }

  function selectFromSidebar(category: Category) {
    setCurrent(category)
    setPickedFromSidebar(true)
  }

  return (
    <div className="layout">
      <Sidebar
        categories={data.categories}
        highlightedId={pickedFromSidebar ? current.id : null}
        onSelect={selectFromSidebar}
      />
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
    </div>
  )
}

export default App
