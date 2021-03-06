
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import todosReducers from './modules/rootReducer';
import todosSagas from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});


const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(todosReducers, enhancer);
sagaMiddleware.run(todosSagas);
export default store;
