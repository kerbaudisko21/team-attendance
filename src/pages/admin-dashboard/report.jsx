import React, { useState, useEffect } from 'react';
import { Button, Select, Table, Typography, Row, Col } from 'antd';
import * as XLSX from 'xlsx';
import { BarChartOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Example staff data
const staffData = [
    { id: 1, name: 'John Doe', store: 'Store A', shift: 'Morning', checkInTime: '2025-01-01 08:00', checkOutTime: '2025-01-01 17:00', lateMark: 'Late' },
    { id: 2, name: 'Jane Smith', store: 'Store B', shift: 'Afternoon', checkInTime: '2025-01-02 09:00', checkOutTime: '2025-01-02 18:00', lateMark: 'On Time' },
    { id: 3, name: 'Mike Johnson', store: 'Store A', shift: 'Morning', checkInTime: '2025-01-05 08:30', checkOutTime: '2025-01-05 17:30', lateMark: 'Late' },
    { id: 4, name: 'Sarah Lee', store: 'Store B', shift: 'Afternoon', checkInTime: '2025-01-10 08:00', checkOutTime: '2025-01-10 17:00', lateMark: 'On Time' },
    { id: 5, name: 'Steve Rogers', store: 'Store A', shift: 'Morning', checkInTime: '2025-02-01 08:00', checkOutTime: '2025-02-01 17:00', lateMark: 'On Time' },
];

// Helper to format the date in dd-MMM-yyyy format
const getDateFromDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const monthIdx = date.getMonth(); // Months are 0-based, so add 1 and ensure two digits
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[monthIdx];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // Return formatted date as dd-MM-yyyy
};

// Helper to format the time in HH:mm format
const getTimeFromDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:mm
};

const ReportDashboard = () => {
    const [storeFilter, setStoreFilter] = useState('');
    const [shiftFilter, setShiftFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [months, setMonths] = useState([]);

    // Generate months dynamically from January to the current month of the current year
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // Get the current month (0-based index)
        const generatedMonths = [];

        for (let i = 0; i <= currentMonth; i++) {
            const monthName = new Date(currentYear, i).toLocaleString('default', { month: 'long' });
            const monthFormatted = `${monthName} ${currentYear}`;
            generatedMonths.push(monthFormatted);
        }

        setMonths(generatedMonths);
    }, []);

    // Handle changes in filters
    const handleStoreFilterChange = (value) => {
        setStoreFilter(value);
    };

    const handleShiftFilterChange = (value) => {
        setShiftFilter(value);
    };

    const handleMonthFilterChange = (value) => {
        setMonthFilter(value);
    };

    // Helper to extract year and month in YYYY-MM format
    const getMonthFromDate = (date) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Months are 0-based, so add 1
        return `${year}-${month < 10 ? '0' + month : month}`; // Format as YYYY-MM
    };

    // Filter data based on the selected filters
    const filteredData = staffData.filter((staff) => {
        const staffMonth = getMonthFromDate(staff.checkInTime);
        const isMonthMatch = !monthFilter || staffMonth === monthFilter;
        const isStoreMatch = !storeFilter || staff.store === storeFilter;
        const isShiftMatch = !shiftFilter || staff.shift === shiftFilter;

        return isMonthMatch && isStoreMatch && isShiftMatch;
    });

    // Export data to Excel
    const exportToExcel = () => {
        const updatedData = filteredData.map(({ key, lateMark, ...rest }) => ({
            ...rest,
            lateMark: lateMark === 'Late' ? 'Late' : 'On Time', // Set value to 'Late' or 'On Time'
        }));

        const worksheet = XLSX.utils.json_to_sheet(updatedData.map(({ key, ...rest }) => rest));

        // Apply styles to the "Late" cells in the Excel sheet
        updatedData.forEach((row, rowIndex) => {
            if (row.lateMark === 'Late') {
                const cell = worksheet[`F${rowIndex + 2}`]; // Assuming 'Late Mark' is in the 6th column (index 5)
                cell.s = { font: { color: { rgb: 'FF0000' } } }; // Apply red color to text
            }
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff Reports');
        XLSX.writeFile(workbook, 'StaffReports.xlsx');
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Store', dataIndex: 'store', key: 'store' },
        { title: 'Shift', dataIndex: 'shift', key: 'shift' },
        { title: 'Date', dataIndex: 'checkInTime', key: 'checkInTime', render: (text) => getDateFromDateTime(text) },
        { title: 'Check-in Time', dataIndex: 'checkInTime', key: 'checkInTime', render: (text) => getTimeFromDateTime(text) },
        { title: 'Check-out Time', dataIndex: 'checkOutTime', key: 'checkOutTime', render: (text) => getTimeFromDateTime(text) },
        {
            title: 'Late Status',
            dataIndex: 'lateMark',
            key: 'lateMark',
            render: (text) => <Text style={{ color: text === 'Late' ? 'red' : 'green' }}>{text}</Text>,
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-pink-600">
                <BarChartOutlined style={{ marginRight: '8px' }} /> Admin Report
            </h2>

            {/* Filters Section */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12} lg={8}>
                    <label style={{ fontWeight: 'bold' }}>Store Filter</label>
                    <Select
                        style={{ width: '100%' }}
                        value={storeFilter}
                        onChange={handleStoreFilterChange}
                        placeholder="Select Store"
                    >
                        <Select.Option value="Store A">Store A</Select.Option>
                        <Select.Option value="Store B">Store B</Select.Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <label style={{ fontWeight: 'bold' }}>Shift Filter</label>
                    <Select
                        style={{ width: '100%' }}
                        value={shiftFilter}
                        onChange={handleShiftFilterChange}
                        placeholder="Select Shift"
                    >
                        <Select.Option value="Morning">Morning</Select.Option>
                        <Select.Option value="Afternoon">Afternoon</Select.Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <label style={{ fontWeight: 'bold' }}>Month Filter</label>
                    <Select
                        style={{ width: '100%' }}
                        value={monthFilter}
                        onChange={handleMonthFilterChange}
                        placeholder="Select Month"
                    >
                        {months.map((month, index) => (
                            <Select.Option key={index} value={month.split(' ')[1] + '-' + ('0' + (new Date(`${month.split(' ')[0]} 1, ${month.split(' ')[1]}`).getMonth() + 1)).slice(-2)}>
                                {month}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {/* Staff Data Table */}
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: '20px' }}
            />

            {/* Export Button */}
            <Button onClick={exportToExcel} type="primary">
                Export to Excel
            </Button>
        </div>
    );
};

export default ReportDashboard;
