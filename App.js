import "./styles.css";
import FolderArea from "./components/Folderr";
import Explorer from "../src/Data/Dummy";
import useTraverseTree from "./hooks/use-traverse-tree";
import { useState } from "react";
export default function App() {
  const [explorerData, setexplorerData] = useState(Explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setexplorerData(finalTree);
  };

  return (
    <div className="App">
      <FolderArea handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
