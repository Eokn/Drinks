import { useEffect, useState } from "react"

const Data = ( { name, userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
    }, [userId])
    if (!user) return <p data-testId='loading'>Loading user data for {name || "a Guest"}...</p>
  return (
    <div>
      <p>data for { name }</p>
      <h2>User Name: {user.name}</h2>
      <p>{user.email}</p>
    
    </div>
  )
}

export default Data