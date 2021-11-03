import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REHYDRATE, PAUSE, FLUSH, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

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
