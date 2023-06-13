import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdFileUpload, MdSend } from "react-icons/md";
import Hamster from "./Hamster";

// eslint-disable-next-line react/prop-types
function InputBox({ setChatHistory, setIsLoading, isLoading }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [ws, setWs] = useState(null);onmessage 

  useEffect(() => {
    const ws = new WebSocket("wss://chat.pristio.com/ws");
    ws.onmessage = (event) => {
      if (!event.data) {
        console.error('Received empty message from server');
        return;
      }
      try {
        const data = JSON.parse(event.data);
        // Update chat history with the new message
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          {
            You: message,
            Arti: data.response,
          },
        ]);
        // End loading
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing WebSocket message data:", error);
      }
    };

    setWs(ws);
    return () => ws.close();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append the selected file to the form data
    formData.append("file", file);

    setIsLoading(true); // Start loading

    try {
      // Send a POST request to your server
      const response = await fetch("https://chat.pristio.com/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      // Set file to null and end loading in all scenarios
      setFile(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    if (ws) {
      ws.send(JSON.stringify({ prompt: message })); // Send the message over WebSocket
      // Reset message input after submitting
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <ChatBackground>
      {isLoading ? (
        <Hamster />
      ) : (
        <>
          <UploadRow>
            <SendGroup>
              <RoundBgStack>
                <svg
                  viewBox="0 0 52 48.8"
                  style={{
                    top: 0,
                    left: 0,
                    width: 52,
                    height: 49,
                    position: "absolute",
                  }}
                >
                  <ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(52,50,50,1)"
                    cx={26}
                    cy={24}
                    rx={26}
                    ry={24}
                  ></ellipse>
                </svg>

                <UploadIcon />
              </RoundBgStack>
              <FileInput type="file" onChange={handleFileChange} />
              <UploadButton onClick={handleFileUpload}></UploadButton>
            </SendGroup>
            <TextBox
              id="userInput"
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              value={message}
            />

            <SendGroup>
              <RoundBgStack>
                <svg
                  viewBox="0 0 52 48.8"
                  style={{
                    top: 0,
                    left: 0,
                    width: 52,
                    height: 49,
                    position: "absolute",
                  }}
                >
                  <ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(52,50,50,1)"
                    cx={26}
                    cy={24}
                    rx={26}
                    ry={24}
                  ></ellipse>
                </svg>
                <MdSend
                  onClick={handleSubmit}
                  style={{
                    top: 8,
                    left: 11,
                    position: "absolute",
                    color: "rgba(128,128,128,1)",
                    fontSize: 30,
                  }}
                />
              </RoundBgStack>
            </SendGroup>
          </UploadRow>
        </>
      )}
    </ChatBackground>
  );
}

const ChatBackground = styled.div`
  width: 324px;
  height: 96px;
  background-color: #e6e6e6;
  border-radius: 24px;
  margin-top: 30px;
  margin-bottom: 80px;
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 900px;

  @media (max-width: 768px) {
    width: 400px;
  }
`;

const UploadIcon = styled(MdFileUpload)`
  top: 8px;
  left: 11px;
  position: absolute;
  color: rgba(128, 128, 128, 1);
  font-size: 30px;
`;

const TextBox = styled.textarea`
  overflow-y: scroll;
  width: 85%;
  height: 68px;
  background-color: #e6e6e6;
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 12px;
  padding-left: 7px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SendGroup = styled.div`
  width: 30px;
  height: 32px;
  flex-direction: column;
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 18px;
`;

const RoundBgStack = styled.div`
  width: 52px;
  height: 49px;
  margin-top: -8px;
  margin-left: -11px;
  position: relative;
`;

const UploadRow = styled.div`
  height: 68px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  width: 100%;
  margin-right: 26px;
  margin-left: 10px;
  margin-top: 14px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  display: block;
  margin-top: 8px;
  margin-left: 10px;
  background-color: #e6e6e6;
  color: #121212;
  border: none;
  font-family: Helvetica;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
`;

export default InputBox;
