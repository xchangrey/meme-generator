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

    switch (name) {
      case "topText":
        setTopText(value);
        break;
      case "bottomText":
        setBottomText(value);
        break;
      default:
        break;
    }
  };

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

/**
 * NOTE: Please disregard code below. Treat as reference implem only
 * Class implementation of the memegenerator app
 */
// class MemeGenerator extends Component {
//   constructor() {
//     super();

//     this.state = {
//       topText: "",
//       bottomText: "",
//       randomImg: "http://i.imgflip.com/1bij.jpg",
//       allMemeImgs: []
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSumbit = this.handleSumbit.bind(this);
//   }

//   componentDidMount() {
//     fetch("https://api.imgflip.com/get_memes")
//       .then(response => response.json())
//       .then(response => {
//         this.setState({
//           allMemeImgs: response.data.memes
//         });
//       });
//   }

//   handleChange(event) {
//     const { value, name } = event.target;

//     this.setState({
//       [name]: value
//     });
//   }

//   handleSumbit(event) {
//     event.preventDefault();

//     const memeImgs = this.state.allMemeImgs;

//     this.setState({
//       randomImg: memeImgs[Math.floor(Math.random() * memeImgs.length)]["url"]
//     });
//   }

//   render() {
//     const { randomImg, topText, bottomText } = this.state;

//     return (
//       <div>
//         <form className="meme-form" onSubmit={this.handleSumbit}>
//           <Input
//             type="text"
//             value={topText}
//             name="topText"
//             placeholder="Top Text"
//             onChange={this.handleChange}
//           />

//           <Input
//             type="text"
//             value={bottomText}
//             name="bottomText"
//             placeholder="Bottom Text"
//             onChange={this.handleChange}
//           />

//           <PulseButton>Generate</PulseButton>
//         </form>
//         <div className="meme">
//           <img src={randomImg} alt="randomImg" />
//           <h2 className="top">{topText}</h2>
//           <h2 className="bottom">{bottomText}</h2>
//         </div>
//       </div>
//     );
//   }
// }

export default MemeGenerator;
