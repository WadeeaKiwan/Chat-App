import { Router, Routes, Route } from "react-router";
import './App.css';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
  <main>
    <Routes>
      <Route path="/" exact element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </main>
);

export default App;
