import styled, { keyframes } from "styled-components";
import React from "react";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.img`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;

const Header = () => {
  return (
    <header>
      <Rotate
        src="http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png"
        alt="Problem?"
      />
      <p>Meme Generator</p>
    </header>
  );
};

export default Header;
