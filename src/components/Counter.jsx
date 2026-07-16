import { useState } from 'react'

const Counter = ( { name }) => {
    const [count, setCount] = useState(0)
  return (
    <div>
        <p>
            counter belonging to { name } 
        </p>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
    </div>
  )
}

export default Counter