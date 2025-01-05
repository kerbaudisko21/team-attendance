import React from 'react';
import { Menu } from 'antd';
import { TeamOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Menu mode="inline" theme="light">
            <Menu.SubMenu key="admin" icon={<DashboardOutlined />} title="Admin">
                <Menu.Item key="/admin">
                    <Link to="/admin">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="/admin/reports">
                    <Link to="/admin/reports">Reports</Link>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="staff" icon={<TeamOutlined />} title="Staff">
                <Menu.Item key="/staff">
                    <Link to="/staff">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="/staff/attendance">
                    <Link to="/staff/attendance">Attendance</Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default Sidebar;
