// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store'; // Import the store
import './index.css'; // Optional: Import global CSS
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find #root element in the DOM');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}> {/* Pass the store to the Provider */}
      <App />
    </Provider>
  </StrictMode>
);