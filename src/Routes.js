import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './Components/Form';
import DisplayDetails from './Components/DisplayDetails';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={Form} />
      <Route path="/formDetails" component={DisplayDetails} />
      <Route path="/edit" component={Form} />
    </Router>
  );
};

export default Routes;
