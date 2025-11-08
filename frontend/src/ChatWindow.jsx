
import { useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

   
    const getReply = async () => {

        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                messages: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:3030/api/chat", options);
            const res = await response.json();
            // console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>Chat AI <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    
                        <button className="dropDownItem px-3 py-2 mt-2 w-100 text-start"  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                    
                        {/* <button className="dropDownItem px-3 py-2 mt-2 w-100 text-start" onClick={() => loginWithRedirect()}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log In</button> */}
                

                
                    </div>
            }
           
            <Chat></Chat>
           
            <HashLoader color="#fff" loading={loading}   size={60} />
            

                <div className="chatInput"> {/* Click and enter */}
            <div className="inputBox">
                <input placeholder="Ask anything"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                >
                       
                </input>
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div> 
            <p className="info">
                    Chat AI can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>


        </div>    
                
    )
}

export default ChatWindow;