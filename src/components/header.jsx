// Header.js
import React from 'react';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Header = ({ onToggle }) => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            {/* Logo Section */}
            <h1 className="text-xl font-bold flex items-center space-x-2">
                <UserOutlined style={{ marginRight: '8px' }} />
                <span>Team Attendance</span>
            </h1>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
                <Button
                    icon={<MenuOutlined />}
                    onClick={onToggle}
                    shape="circle"
                    size="large"
                />
            </div>

            {/* Desktop Welcome Message */}
            <div className="hidden md:flex">
                <span>Welcome, User!</span>
            </div>
        </header>
    );
};

export default Header;
