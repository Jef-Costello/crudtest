import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // redux to react provider
import css from './styles/style.styl';

// import components
import AppPrivate from './components/AppPrivate';
import AppPublic from './components/AppPublic';

import Office from './components/Office';
import Home from './components/Home';
import Profiel from './components/Profiel';
import Supplier from './components/Supplier';
import GridTest from './components/GridTest';
import store, { history } from './store';

const root = store.getState().connection.root;

const router = (
  <Provider store={store}>

    <Router history={browserHistory}>
      <Route path={`${root}/web/app_dev.php/gridtest`} component={GridTest} />
      <Route path={`${root}/web/app_dev.php/office`} component={AppPrivate}>


        <Route path={`${root}/web/app_dev.php/office/producten`} component={Office} />
        <Route path={`${root}/web/app_dev.php/office/profiel`} component={Profiel} />

      </Route>
      <Route path={`${root}/web/app_dev.php`} component={AppPublic} >

        <IndexRoute component={Home} />
        <Route path={`${root}/web/app_dev.php/aanbieder/:url`} component={Supplier} />
      </Route>
    </Router>
  </Provider>

);

render(router, document.getElementById('root'));
