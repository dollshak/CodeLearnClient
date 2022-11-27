import React, { useState } from "react";
import { StudentsModal } from "../StudentsModal/StudentsModal";
import Axios from "axios";

const LobbyPage = () => {
  // const CodeBlock1 = {title: 'codeBlock1', code: 'this is the code 1'};
  // const CodeBlock2 = {title: 'codeBlock2', code: 'this is the code 2'};
  // const CodeBlocks = [CodeBlock1, CodeBlock2]
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [chosenCodeBlock, setChosenCodeBlock] = React.useState({
    title: "",
    code: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });

  const OnCodeBlockClick = (codeBlock) => {
    setChosenCodeBlock(codeBlock);
    setOpenModal(true);
  };

  const loadCoadBlocks = () => {
    api
      .get("/codeBlock")
      .then((res) => {
        setCodeBlocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lobby">
      <div className="lobby_container">
        <h1>Choose Code Block</h1>
        {loadCoadBlocks()}
        {codeBlocks.map((codeBlock) => (
          <button
            onClick={() => OnCodeBlockClick(codeBlock)}
            className="code_block"
          >
            {codeBlock.title}
          </button>
        ))}
        <StudentsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          codeBlock={chosenCodeBlock}
        />
      </div>
    </div>
  );
};

export default LobbyPage;
