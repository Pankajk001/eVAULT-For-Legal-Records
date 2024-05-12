import React from 'react'
import HeroSection from './sections/HeroSection'
import Features from './sections/Features'
import Contact from './sections/Contact'
import About from './sections/About'

export default function HomeMain() {
  return (
    <div>

        <HeroSection/>
        <About/>
        <Features/>
        <Contact/>
    </div>
  )
}
