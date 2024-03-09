import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const [error, setError] = useState(null); // State to handle errors
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        setError(error.message); // Set the error message
      }
    };

    fetchMatches();
  }, [teamName]); // Pass teamName to the dependency array

  if (error) {
    // Render an error message if an error occurred
    return <div className="TeamPage">Error: {error}</div>;
  }

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      {team.matches.slice(1).map((match, index) => (
        <MatchSmallCard teamName={team.teamName} key={index} match={match} />
      ))}
    </div>
  );
};
