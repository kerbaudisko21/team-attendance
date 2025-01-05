import React from 'react';
import { FileExcelOutlined, BarChartOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
    const reportData = {
        totalStaff: 20,
        totalStores: 5,
        attendancePercentage: 85,
        absencePercentage: 10,
        leavePercentage: 5,
    };

    const handleExportToExcel = () => {
        alert('Export to Excel functionality coming soon!');
    };

    return (
        <div className="bg-white p-6 rounded shadow w-full h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-pink-600">
                <BarChartOutlined style={{ marginRight: '8px' }} /> Admin Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold text-pink-600">Total Staff</h3>
                    <p>{reportData.totalStaff}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold text-pink-600">Total Stores</h3>
                    <p>{reportData.totalStores}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold text-pink-600">Attendance Percentage</h3>
                    <p>{reportData.attendancePercentage}%</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold text-pink-600">Absence Percentage</h3>
                    <p>{reportData.absencePercentage}%</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold text-pink-600">Leave Percentage</h3>
                    <p>{reportData.leavePercentage}%</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
