// LIBs
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// VIEWs
import { HomeView } from '../../views/home';
import { NotFoundView } from '../../views/notfound';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/home' element={<HomeView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  )
}