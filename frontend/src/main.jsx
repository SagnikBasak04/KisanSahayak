import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import * as Sentry from "@sentry/react";
import Slice from './state/reducer.js'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { EnrollmentContextProvider } from './context/EnrollmentContext.jsx';
import { ElevatedUserContextProvider } from './context/ElevatedUserContext.jsx'

//Sentry Setup
/*const dsn = import.meta.env.VITE_SENTRY_DSN;
Sentry.init({
  dsn: dsn,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});*/

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, Slice);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <AuthContextProvider>
            <EnrollmentContextProvider>
              <ElevatedUserContextProvider>
                <App />
              </ElevatedUserContextProvider>
            </EnrollmentContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
