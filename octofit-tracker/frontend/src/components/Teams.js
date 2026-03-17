import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams fetched data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  const teamBadgeColor = (name) => name === 'marvel' ? 'danger' : 'primary';

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h4 className="mb-0">Teams</h4>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
                <th scope="col">Member Count</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-4">No teams found.</td></tr>
              ) : (
                teams.map((team, index) => {
                  const members = Array.isArray(team.members) ? team.members : [];
                  return (
                    <tr key={team.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className={`badge bg-${teamBadgeColor(team.name)} badge-team`}>
                          {team.name}
                        </span>
                      </td>
                      <td>{members.join(', ')}</td>
                      <td>
                        <span className="badge bg-secondary">{members.length}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team(s) registered
      </div>
    </div>
  );
}

export default Teams;
