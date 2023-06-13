import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import background from "./assets/images/background.jpg";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase app
const firebaseConfig = {

  apiKey: "AIzaSyAW6mno_8hTJR8PeejPPtoMHxKMbNDp7EE",
  authDomain: "arti-956d2.firebaseapp.com",
  projectId: "arti-956d2",
  storageBucket: "arti-956d2.appspot.com",
  messagingSenderId: "543857956854",
  appId: "1:543857956854:web:6a29f9959a060c195a99d7"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth();
const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate(); // Changed from `history` to `navigate`

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/app"); // Corrected the usage of `navigate`
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Background>
      <CenterContainer>
        <StyledButton onClick={handleLogin}>
          <span className="actual-text">&nbsp;Login&nbsp;</span>
          <span className="hover-text" aria-hidden="true">&nbsp;Login&nbsp;</span>
        </StyledButton>
      </CenterContainer>
    </Background>
  );
}
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: repeat;
  background-position: center;
  background-size: auto;
`;


const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  --border-right: 6px;
  --text-stroke-color: rgba(255, 255, 255, 0.6);
  --animation-color: #96DED1;
  --fs-size: 2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;

  .actual-text {
    position: relative;
  }

  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }

  &:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color));
  }
`;





export default Login;
