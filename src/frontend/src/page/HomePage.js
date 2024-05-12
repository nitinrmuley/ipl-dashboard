import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './HomePage.scss';
import { PieChart } from 'react-minimal-pie-chart';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null); // State to handle errors
  useEffect(() => {
    const fetchAllTeams= async () => {
      try {
        const response = await fetch(`http://localhost:8080/team`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError(error.message); // Set the error message
      }
    };

    fetchAllTeams();
  }, []); // Pass teamName to the dependency array

  if (error) {
    // Render an error message if an error occurred
    return <div className="HomePage">Error: {error}</div>;
  }

  return (
    <div className="HomePage">
        <div className="header-section">
        <h1 className="app-name">Nitin IPL Dashboard</h1>
      </div>
       <div className="team-grid">
        {teams.map(team => <TeamTile teamName={team.teamName} />)}
      </div>
    </div>  
  );
};
