"use client";

import { useEffect, useState } from 'react';

const SERVER_STATUS_URL = 'https://api.artifactsmmo.com/';

function Status() {
  const [status, setStatus] = useState({ isUp: null, data: null });

  const fetchStatus = async () => {
    try {
      const response = await fetch(SERVER_STATUS_URL);
      if (response.ok) {
        const jsonData = await response.json();
        console.log('Full JSON response:', jsonData); // Log to inspect the full response
        setStatus({ isUp: true, data: jsonData.data }); // Avoid extra layer by assigning `jsonData.data`
      } else {
        setStatus({ isUp: false, data: null });
      }
    } catch (error) {
      console.error('Error fetching server status:', error);
      setStatus({ isUp: false, data: null });
    }
  };

  useEffect(() => {
    fetchStatus(); // Fetch immediately on component mount
    const interval = setInterval(fetchStatus, 20000); // Fetch every 20 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {status.isUp === null && <p>Checking server status...</p>}
      {status.isUp === false && <p>Server Down</p>}
      {status.isUp && status.data && (
        <div>
          <p>Server Up</p>
          <p>Characters Online: {status.data.characters_online}</p>
          <p>Time Since Last Wipe: {Math.floor((Date.now() - new Date(status.data.last_wipe).getTime()) / (1000 * 60 * 60))}h {Math.floor(((Date.now() - new Date(status.data.last_wipe).getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m</p>
          <p>Max Level: {status.data.max_level}</p>
          <p>Next Wipe: {status.data.next_wipe}</p>
          <p>Server Time: {new Date(status.data.server_time).toISOString().slice(11, 16)}</p>
          <p>Status: {status.data.status}</p>
          <p>Version: {status.data.version}</p>
        </div>
      )}
    </div>
  );
}

export default Status;
