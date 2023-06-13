import React, { useEffect } from "react";
import styled from "styled-components";
import AIResponse from "./AIResponse";
import PropTypes from 'prop-types'; 
import UserResponse from "./UserResponse";
import { nanoid } from 'nanoid';

function ChatWindow({ chatHistory, setChatHistory }) {
  
  ChatWindow.propTypes = {
    chatHistory: PropTypes.array.isRequired,
    setChatHistory: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const response = await fetch("https://chat.pristio.com/get_history");
        const data = await response.json();
        console.log(data);
        setChatHistory(data.chat_history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    getChatHistory();
  }, []);

  return (
    
    <Container horizontal={false}>
      <ContentContainer>
      {chatHistory.map((entry) => (
   <React.Fragment key={nanoid()}>
    <UserResponse>{entry.You}</UserResponse>
    <AIResponse>{entry.Arti}</AIResponse>
  </React.Fragment>
))}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgba(230, 230, 230, 0.22);  
  border-radius: 40px;
  border-width: 21px;
  border-color: #000000;
  width: 900px;
  margin: 50px;
  min-height: 700px;
  border-style: solid;
  box-shadow: 3px 3px 0px  1px rgba(0,0,0,1);
  overflow: auto;

  @media (max-width: 768px) {
    width: 400px;
  }
`;


const ContentContainer = styled.div`
  padding: 20px;
`;

export default ChatWindow;
