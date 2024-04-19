import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesComponent from './routes';
import './tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RoutesComponent/>
);