import React from "react";
import styled from "styled-components";

function UserResponse(props) {
  // eslint-disable-next-line react/prop-types
  return <YouWrapper>You: {props.children}</YouWrapper>;
}

const YouWrapper = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  margin-top: 25px;
  background-color: rgba(74, 144, 226, 1);
  border-radius: 11px;
  opacity: 1;
  width: 90%;
  padding: 20px;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: {
    width: 3px;
    height: 3px;
  }
  elevation: 5;
  shadow-opacity: 0.27;
  shadow-radius: 0;
  margin-left: 17px;
`;

export default UserResponse;
