import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const uuid = () => Math.floor(100000 + Math.random() * 900000);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Routes>
               <Route path="/:id" element={<App />} />
               <Route path="*" element={<Navigate to={`/${uuid()}`} />} />
            </Routes>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);

