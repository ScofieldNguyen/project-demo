import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@ui/screens/router';
import { Provider } from 'react-redux';
import createStore from '@domain/features/store';
import { mockAPiService } from '@integration/MockAPiService';

const apiService = mockAPiService;
const store = createStore(apiService);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
