import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const CheckInModal = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Check In
            </Button>
            <Modal
                title="Check In Confirmation"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                icon={<CheckCircleOutlined style={{ color: 'green' }} />}
            >
                <p>You have successfully checked in!</p>
            </Modal>
        </>
    );
};

export default CheckInModal;