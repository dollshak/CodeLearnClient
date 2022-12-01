import React, { useEffect, useState } from "react";
import { StudentsModal } from "../StudentsModal/StudentsModal";
import Axios from "axios";
import configData from "../../config.json";

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [chosenCodeBlock, setChosenCodeBlock] = React.useState({
    title: "",
    code: "",
  });
  const [openModal, setOpenModal] = useState(false);
  // const api = Axios.create({
  //   baseURL: configData.server_url,
  // });

  const OnCodeBlockClick = (codeBlock) => {
    setChosenCodeBlock(codeBlock);
    setOpenModal(true);
  };

  // useEffect(() => {
  //   api
  //     .get("/codeBlock")
  //     .then((res) => {
  //       setCodeBlocks(res?.data);
  //     })
  //     .catch((err) => {
  //       console.log("could not get code block from server");
  //     });
  // });

  return (
    <div className="lobby">
      <div className="lobby_container">
        <h1 className="title">Choose Code Block</h1>
        <div className="code_blocks">
          {codeBlocks.map((codeBlock) => (
            <button
              onClick={() => OnCodeBlockClick(codeBlock)}
              className="button"
            >
              {codeBlock.title}
            </button>
          ))}
        </div>
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
