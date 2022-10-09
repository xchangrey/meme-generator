import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const Input = styled.input`
  color: purple;
  border-radius: 7px;
  border: 1px solid;
  margin: 0 5px;
  padding: 2px;
  text-align: center;
`;
const pulse = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const animation = (props) =>
  css`
    ${pulse} ${props.animationLength} infinite alternate;
  `;
const PulseButton = styled.button`
  background: #6441a5;
  border-radius: 7px;
  animation: ${animation};
`;

const MemeGenerator = () => {
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  const handleSumbit = (event) => {
    event.preventDefault();

    setRandomImg(
      allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)]["url"]
    );
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'topText') {
      setTopText(value);
    } else {
      setBottomText(value);
    }
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setAllMemeImgs(response.data.memes);
      });
  }, []);

  return (
    <div>
      <form className="meme-form" onSubmit={(e) => handleSumbit(e)}>
        <Input
          type="text"
          value={topText}
          name="topText"
          placeholder="Top Text"
          onChange={(e) => handleChange(e)}
        />

        <Input
          type="text"
          value={bottomText}
          name="bottomText"
          placeholder="Bottom Text"
          onChange={(e) => handleChange(e)}
        />

        <PulseButton>Generate</PulseButton>
      </form>
      <div className="meme">
        <img src={randomImg} alt="randomImg" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;
