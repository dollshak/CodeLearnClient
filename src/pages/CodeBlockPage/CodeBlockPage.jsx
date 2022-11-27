import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const CodeBlockPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {console.log(searchParams.get("uuid"))}
      {console.log(searchParams.get("student_login"))}
      <div>code block</div>
    </div>
  );
};

export default CodeBlockPage;
