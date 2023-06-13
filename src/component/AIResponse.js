import React from "react";
import styled from "styled-components";

function AIResponse(props) {
  // eslint-disable-next-line react/prop-types
  return <ArtiWrapper>Arti: {props.children}</ArtiWrapper>;
}

const ArtiWrapper = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  background-color: rgba(142, 147, 152, 1);
  border-radius: 11px;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: {
    width: 3px;
    height: 3px;
  }
  elevation: 5;
  shadow-opacity: 0.27;
  shadow-radius: 0;
  width: 90%;
  padding: 20px;  
  opacity: 1;
  margin-top: 25px;
  margin-left: 21px;
  
`;

export default AIResponse;
