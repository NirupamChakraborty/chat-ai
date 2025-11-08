
import React, { useState } from 'react'
import { v1 as uuidv1 } from "uuid"
import "./App.css"
import ChatWindow from './ChatWindow.jsx'
import { MyContext } from './MyContext.jsx'
import Sidebar from './Sidebar.jsx'



function App() {
  const [prompt, setPrompt] =useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all previous chats of curr thread
  const [newChat, setNewChat] = useState(true); // checks if new chat is created
  const [allThreads, setAllThreads] = useState([]); // stores all chat threads

 const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
 }

  return (
  
     <div className="app">
     
      <MyContext.Provider value={providerValues}>
        <Sidebar/>
        <ChatWindow/>
      </MyContext.Provider>

     </div>
    
  )
}

export default App
