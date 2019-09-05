import React, { memo } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Route } from 'react-router-dom';
import { WithPermissions } from 'react-admin';
import { postResource } from '../resources';

const renderComponent = Component => ({ location, match, history }) => {
  return (
    <CheckResource 
     location={location}
     match={match}
     history={history}
     Component={Component}
    />
  )
};

const CheckResourceView = ({ resources, location, match, history, Component }) => {  
  if(!Object.keys(resources).length) {
    return null;
  }
  return (
    <WithPermissions
      authParams={{ key: match.path, params: match.params }}
      location={location}
      render={({ permissions }) => {
        return (
          <Component
            match={match}
            location={location}
            history={history}
            permissions={permissions}
          />
        );
      }}
    />
  );
};
const CheckResource =  compose(
  connect(
    state => {
      const { admin: { resources } = {} } = state;        
      return {
        resources,
      };
    },
  ),
  memo,
)(CheckResourceView);

export const customRoutes = [
  <Route
    exact
    path='/cases/:id/profile'
    render={renderComponent(postResource.list)}
  />,
  <Route
    exact
    path='/cases/:id/profile/create'
    render={renderComponent(postResource.create)}
  />,
  <Route
    exact
    path='/cases/:id/profile/:profileId'
    render={renderComponent(postResource.edit)}
  />,
];
