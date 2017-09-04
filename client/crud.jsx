import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // redux to react provider
import css from './styles/style.styl';

// import components
import App from './components/App';
import Single from './components/Single';
import Office from './components/Office';
import Profiel from './components/Profiel';
import Home from './components/Home';
import store, { history } from './store';

const router = (
  <Provider store={store}>

    <Router history={history}>
      <Route path="/api4/web/app_dev.php" component={App}>

        <IndexRoute component={Home} />
        <Route path="/api4/web/app_dev.php/view/:postId" component={Single} />
        <Route path="/api4/web/app_dev.php/office" component={Office} />
        <Route path="/api4/web/app_dev.php/profiel" component={Profiel} />
      </Route>
    </Router>
  </Provider>

);

render(router, document.getElementById('root'));
