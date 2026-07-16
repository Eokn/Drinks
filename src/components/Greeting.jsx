

const Greeting = ( { name } ) => {
  return (
    <div>Greetings { name || "World"} to the greeting component</div>
  )
}

export default Greeting