import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Use useLocation
import Header from './components/header';
import Sidebar from './components/sidebar';
import AdminDashboard from './pages/admin-dashboard/dashboard';
import StaffDashboard from './pages/staff-dashboard/dashboard';
import ProfileDashboard from './pages/common-dashboard/profiledashboard';
import Login from './pages/login';
import './index.css';
import AttendancePage from './pages/staff-dashboard/attendance';

const { Content, Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // For mobile sidebar
  const location = useLocation(); // To access the current route

  // Handle Toggle for Mobile Drawer and Desktop Sider
  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Render only the content on login page, no sidebar or header
  const isLoginPage = location.pathname === '/login';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Render Header only if not on Login page */}
      {!isLoginPage && <Header onToggle={handleToggle} />}

      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Render Sidebar only if not on Login page */}
        {!isLoginPage && (
          <>
            {/* Desktop Sidebar (Sider) */}
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              width={200}
              className="hidden md:block transition-all duration-300 ease-in-out"
              style={{ backgroundColor: 'white' }}
            >
              <Sidebar />
            </Sider>

            {/* Mobile Sidebar (Drawer) */}
            <Drawer
              placement="left"
              closable={true}
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
              width={250}
              className="md:hidden"
            >
              <Sidebar />
            </Drawer>
          </>
        )}

        {/* Main Content */}
        <Layout style={{ padding: '0', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Content
            style={{
              margin: '0',
              padding: '16px',
              background: '#fff',
              height: '100%',
              flex: 1,
              overflow: 'auto',
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/attendance" element={<AttendancePage />} />
              <Route path="/profile" element={<ProfileDashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
