import { useEffect, useRef } from 'react'

interface RulesModalProps {
  onClose: () => void
}

function RulesModal({ onClose }: RulesModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rules-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="rules-title">
            Rules
          </h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Close rules"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p className="rules-intro">
            A trivia and bluffing game. Each round has a "Top 10" category with
            one correct, objective ranking. Players take turns naming things
            they claim are on the list. Answers are only checked when someone{' '}
            <strong>contests</strong> — and contesting is the only thing that
            eliminates players. The{' '}
            <strong>last player left in the round scores the point.</strong>
          </p>

          <h3 className="rules-heading">Goal</h3>
          <p>
            Be the player with the most points after an agreed number of rounds,
            or the first to reach an agreed target (e.g. 5 points).
          </p>

          <h3 className="rules-heading">A round, step by step</h3>
          <ol className="rules-steps">
            <li>
              <strong>Reveal.</strong> The Reader picks a category — from the
              sidebar or with <strong>Reroll</strong> — and reads it out loud,
              then privately clicks the category to open the source so they can
              settle any contest. Everyone else plays from memory.
            </li>
            <li>
              <strong>Take turns.</strong> Starting left of the Reader and going
              clockwise, each player on their turn names <strong>one</strong>{' '}
              thing they claim is on the Top 10. Answers are <strong>not</strong>{' '}
              checked — a wrong answer that nobody challenges simply stands.
              Don't repeat something already said.
            </li>
            <li>
              <strong>Contest.</strong> At any time, any player may{' '}
              <strong>contest</strong> the answer — betting it is <em>not</em>{' '}
              really on the Top 10. When an answer is contested, the Reader
              checks the source and resolves it (see Elimination). Only
              contesting reveals the truth. The contester is still required to
              take a guess when their turn arrives.
            </li>
            <li>
              <strong>Keep going.</strong> Play continues around the table,
              skipping eliminated players, until only one player remains.
            </li>
          </ol>

          <h3 className="rules-heading">Elimination</h3>
          <p>
            A player can be eliminated <strong>only</strong> by a contest, in
            exactly two ways:
          </p>
          <ol className="rules-steps">
            <li>
              They contest an answer that <strong>is</strong> on the Top 10 →
              the <strong>contester</strong> is eliminated (they doubted a real
              answer).
            </li>
            <li>
              Their answer is contested and it is <strong>not</strong> on the
              Top 10 → the <strong>player who gave that answer</strong> is
              eliminated (their bluff was caught).
            </li>
          </ol>
          <p>
            Nothing else removes a player. You can survive a wrong answer
            indefinitely as long as no one contests it — but as the real entries
            get used up, every new answer is a bigger bluff, and a well-timed
            contest is how you knock rivals out.
          </p>

          <h3 className="rules-heading">Scoring</h3>
          <p>
            The <strong>last player remaining in the round wins 1 point.</strong>{' '}
            That is the only way to score — eliminated players get nothing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RulesModal
