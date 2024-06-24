import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyCalendar from './components/MyCalendar'

function App() {
  return (
    <>
    <h1 style={{color:"cyan"}}>Event Calendar</h1>
    <MyCalendar />
    </>
  )
}

export default App
