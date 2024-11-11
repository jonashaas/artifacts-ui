"use client";

import { useEffect, useState } from 'react';

const CHARACTERS_URL = `${process.env.NEXT_PUBLIC_API_URL}/my/characters`;
const TOKEN = `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`;

function CharacterTabs() {
  const [characters, setCharacters] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0); // Default to the first tab

  const fetchCharacters = async () => {
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', Authorization: TOKEN },
    };
    try {
      const response = await fetch(CHARACTERS_URL, options);
      const data = await response.json();
      // console.log(data); // Log to verify the data structure
      setCharacters(data.data); // Update state with character data
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {characters.map((character, index) => (
        <>
          <input
            key={`${character.name}-tab`}
            type="radio"
            name="character_tabs"
            role="tab"
            className="tab"
            aria-label={character.name}
            checked={selectedTab === index}
            onChange={() => setSelectedTab(index)}
          />
          <div
            key={`${character.name}-content`}
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            hidden={selectedTab !== index}
          >
            Tab content for {character.name}
          </div>
        </>

      ))}
    </div>
  );
}

export default CharacterTabs;
