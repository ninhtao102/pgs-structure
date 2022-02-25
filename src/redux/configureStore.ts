import createSagaMiddleware from '@redux-saga/core';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import createRootReducer from './reducer';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'root',
  storage,
};

export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        sagaMiddleware,
        // ... other middlewares ...
      ),
    ),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
