import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Voter = Loadable({
  loader: () => import('./views/Voter'),
  loading: Loading,
});

const EO = Loadable({
  loader: () => import('./views/EO'),
  loading: Loading,
});

const AddEO = Loadable({
  loader: () => import('./views/AddEO'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/voter', name: 'Voter', component: Voter },
  { path: '/election_officer', name: 'Election Officer', component: EO },
  { path: '/add_election_officer', name: 'Add Election Officer', component: AddEO }
];

export default routes;
