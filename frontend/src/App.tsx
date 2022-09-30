import React from 'react';
import { BrowserRouter, Navigate, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import AuthGuard from './components/AuthGuard';
import Login from './components/Login';
import Home from './components/Home'
import Layout from './components/Layout'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/lux/bootstrap.min.css';

import Register from './components/Register';
import Category from './components/Category';

import ViewAllProducts from './components/ViewAllProducts';
import AddProductItem from './components/AddProductItem';
import ProductShowCase from './components/productShowCase';
import UserView from './components/UserView';
import ManageUsers from './components/ManageUsers';
import ProductView from './components/ProductView';
import MyProducts from './components/MyProducts';
import PendingValidation from './components/PendingValidation';
import ViewCurrentAuctions from './components/ViewCurrentAuctions';
import ManageAuctions from './components/ManageAuctions';
import MessageBoard from './components/MessageBoard';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<AuthGuard loginGuard={true}>< Login /></AuthGuard>} />
                <Route path='/register' element={<AuthGuard loginGuard={true}>< Register /></AuthGuard>} />
                <Route path='/' element={<Layout><Home /></Layout>} />
                <Route path='/products' element={<Layout><ViewAllProducts /></Layout>} />
                <Route path='/category/:cat' element={<Layout><Category /></Layout>} />
                <Route path='/ProductShowCase' element={<Layout><ProductShowCase /></Layout>} />
                <Route path='/myproducts' element={<AuthGuard ><Layout><MyProducts /></Layout></AuthGuard>} />
                <Route path='/addproduct' element={<AuthGuard ><Layout><AddProductItem /></Layout></AuthGuard>} />
                <Route path='/users/user/:usr' element={<AuthGuard adminGuard={true}><Layout><UserView /></Layout></AuthGuard>} />
                <Route path='/users/:userType' element={<AuthGuard adminGuard={false}><Layout><ManageUsers /></Layout></AuthGuard>} />
                <Route path='/product/:productId' element={<Layout><ProductView /></Layout>} />
                <Route path='/pending' element={<Layout><PendingValidation /></Layout>} />
                <Route path='/auctions' element={<Layout><ViewCurrentAuctions /></Layout>} />
                <Route path='/manage-auctions' element={<AuthGuard><Layout><ManageAuctions /></Layout></AuthGuard>} />
                <Route path='/messages/:sender/:receiver' element={<Layout><MessageBoard /></Layout>} />
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter >
    );
}

export default App;