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
        // console.log('Full JSON response:', jsonData);
        setStatus({ isUp: true, data: jsonData.data });
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
    <div className="stats bg-neutral w-full flex justify-between flex-wrap">
      {/* Server Status */}
      <div className="stat bg-primary flex-grow flex-1">
        <div className="stat-title">Server Status</div>
        <div className="stat-value">
          {status.isUp === null ? "Checking..." : status.isUp ? "Online" : "Offline"}
        </div>
      </div>

      {/* Characters Online */}
      {status.isUp && status.data && (
        <>
          <div className="stat flex-grow flex-1">
            <div className="stat-title">Characters Online</div>
            <div className="stat-value">{status.data.characters_online}</div>
          </div>

          <div className="stat flex-grow flex-1">
            <div className="stat-title">Last Wipe</div>
            <div className="stat-value">
              {Math.floor(
                (Date.now() - new Date(status.data.last_wipe).getTime()) /
                (1000 * 60 * 60 * 24)
              )}
              days
            </div>
          </div>

          <div className="stat flex-grow flex-1">
            <div className="stat-title">Max Level</div>
            <div className="stat-value">{status.data.max_level}</div>
          </div>

          <div className="stat flex-grow flex-1">
            <div className="stat-title">Next Wipe</div>
            <div className="stat-value">
              {status.data.next_wipe === "N/A" ? "Unknown" : status.data.next_wipe}
            </div>
          </div>

          <div className="stat flex-grow flex-1">
            <div className="stat-title">Server Time</div>
            <div className="stat-value">
              {new Date(status.data.server_time).toISOString().slice(11, 16)}
            </div>
          </div>

          <div className="stat flex-grow flex-1">
            <div className="stat-title">Version</div>
            <div className="stat-value">{status.data.version}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Status;


