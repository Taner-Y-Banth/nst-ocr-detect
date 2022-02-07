import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import Camera from './Camera';
import Home from './Home';
import './index.css';
import Viewer from './Viewer';
import Ocr from './Ocr';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppDrawer />}>
          <Route path="" element={<Home />} />
          <Route path="camera" element={<Camera />} />
          <Route path="viewer" element={<Viewer />} />
          <Route path="ocr" element={<Ocr />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
