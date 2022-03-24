import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import Camera from './Camera';
import Home from './Home';
import './index.css';
import Viewer from './Viewer';
import Ocr from './Ocr';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppDrawer />}>
          <Route path="" element={<Home />} />
          <Route path="camera" element={<Camera />} />
          <Route path="viewer" element={<Viewer />} />
          <Route path="ocr" element={<Ocr />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
