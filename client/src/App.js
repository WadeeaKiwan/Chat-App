import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
  <main>
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  </main>
);

export default App;
