import { useState } from "react";
import Toolbar from "./Toolbar";

const RichTextEditor = () => {
  const [ , setValue] = useState<string>("");

  const getValue = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="row">
      <div className="col-md-6" style={{ width:"85%" ,  margin: "auto", marginTop: "50px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{color:'white'}}>Rich Text Editor</h2>
        </div>
        <Toolbar initialValue="" getValue={getValue} />
        <br />
      </div>
    </div>
  );
};

export default RichTextEditor;
