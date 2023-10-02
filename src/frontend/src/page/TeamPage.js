import React, { useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
  const [team, setTeam] =  useState({matches: []}); // Initialize team state to null or an initial value

  useEffect(() => {
    const fetchMatches = async () => {
        const response = await fetch('http://localhost:8080/team/Delhi%20Capitals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data); // Set state with data
    };

    fetchMatches();
  }, []); // Pass an empty dependency array to run the effect only once on component mount

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard match={team.matches[0]}/>
      {team.matches.slice(1).map((match, index) => (
        <MatchSmallCard key={index} match={match} />
      ))}
    </div>
  );
}
