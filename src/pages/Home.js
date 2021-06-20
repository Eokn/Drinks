import React from 'react'
import DrinkList from '../components/DrinkList'
import SearchForm from '../components/SearchForm'
export default function Home() {
  return (
    <main>
      <SearchForm />
      <DrinkList />
    </main>
  )
}
