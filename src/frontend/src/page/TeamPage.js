import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

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
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
        </div>
      <div className="team-loss-section">
        
        Wins / Losses
      
        <PieChart
      data={[
       { title: 'Wins', value: team.totalWins, color: '#4da375' },
       { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#E86A4F' },
     ]}
/>;
      </div>

      <div className="match-detail-section">
      <h3>Latest Matches</h3>
      <MatchDetailCard  teamName={team.teamName} match={team.matches[0]} />
       </div>
      {team.matches.slice(1).map((match, index) => (
        <MatchSmallCard teamName={team.teamName} key={index} match={match} />
      ))}

      <div className='more-link'>
      <Link to= {`/team/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}> More..</Link>
      </div>
    </div>


  );
};
