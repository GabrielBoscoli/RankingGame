import { useState } from 'react'
import type { Category } from './types'

interface SidebarProps {
  categories: Category[]
  highlightedId: number | null
  onSelect: (category: Category) => void
}

interface AreaGroup {
  area: string
  categories: Category[]
}

function groupByArea(categories: Category[]): AreaGroup[] {
  const groups: AreaGroup[] = []
  const byArea = new Map<string, AreaGroup>()
  for (const category of categories) {
    let group = byArea.get(category.area)
    if (!group) {
      group = { area: category.area, categories: [] }
      byArea.set(category.area, group)
      groups.push(group)
    }
    group.categories.push(category)
  }
  return groups
}

function Sidebar({ categories, highlightedId, onSelect }: SidebarProps) {
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(
    () => new Set(),
  )
  const [collapsed, setCollapsed] = useState(true)

  function toggleArea(area: string) {
    setExpandedAreas((prev) => {
      const next = new Set(prev)
      if (next.has(area)) {
        next.delete(area)
      } else {
        next.add(area)
      }
      return next
    })
  }

  const groups = groupByArea(categories)

  return (
    <>
      {!collapsed && (
        <div className="sidebar-backdrop" onClick={() => setCollapsed(true)} />
      )}
      <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
        <div className="sidebar-header">
          {!collapsed && <h2 className="sidebar-title">Categories</h2>}
          <button
            type="button"
            className="sidebar-collapse-toggle"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <span className="toggle-icon" aria-hidden="true" />
          </button>
        </div>
        {!collapsed && (
          <ul className="sidebar-areas">
            {groups.map((group) => {
              const expanded = expandedAreas.has(group.area)
              return (
                <li key={group.area}>
                  <button
                    type="button"
                    className="area-toggle"
                    aria-expanded={expanded}
                    onClick={() => toggleArea(group.area)}
                  >
                    <span className="area-arrow">{expanded ? '▾' : '▸'}</span>
                    {group.area}
                  </button>
                  {expanded && (
                    <ul className="area-categories">
                      {group.categories.map((category) => (
                        <li key={category.id}>
                          <button
                            type="button"
                            className={
                              category.id === highlightedId
                                ? 'category-item selected'
                                : 'category-item'
                            }
                            onClick={() => onSelect(category)}
                          >
                            {category.category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </aside>
    </>
  )
}

export default Sidebar
