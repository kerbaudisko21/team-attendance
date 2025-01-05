import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Typography, TimePicker } from 'antd';
import { CheckCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Store coordinates (latitude, longitude)
const stores = {
    A: { name: "Store A", latitude: -6.200000, longitude: 106.816666 },
    B: { name: "Store B", latitude: -6.210000, longitude: 106.820000 },
};

const userProfile = {
    assignedStore: "A",
};

const StaffDashboard = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Function to format time to HH:MM
    function getCurrentTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Calculate distance between two coordinates (Haversine formula)
    function calculateDistance(latStart, lonStart, latEnd, lonEnd) {
        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const earthRadius = 6371e3; // Earth's radius in meters
        const startLatRad = toRadians(latStart);
        const endLatRad = toRadians(latEnd);
        const deltaLat = toRadians(latEnd - latStart);
        const deltaLon = toRadians(lonEnd - lonStart);

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(startLatRad) * Math.cos(endLatRad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * centralAngle; // Distance in meters
    }

    const handleCheckInOut = () => {
        const bypassLocationCheck = true; // Set to true to bypass location validation for testing

        if (isCheckedIn) {
            // Handle Check-Out (no location validation)
            const currentTime = getCurrentTime();
            setCheckOutTime(currentTime);
            setIsCheckedIn(false);
            setModalMessage(`Check-out successful! Time: ${currentTime}`);
            setModalVisible(true);
            return;
        }

        // Handle Check-In
        if (bypassLocationCheck) {
            const store = stores[userProfile.assignedStore];
            const currentTime = getCurrentTime();
            setCheckInTime(currentTime);
            setIsCheckedIn(true);
            setModalMessage(`Check-in successful at ${store.name}! Time: ${currentTime}`);
            setModalVisible(true);
            return;
        }

        // Proceed with location validation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const store = stores[userProfile.assignedStore];

                    const distance = calculateDistance(
                        latitude,
                        longitude,
                        store.latitude,
                        store.longitude
                    );

                    if (distance <= 100) { // Check if within 100 meters
                        const currentTime = getCurrentTime();
                        setCheckInTime(currentTime);
                        setIsCheckedIn(true);
                        setModalMessage(`Check-in successful at ${store.name}! Time: ${currentTime}`);
                    } else {
                        setModalMessage(`You are not at your assigned store (${store.name}).`);
                    }
                    setModalVisible(true);
                },
                (error) => {
                    setModalMessage("Location access denied. Please enable location services.");
                    setModalVisible(true);
                }
            );
        } else {
            setModalMessage("Geolocation is not supported by your browser.");
            setModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="bg-white p-6 rounded shadow w-full h-full">
            <div className="w-full max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-pink-600">
                    <FieldTimeOutlined style={{ marginRight: '8px' }} /> Staff Dashboard
                </h2>

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
