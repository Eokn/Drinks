import Typography from "@mui/material/Typography"


const Greeting = ( { name } ) => {
  return (
    <Typography variant='h5' color='primary'>Greetings { name || "World"}</Typography>
  )
}

export default Greeting