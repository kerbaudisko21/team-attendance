import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const StaffDashboard = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Function to format time to HH:MM (without seconds)
    function getCurrentTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Update the current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 60000); // Update every minute

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const handleCheckInOut = () => {
        if (isCheckedIn) {
            // Handle Check-Out
            const currentTime = getCurrentTime();
            setCheckOutTime(currentTime);
            setIsCheckedIn(false);
            setModalMessage(`Check-out successful! You checked out at ${currentTime}`);
        } else {
            // Handle Check-In
            const currentTime = getCurrentTime();
            setCheckInTime(currentTime);
            setIsCheckedIn(true);
            setModalMessage(`Check-in successful! Time: ${currentTime}`);
        }
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="bg-white p-6 rounded shadow w-full h-full">
            <div className="w-full max-w-7xl mx-auto"> {/* Ensures a max width but stays aligned with sidebar */}
                <Title level={2} className="text-center text-pink-600 mb-6">Staff Dashboard</Title>

                <Row gutter={16} className="mb-6">
                    <Col xs={24} sm={12} md={8}>
                        <Card className="shadow" hoverable>
                            <Text className="text-lg">Current Time: <strong>{currentTime}</strong></Text>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} className="mb-6">
                    <Col xs={24} sm={12} md={8}>
                        <Card className="shadow" hoverable>
                            <Text className="text-lg">Check-in Time: {checkInTime || 'Not checked in'}</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="shadow" hoverable>
                            <Text className="text-lg">Check-out Time: {checkOutTime || 'Not checked out'}</Text>
                        </Card>
                    </Col>
                </Row>

                <div className="flex justify-center mt-6">
                    <Button
                        onClick={handleCheckInOut}
                        className="w-full sm:w-40" 
                        style={{
                            backgroundColor: '#D5006D',
                            borderColor: '#D5006D',
                            color: 'white',
                            fontSize: '16px',
                        }}
                    >
                        {isCheckedIn ? 'Check Out' : 'Check In'}
                    </Button>
                </div>
            </div>

            {/* Modal for notifications */}
            <Modal
                title={<span><CheckCircleOutlined style={{ color: 'green' }} /> Notification</span>}
                visible={modalVisible}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                footer={[
                    <Button
                        key="close"
                        onClick={handleCloseModal}
                        style={{
                            backgroundColor: '#D5006D',
                            borderColor: '#D5006D',
                            color: 'white',
                            fontSize: '16px',
                        }}
                    >
                        Close
                    </Button>
                ]}
            >
                <Text className="text-center">{modalMessage}</Text>
            </Modal>
        </div>
    );
};

export default StaffDashboard;
