import React from 'react';
import { BrowserRouter, Navigate, Routes, Route, Outlet, Link, } from 'react-router-dom';
import './App.css';
import AuthGuard from './components/AuthGuard';
import Login from './components/Login/Login';
import Home from './components/Home'
import Layout from './components/Layout'
import VerticalCard from './components/VerticalCard';
import { RouteProps } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/lux/bootstrap.min.css';

import Register from './components/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<AuthGuard loginGuard={true}>< Login /></AuthGuard>} />
                <Route path='/register' element={<AuthGuard loginGuard={true}>< Register /></AuthGuard>} />
                <Route path='/' element={<Layout><Home /></Layout>} />
                {/* <Route path='/' element={<AuthGuard><Layout><Home /></Layout></AuthGuard>} /> */}
                <Route path='*' element={<Navigate to="/" replace />} />
                <Route path='/VerticalCard' element={<Layout><VerticalCard /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;