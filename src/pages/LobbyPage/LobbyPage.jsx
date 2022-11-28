import React, { useEffect, useState } from "react";
import { StudentsModal } from "../StudentsModal/StudentsModal";
import Axios from "axios";

const LobbyPage = () => {
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

  useEffect(() => {
    api
      .get("/codeBlock")
      .then((res) => {
        setCodeBlocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="lobby">
      <div className="lobby_container">
        <h1>Choose Code Block</h1>
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
