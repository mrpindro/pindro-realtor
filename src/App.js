import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import RentProps from './components/properties/rent/RentProps';
import BuyProps from './components/properties/buy/BuyProps';
import Contact from './components/contact/Contact';
import Search from './components/search/Search';
import Auth from './components/auth/Auth';
import Properties from './components/properties/Properties';
import About from './components/about/About';
import RentProp from './components/properties/rent/RentProp';
import BuyProp from './components/properties/buy/BuyProp';
import RequireAuth from './components/RequireAuth';
import CreateRent from './components/propsForms/CreateRent';
import CreateBuy from './components/propsForms/CreateBuy';
import Users from './components/users/Users';
import PersistLogin from './components/PersistLogin';
import Prefetch from './features/Prefetch';
import EditRent from './components/propsForms/EditRent';
import EditBuy from './components/propsForms/EditBuy';
import EditRentImg from './components/propsForms/EditRentImg';
import EditBuyImg from './components/propsForms/EditBuyImg';
import EditUser from './components/users/EditUser';
import useAuth from './hooks/useAuth';
import EditUserImg from './components/users/EditUserImg';
import UserPage from './components/users/UserPage';
import Admin from './components/admin/Admin';
import AdminDashboard from './components/admin/AdminDashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

const App = () => {
    const { isAdmin } = useAuth();

    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route element={<PersistLogin />}>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path='about' element={<About />} />
                            <Route path='rentprops' element={<RentProps />} />
                            <Route path='rentprops/:id' element={<RentProp />} />
                            <Route path='buyprops' element={<BuyProps />} />
                            <Route path='buyprops/:id' element={<BuyProp />} />
                            <Route path='contact' element={<Contact />} />
                            <Route path='search' element={<Search />} />
                            <Route path='auth' element={<Auth />} />
                            <Route path='properties' element={<Properties />} />
                            <Route path='forgot-password' element={<ForgotPassword />} />
                            <Route path='reset-password/:id' element={<ResetPassword />} />
                        </Route>

                        {/* protected Routes  */}
                        <Route element={<RequireAuth />}>
                            <Route element={<Prefetch />}>
                                <Route path='/users' element={
                                    isAdmin ? <Users /> : 
                                    (<Navigate to='/' replace />)
                                } />
                                <Route path='/users/:id' element={<EditUser />} />
                                <Route path='/usersImg/:id' element={<EditUserImg />} />
                                <Route path='/admin' element={
                                    isAdmin ? <AdminDashboard /> : 
                                    (<Navigate to='/' replace />)
                                } />
                                <Route path='/admin/:id' element={
                                    isAdmin ? <Admin /> : 
                                    (<Navigate to='/' replace />)
                                } />
                            </Route>
                            <Route path='/userprofile' element={<UserPage />} />
                            <Route path='/createRent' element={<CreateRent />} />
                            <Route path='/editRent/:id' element={<EditRent />} />
                            <Route path='/editRentImg/:id' element={<EditRentImg />} />
                            <Route path='/createBuy' element={<CreateBuy />} />
                            <Route path='/editBuy/:id' element={<EditBuy />} />
                            <Route path='/editBuyImg/:id' element={<EditBuyImg />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;