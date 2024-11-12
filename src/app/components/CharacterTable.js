'use client';

import React from 'react';
import { useEffect, useState } from 'react';

function CharacterTable() {
  const [characters, setCharacters] = useState([]);

  const server = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const fetchCharacters = async () => {
    const url = server + '/my/characters';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      setCharacters(data); // Store fetched data in state
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCharacters(); // Fetch immediately on component mount
    const interval = setInterval(fetchCharacters, 20000); // Fetch every 20 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Skin</th>
            <th>Level</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{character.name}</td>
              <td>{character.skin}</td>
              <td>{character.level}</td>
              <td>{character.xp}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Skin</th>
            <th>Level</th>
            <th>XP</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CharacterTable;
