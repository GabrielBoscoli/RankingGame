import { useState } from 'react'
import questionsData from './data/questions.json'
import RulesModal from './RulesModal'
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
  const [rulesOpen, setRulesOpen] = useState(false)

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
        <button
          type="button"
          className="rules-button"
          aria-label="Game rules"
          title="Game rules"
          onClick={() => setRulesOpen(true)}
        >
          <span aria-hidden="true">i</span>
        </button>
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
          <span className="reroll-icon" aria-hidden="true">
            ⟳
          </span>
        </button>
      </main>
      {rulesOpen && <RulesModal onClose={() => setRulesOpen(false)} />}
    </div>
  )
}

export default App
