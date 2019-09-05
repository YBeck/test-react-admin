import React from 'react';
import './assets/css/styles.scss';
import { Admin, Resource, EditGuesser } from 'react-admin';

import { Provider, useDispatch } from 'react-redux';
import { userActions } from './state/actions';
// import { PersistGate } from 'redux-persist/es/integration/react';
import { createHashHistory } from 'history';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { dataProvider, authProvider, /* saveDispatch */ } from './server';
import { Layout } from './components/layout';
import { create } from 'jss';
// import { reducers } from "./state/reducers";
import createAdminStore from './createAdminStore';
import resources, {
  Dashboard,
  postResource,
  userResource,
  // commentsResource,
} from './resources';
import { customRoutes } from './pages';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  // see https://material-ui.com/styles/advanced/#css-injection-order
  insertionPoint: document.getElementById('jss-insertion-point'),
});

// const { persistor, store } = configureStore()
const history = createHashHistory();

const App = () => {
  return (
    <StylesProvider jss={jss}>
      <Provider
        store={createAdminStore({
          authProvider,
          dataProvider,
          // i18nProvider,
          history,
        })}
      >
        <Admin
          dataProvider={dataProvider}
          dashboard={Dashboard}
          authProvider={authProvider}
          theme={theme}
          layout={Layout}
          // customReducers={reducers}
          history={history}
          customRoutes={customRoutes}
        >
          {/* {renderResources()} */}
          <Resource
            name='users'
            list={userResource.list}
            icon={userResource.icon}
            options={{ ...userResource.options, myCustomAttr: '10' }}
          />
          <Resource
            name='posts'
            // list={postResource.list}
            edit={postResource.edit}
            // create={postResource.create}
            // icon={postResource.icon}
          />
          <Resource name='comments' />
        </Admin>
        <GetUserProfile />
      </Provider>
    </StylesProvider>
  );
};

export default App;

// const DispatchSaver = () => {
//   const dispatch = useDispatch();
//   saveDispatch(dispatch);
//   return null;
// };

const GetUserProfile = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if(token) {
    dispatch(userActions.getUserProfile());
  }
  return null;
}

function renderResources(/* roles */) {
  // NOTE: Not using roles here because we're using our `authorized` function.
  // WARNING: If the call to this function is replaced with
  // `{resources.map(App.renderResource)}`
  // then resources that require a certain role might not work until the user
  // refreshes the page after logging in.
  return resources.map(renderResource);
}

function renderResource(props) {
  const {
    // #region Sanitize props that should not be passed to `<Resource />`
    category: _category,
    editId: _editId,
    hidden: _hidden,
    permissions,
    roles,
    // #endregion
    create,
    edit,
    list,
    ...rest
  } = props;
  // NOTE: If a user is not authorized to interact with a resource, we are
  // still rendering the resource specification but not the create/edit/list
  // views. This allows the restricted user to use related resource references
  // in the resources that they are allowed to access.

  return (
    // <Resource
    //   key={props.name}
    //   create={authorized(roles, permissions, "create") ? create : null}
    //   edit={authorized(roles, permissions, "edit") ? edit : null}
    //   list={authorized(roles, permissions, "list") ? list : null}
    //   {...rest}
    // />
    <Resource
      key={props.name}
      create={create}
      edit={edit}
      list={list}
      {...rest}
    />
  );
}
