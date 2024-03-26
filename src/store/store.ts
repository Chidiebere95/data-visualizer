import { configureStore, type Dispatch } from '@reduxjs/toolkit';
import generalReducer from '../features/general/general_slice';
import thunkMiddleware from 'redux-thunk';
import { setDispatchFunction } from './storeInstance';

const store = configureStore({
  reducer: {
    general: generalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch as Dispatch<any>);

export type RootState = ReturnType<typeof store.getState>;
export default store;
