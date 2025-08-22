import React from "react";
import CreateButton from "./components/Create-new-button";
import SearchBar from "./components/Search-bar";
import Dropdown from "./components/Dropdown";

const App = () => {
  const handleFileAction = (action) => {
    console.log("File action selected:", action);
    switch (action) {
      case "new":
        // handle New logic
        break;
      case "open":
        // handle Open logic
        break;
      case "save":
        // handle Save logic
        break;
      case "saveAs":
        // handle Save As logic
        break;
      case "print":
        // handle Print logic (e.g., window.print())
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-center w-full bg-zinc-900">
        <h1 className="text-3xl font-bold text-white p-1">Notepad</h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-5 h-screen">
        <div className="col-span-1 border-r border-solid">
          <CreateButton />
          <SearchBar />
        </div>

        <div className="col-span-4">
          <div className="flex flex-row gap-4 bg-zinc-500 p-4 border-b border-solid">
            <Dropdown onAction={handleFileAction} />
          </div>
          <div>
          <textarea name="" id="" placeholder="Write Here.." className="resize-none w-full p-4">Write Here...</textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
