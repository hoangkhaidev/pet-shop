/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REHYDRATE, PAUSE, FLUSH, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import rootReducer from "rootReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const config = {
  blacklist: [PERSIST],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(createStateSyncMiddleware(config)),
});

const persistor = persistStore(store);

export { store, persistor };

initStateWithPrevTab(store);
