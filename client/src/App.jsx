import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityHotelPage from './pages/CityHotels/CityHotelPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import BlogPage from './pages/BlogPage';
import CityMainPage from './pages/CityMainPage';
import UserPage from './pages/Admin/UserPage';
import CityPage from './pages/Admin/Cities/CityPage';
import CreateCityPage from './pages/Admin/Cities/CreateCityPage';
import UpdateCityPage from './pages/Admin/Cities/UpdateCityPage';
import HotelPage from './pages/Admin/Hotels/HotelPage';
import CreateHotelPage from './pages/Admin/Hotels/CreateHotelPage';
import UpdateHotelPage from './pages/Admin/Hotels/UpdateHotelPage';
import RoomPage from './pages/Admin/Rooms/RoomPage';
import CreateRoomPage from './pages/Admin/Rooms/CreateRoomPage';
import UpdateRoomPage from './pages/Admin/Rooms/UpdateRoomPage';
import HotelsPage from './pages/HotelPage';
import HotelDetailPage from './pages/HotelDetails/HotelDetailPage';

import { CartProvider } from './context/CartProvider';
import RoomSelect from './components/HotelsComponent/RoomSelect/RoomSelect';
import ContactPage from './pages/ContactPage/ContactPage';
import Success from './pages/Success';

function App() {
    
    return (
        <>
        <CartProvider>
            
                <Routes>
                <Route path="/hotel/:hotelId/rooms" element={<RoomSelect/>} />

                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path='/blog' element={<BlogPage/>} />
                    <Route path='/city' element={<CityMainPage />} />
                    <Route path='/city/:cityId' element={<CityHotelPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path="/success" element={<Success/>}/>
                    <Route path="/hotel" element={<HotelsPage/>} />
                    <Route path='/admin/*'>
                        <Route path='users' element={<UserPage />} />
                        <Route path='cities' element={<CityPage />} />
                        <Route path='cities/create' element={<CreateCityPage />} />
                        <Route path='cities/update/:id' element={<UpdateCityPage />} />
                        <Route path='hotels' element={<HotelPage />} />
                        <Route path='hotels/create' element={<CreateHotelPage />} />
                        <Route path='hotels/update/:id' element={<UpdateHotelPage />} />
                        <Route path='rooms' element={<RoomPage />} />
                        <Route path='rooms/create' element={<CreateRoomPage />} />
                        <Route path='rooms/update/:id' element={<UpdateRoomPage />} />
                    </Route>
                    <Route path='/hotels/:hotelId/rooms' element={<HotelDetailPage />} />
                </Routes>
          
        </CartProvider>
        </>
    );
}

export default App;
