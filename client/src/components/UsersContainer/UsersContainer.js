import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './UsersContainer.css';

const UsersContainer = ({ users }) => {
  console.log(users);

  return (
    <div className="users-container">
      <div>
        <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
        <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
        <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
      </div>
      {
        users
          ? (
            <div>
              <h1>People currently chatting:</h1>
              <ul className="active-container">
                {users.map(({ id, name }) => (
                  <li key={id} className="active-item">
                    <img alt="Online Icon" src={onlineIcon} />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )
          : null
      }
    </div>
  );
};

export default UsersContainer;