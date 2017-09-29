import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // redux to react provider
import css from './styles/style.styl';

// import components
import App from './components/App';
import App2 from './components/App2';
import Secondary from './components/Secondary';
import Office from './components/Office';
import Profiel from './components/Profiel';
import Supplier from './components/Supplier';
import store, { history } from './store';

const root = store.getState().connection.root;

const router = (
  <Provider store={store}>

    <Router history={history}>
      <Route path={`${root}/web/app_dev.php/office`} component={App}>


        <Route path={`${root}/web/app_dev.php/office/producten`} component={Office} />
        <Route path={`${root}/web/app_dev.php/office/profiel`} component={Profiel} />

      </Route>
      <Route path={`${root}/web/app_dev.php`} component={App2} />
      <Route path="/api4/web/app_dev.php/aanbieder/:postId" component={Supplier} />
    </Router>
  </Provider>

);

render(router, document.getElementById('root'));
