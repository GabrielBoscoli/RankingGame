export interface Category {
  id: number
  area: string
  category: string
  source_url: string
}

export interface QuestionsFile {
  game: string
  count: number
  categories: Category[]
}
