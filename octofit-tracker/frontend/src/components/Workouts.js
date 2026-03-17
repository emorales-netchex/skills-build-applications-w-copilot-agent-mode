import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts fetched data:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  const teamBadgeColor = (team) => team === 'marvel' ? 'danger' : 'primary';

  return (
    <div className="card">
      <div className="card-header bg-info text-white">
        <h4 className="mb-0">Workouts</h4>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Suggested For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-4">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout.id}>
                    <td>{index + 1}</td>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.description}</td>
                    <td>
                      <span className={`badge bg-${teamBadgeColor(workout.suggested_for)} badge-team`}>
                        {workout.suggested_for}
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
        {workouts.length} workout(s) available
      </div>
    </div>
  );
}

export default Workouts;
