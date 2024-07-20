import { useState } from "react";

export default function FolderArea({ handleInsertNode, explorer }) {
  const [expand, isExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleInput = (e, isFolder) => {
    e.stopPropagation();
    isExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      //add logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => isExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          <div>
            <button
              onClick={(e) => {
                handleInput(e, true);
              }}
            >
              folder +
            </button>
            <button
              onClick={(e) => {
                handleInput(e, false);
              }}
            >
              file +
            </button>
          </div>
        </div>

        <div
          style={{
            display: expand ? "block" : "none",
            paddingLeft: 5,
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "🗄️"}</span>
              <input
                onKeyDown={addFolder}
                className="inputs"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <FolderArea handleInsertNode={handleInsertNode} explorer={exp} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">🗄️{explorer.name}</span>;
  }
}
