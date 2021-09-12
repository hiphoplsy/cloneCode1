import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSagaMiddlewares } from 'redux-saga';

import reducer  from '../reducers/index';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleWare = createSagaMiddlewares();
  const middlewares = [sagaMiddleWares];

  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware([...middlewares]))
    : composeWithDevTools(applyMiddleware([...middlewares]))

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleWare.run(rootSaga);
  return store;  
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development'
});

export default wrapper;