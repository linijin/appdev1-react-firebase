import { useState, useEffect } from 'react'
import ListTodos from './components/ListTodos'
import { BrowserRouter, Routes, Route } from "react-router"
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const [user,setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <ListTodos user={user} /> : <SignIn /> } />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
