import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Welcome to ToDo App</h1>
        <p className="about-text">
          Manage Your Tasks Efficiently
        </p>
        <p className="about-description">
          Our ToDo app helps you stay organized and on top of your tasks. Whether you're managing work, school, or personal to-do lists, we’ve got you covered with an intuitive and seamless task management experience.
        </p>

        <h2 className="about-subtitle">Project Guide Overview</h2>
        <p className="about-description">
          The Project Guide provides step-by-step instructions to help you navigate the features of the ToDo app efficiently:
        </p>
        <ul className="about-list">
          <li><strong>Creating New Tasks:</strong> Easily add tasks and categorize them for better tracking.</li>
          <li><strong>Task Prioritization:</strong> Set due dates and priorities to focus on what’s important.</li>
          <li><strong>Task Reminders:</strong> Get notified so you never miss a deadline.</li>
          <li><strong>Task Completion:</strong> Mark tasks as complete and monitor your progress.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
