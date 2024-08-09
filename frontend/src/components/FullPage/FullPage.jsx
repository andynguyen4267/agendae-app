import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './FullPage.css';
import welcome from './assets/welcome.png';
import add_task from './assets/add_task.png';
import complete from './assets/complete.png';
import voice from './assets/voice.png';

const FullPage = () => {
  return (
    <ReactFullpage
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <div className="header-content">
                <h1>Welcome to Agendae</h1>
                <p>Your ultimate to-do list application.</p>
              </div>
              <p className="scroll-prompt">Scroll down to learn more about Agendae</p>
            </div>
            <div className="section">
                <h1>Welcome to your Agendae To-Do List</h1>
                <img src={welcome} alt="welcome image" className="fullpage-image" />
            </div>
            <div className="section">
                <h1>Adding Tasks</h1>
                <h4>Type anything into the task field and Agendae will add it to your to-do list</h4>
              <img src={add_task} alt="add task image" className="fullpage-image" />
            </div>
            <div className="section">
                <h1>Voice Input</h1>
                <h4>Click on Start to begin voice input and use voice command "ADD TASK"</h4>
                <img src={voice} alt="voice image" className="fullpage-image" />
            </div>
            <div className="section">
                <h1>Completing and Deleting Tasks</h1>
                <h4>Click on Complete/Undo to mark tasks and Delete to remove a task</h4>
                <img src={complete} alt="complete image" className="fullpage-image" />
            </div>
            <div className="section">
                <h1>Ready to create your to-do list? Login or Sign up to create an account</h1>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default FullPage;
