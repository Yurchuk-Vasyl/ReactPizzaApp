import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import App from './components/App';

import { store } from './store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
