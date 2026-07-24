import questionsData from './data/questions.json'
import type { QuestionsFile } from './types'

const data: QuestionsFile = questionsData

function App() {
  return (
    <main>
      <h1>{data.game}</h1>
      <p>
        {data.count} categories loaded across{' '}
        {new Set(data.categories.map((c) => c.area)).size} areas.
      </p>
    </main>
  )
}

export default App
