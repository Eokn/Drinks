import { useState } from 'react'

const Counter = ( { name }) => {
    const [count, setCount] = useState(0)
  return (
    <div>
        <p data-testid="counter-name">
            counter belonging to { name || "a Guest"} 
        </p>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          increment
        </button>
        <p data-testid="counter-display">Count is {count}</p>
    </div>
  )
}

export default Counter