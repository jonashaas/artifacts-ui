"use client";

import Image from "next/image";
import Status from "./components/status";
import CharacterTable from "./components/CharacterTable";

export default function Home() {
  // useEffect(() => {
  //   // Call the movement function with sample data
  //   const testCharacter = "myCharacterId"; // Replace with a valid character ID
  //   const testX = 1; // Sample x-coordinate
  //   const testY = 2; // Sample y-coordinate

  //   movement("Richard", 0, 0)
  //     .then(() => console.log("Movement function executed"))
  //     .catch((error) => console.error("Error calling movement function", error));
  // }, []);

  return (
    <div className="flex flex-col items-start min-h-screen gap-4 max-w-6xl w-full p-4 m-auto">
      {/* Status component - Full Width */}
      <div className="w-full">
        <Status />
      </div>

      {/* Row for CharacterTable components */}
      <div className="flex w-full gap-4">
        <div className="rounded-2xl bg-neutral w-full p-6">
          <CharacterTable />
        </div>
        <div className="rounded-2xl bg-neutral w-full p-6">
          <CharacterTable />
        </div>
      </div>
    </div>
  );
}
