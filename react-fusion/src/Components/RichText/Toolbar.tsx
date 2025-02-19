import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import "./Toolbar.module.css";

const config = {
  buttons: ["bold", "italic", "underline", "ul", "ol"], 
  toolbarAdaptive: false,  
  width: "100%",
  minHeight: "300px",
  maxHeight: "500px",
  showXPathInStatusbar: false,
  showCharsCounter: false,
  showWordsCounter: false,
  toolbarSticky: false,
  removeButtons: ["about"],
};


type ToolbarProps = {
  initialValue: string; 
  getValue: (value: string) => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <div className="jodit-container">
      <JoditEditor
        ref={editor}
        value={initialValue}
        config={config}
        tabIndex={1}
        onChange={(newContent) => getValue(newContent)}
      />
    </div>
  );
};

export default Toolbar;

