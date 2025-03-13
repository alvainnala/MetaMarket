import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

type AppProps = {};

const Storefront: React.FC = () => (
  <div>
    <h1>Welcome to the Storefront</h1>
  </div>
);

const ItemDetail: React.FC = () => (
  <div>
    <h1>Item Detail View</h1>
  </div>
);

const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Storefront} />
        <Route path="/item/:itemId" component={ItemDetail} />
      </Switch>
    </Router>
  );
};

export default App;