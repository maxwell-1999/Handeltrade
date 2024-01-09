import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div className="grid place-items-center w-[100vw] h-[100vh]">
        <div>Aww Snap! Appologies.</div>
        <pre style={{ color: 'red' }}>{error.message}</pre>{' '}
      </div>
    )}
  >
    <App />
  </ErrorBoundary>
);
