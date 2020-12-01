import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <section className="join-outer-container">
      <form className="join-inner-container">
        <h1 className="heading">Join</h1>
        <input
          placeholder="Name"
          className="join-inputs"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Room"
          className="join-inputs mt-20"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
        <Link
          onClick={event => (!name || !room) ? event.preventDefault() : null}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </form>
    </section>
  )
};

export default Join;