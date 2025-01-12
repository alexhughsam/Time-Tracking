import React, { useState, useEffect } from 'react';
import './TimeTracker.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TimeTracker = () => {
  const [timeEntries, setTimeEntries] = useState(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    return savedEntries ? JSON.parse(savedEntries) : {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    };
  });

  const [newEntry, setNewEntry] = useState({
    hours: '',
    project: '',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
  }, [timeEntries]);

  const handleAddEntry = (day) => {
    if (!newEntry.hours || !newEntry.project || !newEntry.description) return;
    
    setTimeEntries(prev => ({
      ...prev,
      [day]: [...prev[day], { ...newEntry, id: Date.now() }]
    }));
    
    setNewEntry({ hours: '', project: '', description: '' });
  };

  const handleDeleteEntry = (day, entryId) => {
    setTimeEntries(prev => ({
      ...prev,
      [day]: prev[day].filter(entry => entry.id !== entryId)
    }));
  };

  const handleResetDay = (day) => {
    setTimeEntries(prev => ({
      ...prev,
      [day]: []
    }));
  };

  const handleResetWeek = () => {
    setTimeEntries({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    });
  };

  return (
    <div className="time-tracker">
      <h1>Weekly Time Tracker</h1>
      <div className="input-section">
        <input
          type="number"
          placeholder="Hours"
          value={newEntry.hours}
          onChange={(e) => setNewEntry(prev => ({ ...prev, hours: e.target.value }))}
          min="0"
          step="0.5"
        />
        <input
          type="text"
          placeholder="Project Name"
          value={newEntry.project}
          onChange={(e) => setNewEntry(prev => ({ ...prev, project: e.target.value }))}
        />
        <input
          type="text"
          placeholder="What did you work on?"
          value={newEntry.description}
          onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      
      <button onClick={handleResetWeek} className="reset-week">
        Reset Week
      </button>

      <div className="days-container">
        {DAYS.map(day => (
          <div key={day} className="day-section">
            <div className="day-header">
              <h2>{day}</h2>
              <button 
                onClick={() => handleResetDay(day)} 
                className="reset-day"
              >
                Reset Day
              </button>
            </div>
            <div className="entries-container">
              <button 
                onClick={() => handleAddEntry(day)} 
                className="add-entry"
              >
                Add Time Entry
              </button>
              <div className="entries">
                {timeEntries[day].map(entry => (
                  <div key={entry.id} className="entry">
                    <span>{entry.hours}h</span>
                    <span>{entry.project}</span>
                    <span>{entry.description}</span>
                    <button 
                      onClick={() => handleDeleteEntry(day, entry.id)}
                      className="delete-entry"
                      aria-label="Delete entry"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracker; 