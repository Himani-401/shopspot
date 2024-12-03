import React from 'react'
import Upper from './Upper'
import ContentSection from './ContentSection'
import Products from './Products'
import Models from './Models'
import Home_About from './Home_about'

function Home() {
  return (
    <div>
         <Upper/>
    <ContentSection/>
    <Products/>
    <Models/>
    <Home_About/>
        </div>
  )
}

export default Home