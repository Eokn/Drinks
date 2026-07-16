

const Greeting = ( { name } ) => {
  return (
    <div>Greetings { name || "World"}</div>
  )
}

export default Greeting