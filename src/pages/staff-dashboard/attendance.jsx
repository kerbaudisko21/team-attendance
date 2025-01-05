import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DatePicker, Card, Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const AttendancePage = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const dummyData = [
        { date: '2025-01-01', status: 'Late' },
        { date: '2025-01-02', status: 'On Time' },
        { date: '2025-01-05', status: 'Late' },
        { date: '2025-01-06', status: 'On Time' },
        { date: '2025-01-08', status: 'Late' },
        { date: '2025-01-10', status: 'On Time' },
        { date: '2025-01-15', status: 'Late' },
    ];

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const getStatusForDate = (date) => {
        const dateStr = formatDate(date);
        const record = dummyData.find((entry) => entry.date === dateStr);
        return record ? record.status : null;
    };

    const onDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
    };

    const calculateAttendanceSummary = () => {
        let onTimeCount = 0;
        let lateCount = 0;

        if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
            dummyData.forEach((record) => {
                const recordDate = new Date(record.date);
                if (
                    recordDate >= selectedDateRange[0].startOf('day') &&
                    recordDate <= selectedDateRange[1].endOf('day')
                ) {
                    if (record.status === 'On Time') {
                        onTimeCount++;
                    } else if (record.status === 'Late') {
                        lateCount++;
                    }
                }
            });
        } else {
            dummyData.forEach((record) => {
                if (record.status === 'On Time') {
                    onTimeCount++;
                } else if (record.status === 'Late') {
                    lateCount++;
                }
            });
        }

        return { onTimeCount, lateCount };
    };

    const { onTimeCount, lateCount } = calculateAttendanceSummary();

    return (
        <div className="attendance-container p-6">
            <Row gutter={[8, 8]} className="mb-4 items-center">
                <Col xs={24} sm={12} md={12} lg={8}>
                    <RangePicker
                        value={selectedDateRange}
                        onChange={onDateRangeChange}
                        style={{ width: '100%' }}
                        placeholder={['Start Date', 'End Date']}
                        format="YYYY-MM-DD"
                    />
                </Col>
            </Row>

            <Row gutter={[8, 8]} className="mb-4">
                <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="calendar-container" style={{ width: '100%', marginBottom: '8px' }}>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            tileClassName={({ date }) => {
                                const status = getStatusForDate(date);
                                if (status === 'Late') {
                                    return 'late-day';
                                }
                                if (status === 'On Time') {
                                    return 'on-time-day';
                                }
                                return '';
                            }}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={[8, 8]} className="mt-4" justify="space-between">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        style={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }}
                        bodyStyle={{
                            textAlign: 'center',
                            padding: '20px',
                            color: '#1890ff',
                        }}
                    >
                        <Title level={4}>On Time</Title>
                        <Text style={{ fontSize: '36px', fontWeight: 'bold' }}>{onTimeCount}</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        style={{ backgroundColor: '#fff0f6', borderRadius: '10px' }}
                        bodyStyle={{
                            textAlign: 'center',
                            padding: '20px',
                            color: '#ff4d4f',
                        }}
                    >
                        <Title level={4}>Late</Title>
                        <Text style={{ fontSize: '36px', fontWeight: 'bold' }}>{lateCount}</Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AttendancePage;
