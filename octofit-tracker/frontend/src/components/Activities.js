import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities fetched data:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  const typeBadgeColor = (type) => {
    const colors = { run: 'success', cycle: 'info', swim: 'primary', gym: 'warning' };
    return colors[type] || 'secondary';
  };

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark">
        <h4 className="mb-0">Activities</h4>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-4">No activities found.</td></tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td>{index + 1}</td>
                    <td><strong>{activity.user}</strong></td>
                    <td>
                      <span className={`badge bg-${typeBadgeColor(activity.type)} badge-team`}>
                        {activity.type}
                      </span>
                    </td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted small">
        {activities.length} activity(s) logged
      </div>
    </div>
  );
}

export default Activities;
