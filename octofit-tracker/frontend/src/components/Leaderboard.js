import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  const rankMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  const teamBadgeColor = (team) => team === 'marvel' ? 'danger' : 'primary';

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <h4 className="mb-0">Leaderboard</h4>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-4">No results yet.</td></tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id}>
                    <td><strong>{rankMedal(index)}</strong></td>
                    <td>
                      <span className={`badge bg-${teamBadgeColor(entry.team)} badge-team`}>
                        {entry.team}
                      </span>
                    </td>
                    <td><strong>{entry.points}</strong> pts</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {leaderboard.length} team(s) on the leaderboard
      </div>
    </div>
  );
}

export default Leaderboard;
