import React from 'react'
import Navigation from './Components/Navigation/Navigation'
import { Route, Routes, useLocation } from "react-router-dom"
import Thongtin from './Pages/Thongtin'
import Home from './Pages/Home'
import NavigationHome from './Components/Navigation/NavigationHome'
import ChaBien from './Pages/ChaBien'
import CongDong from './Pages/CongDong'
import VeThanhMicae from './Pages/VeThanhMicae'
import AdminLogin from './Pages/AdminLogin'
import Sinhhoat from './Pages/SinhHoat'
import ThuGiaoXu from './Pages/Thongtin/ThuGiaoXu'
import Admin from './Pages/admin/Admin'
import ThuGiaoXuForm from './Pages/admin/ThuGiaoXuForm'
import QuanLyThuGiaoXu from './Pages/admin/QuanLyThuGiaoXu'
import QuanLyThuMoi from './Pages/admin/QuanLyThuMoi'
import Media from './Pages/Media'
import QuanLyCaoPho from './Pages/admin/QuanLyCaoPho'
import ThuMoi from './Pages/Thongtin/ThuMoi'
import CaoPho from './Pages/Thongtin/CaoPho'

const App = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAdminLogin = location.pathname === '/admin-login'

  return (
    <div>
      {!isAdminLogin && (isHome ? <NavigationHome /> : <Navigation />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chabien" element={<ChaBien />} />
        <Route path="/congdong" element={<CongDong />} />
        <Route path="/vethanhmicae" element={<VeThanhMicae />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/thongtin" element={<Thongtin />} />
        <Route path="/sinhhoat" element={<Sinhhoat />} />
        <Route path="/thugiaoxu" element={<ThuGiaoXu />} />
        <Route path="/thumoi" element={<ThuMoi />} />
        <Route path="/cao-pho" element={<CaoPho />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thu-giao-xu-form" element={<ThuGiaoXuForm />} />
        <Route path="/media" element={<Media />} />
        <Route path="/quan-ly-thu-giao-xu" element={<QuanLyThuGiaoXu />} />
        <Route path="/quan-ly-thu-moi" element={<QuanLyThuMoi />} />
        <Route path="/quan-ly-cao-pho" element={<QuanLyCaoPho />} />
      </Routes>
    </div>
  )
}

export default App
