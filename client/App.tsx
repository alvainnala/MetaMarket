import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Link,
} from 'react-router-dom';

type AppProps = {};

const Storefront: React.FC = () => (
  <div>
    <h1>Welcome to the Storefront</h1>
  </div>
);

const ItemDetail: React.FC = () => {
  let { itemId } = useParams<{ itemId: string }>();

  return (
    <div>
      <h1>Item Detail View</h1>
      <p>Looking at item with ID: {itemId}</p>
    </div>
  );
};

const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Click <Link to="/">here</Link> to go back to the homepage.
      </p>
    </div>
  );
};

const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Storefront} />
        <Route path="/item/:itemId" exact component={ItemDetail} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;