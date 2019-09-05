import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
  adminReducer,
  adminSaga,
  // createAppReducer,
  defaultI18nProvider,
  i18nReducer,
  USER_LOGOUT,
} from 'react-admin';
// import {
//     persistStore,
//     persistReducer,
//     persistCombineReducers,
//   } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import { reducers } from './state/reducers';

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

let store;

export default ({
  authProvider,
  dataProvider,
  i18nProvider = defaultI18nProvider,
  history,
  locale = 'en',
}) => {
  // const reducer = persistCombineReducers({
  //     admin: adminReducer,
  //     i18n: i18nReducer(locale, i18nProvider(locale)),
  //     router: connectRouter(history),
  //     ...reducers,
  // });
  const reducer = combineReducers({
    admin: adminReducer,
    i18n: i18nReducer(locale, i18nProvider(locale)),
    router: connectRouter(history),
    ...reducers,
  });

  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider, i18nProvider),
        // add your own sagas here
      ].map(fork),
    );
  };
  const sagaMiddleware = createSagaMiddleware();
  // const persistedReducer = persistReducer(persistConfig, resettableAppReducer)

  store = createStore(
    resettableAppReducer,
    {
      /* set your initial state here */
    },
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        // add your own middlewares here
      ),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
      // add your own enhancers here
    ),
  );
  sagaMiddleware.run(saga);
  // const persistor = persistStore(store);
  return store;
};

export const reduxStore = () => store;
