import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";
import background from "./assets/images/background.jpg";
import ChatWindow from './component/ChatWindow';
import Hamster from './component/Hamster';

const WebSocketURL = 'wss://chat.pristio.com/ws';

function AppLayout() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [InputBox, setInputBox] = useState(null); 

  useEffect(() => {
    document.title = "Arti";
    if (WebSocketURL.includes('wss://chat.pristio.com')) {
      import('./component/InputBoxWS').then((module) => {
        setInputBox(() => module.default); // Update the state variable
      });
    } else {
      import('./component/InputBox').then((module) => {
        setInputBox(() => module.default); // Update the state variable
      });
    }
  }, []);

  if (!InputBox) {
    return null;
  }

  return (
    
    <Background>
            {isLoading ? (
        <Hamster />
      ) : (
        <>
      <ChatWindow chatHistory={chatHistory} setChatHistory={setChatHistory} />
      <InputBox chatHistory={chatHistory} setChatHistory={setChatHistory} setIsLoading={setIsLoading} isLoading={isLoading} />
      </>
      )}
      </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: url(${background});
  background-repeat: repeat;
  background-position: center;
  background-size: auto;
  position: relative;
`;

export default AppLayout;
