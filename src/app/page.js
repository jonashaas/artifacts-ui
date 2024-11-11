import Image from "next/image";
import Status from "./components/status";
import CharacterTabs from "./components/CharacterTabs";

export default function Home() {
  return (
    <>
      <Status />
      <CharacterTabs />
    </>
  );
}
