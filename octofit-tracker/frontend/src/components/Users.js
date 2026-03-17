import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users fetched data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const teamBadgeColor = (team) => team === 'marvel' ? 'danger' : 'primary';

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Users</h4>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-4">No users found.</td></tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${teamBadgeColor(user.team)} badge-team`}>
                        {user.team}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {users.length} user(s) registered
      </div>
    </div>
  );
}

export default Users;
