function App() {
  const [doctorsInput, setDoctorsInput] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [schedule, setSchedule] = React.useState(null);
  const [error, setError] = React.useState('');

  const generateSchedule = () => {
    const doctors = doctorsInput.split(',').map(d => d.trim()).filter(Boolean);
    if (doctors.length === 0) {
      setError('Please enter at least one doctor.');
      return;
    }
    const start = new Date(startDate);
    if (start.toString() === 'Invalid Date') {
      setError('Please enter a valid date.');
      return;
    }
    if (start.getDay() !== 1) { // Monday check
      setError('Start date must be a Monday.');
      return;
    }
    const assignments = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const doctor = doctors[i % doctors.length];
      assignments.push({ date, doctor });
    }
    setSchedule(assignments);
    setError('');
  };

  const renderSchedule = () => {
    if (!schedule) return null;
    const weeks = [];
    for (let w = 0; w < 4; w++) {
      weeks.push(schedule.slice(w * 7, w * 7 + 7));
    }
    return (
      React.createElement('div', { className: 'schedule' },
        weeks.map((week, wIndex) =>
          React.createElement('table', { key: wIndex },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', { colSpan: 2 }, `Week ${wIndex + 1}`)
              )
            ),
            React.createElement('tbody', null,
              week.map((day, dIndex) =>
                React.createElement('tr', { key: dIndex },
                  React.createElement('td', null, day.date.toDateString()),
                  React.createElement('td', null, day.doctor)
                )
              )
            )
          )
        )
      )
    );
  };

  return (
    React.createElement('div', { className: 'container' },
      React.createElement('h1', null, 'Doctor Scheduler'),
      React.createElement('label', null, 'Doctors (comma separated):'),
      React.createElement('textarea', {
        value: doctorsInput,
        onChange: e => setDoctorsInput(e.target.value)
      }),
      React.createElement('label', null, 'Start Date (Monday):'),
      React.createElement('input', {
        type: 'date',
        value: startDate,
        onChange: e => setStartDate(e.target.value)
      }),
      React.createElement('button', { onClick: generateSchedule }, 'Create Schedule'),
      error ? React.createElement('p', { className: 'error' }, error) : null,
      renderSchedule()
    )
  );
  return React.createElement('h1', null, 'Hello, React!');
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
