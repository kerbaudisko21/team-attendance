import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProfileDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('John Doe');
  const [selectedStore, setSelectedStore] = useState('Store A');
  const [shift, setShift] = useState('');
  const [workIn, setWorkIn] = useState(null);
  const [workOut, setWorkOut] = useState(null);

  // Shift data based on stores
  const storeShifts = {
    'Store A': [
      { shift: 'Full Shift', workIn: '09:00', workOut: '17:00' }, // 9 AM - 5 PM
    ],
    'Store B': [
      { shift: 'Morning Shift', workIn: '05:00', workOut: '13:00' }, // 5 AM - 1 PM
      { shift: 'Evening Shift', workIn: '13:00', workOut: '21:00' }, // 1 PM - 9 PM
    ],
  };

  // Set default shift and work times when the store changes or component mounts
  useEffect(() => {
    const shifts = storeShifts[selectedStore];
    if (shifts.length > 0) {
      setShift(shifts[0].shift);
      setWorkIn(shifts[0].workIn);
      setWorkOut(shifts[0].workOut);
    }
  }, [selectedStore]);

  // Convert 24-hour format to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    let adjustedHour = parseInt(hour, 10);
    const isPM = adjustedHour >= 12;
    adjustedHour = adjustedHour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${adjustedHour}:${minute} ${isPM ? 'PM' : 'AM'}`;
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleSave = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStoreChange = (store) => {
    setSelectedStore(store);
  };

  const handleShiftChange = (value) => {
    const selectedShift = storeShifts[selectedStore].find(shift => shift.shift === value);
    if (selectedShift) {
      setShift(value);
      setWorkIn(selectedShift.workIn);
      setWorkOut(selectedShift.workOut);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-pink-500 text-white w-16 h-16 flex items-center justify-center text-xl font-semibold rounded-full">
          {name.split(' ').map((word) => word[0]).join('')}
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500">Store: {selectedStore}</p>
        <p className="text-gray-500">Shift: {shift}</p>
        <p className="text-gray-500">
          Work Time: {workIn && workOut ? `${convertTo12HourFormat(workIn)} - ${convertTo12HourFormat(workOut)}` : 'Not Set'}
        </p>
      </div>
      <Button
        onClick={handleEditProfile}
        className="w-full bg-pink-500 text-white hover:bg-pink-600"
        icon={<EditOutlined />}
      >
        Edit Profile
      </Button>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSave}
            className="bg-pink-500 text-white"
          >
            Save
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-600">Store</label>
            <Select value={selectedStore} onChange={handleStoreChange} placeholder="Select your store">
              <Option value="Store A">Store A</Option>
              <Option value="Store B">Store B</Option>
            </Select>
          </div>
          <div>
            <label className="block text-gray-600">Shift</label>
            <Select value={shift} onChange={handleShiftChange} placeholder="Select your shift">
              {storeShifts[selectedStore].map(({ shift }, index) => (
                <Option key={index} value={shift}>
                  {shift}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-gray-600">Work Time</label>
            <Input
              value={workIn && workOut ? `${convertTo12HourFormat(workIn)} - ${convertTo12HourFormat(workOut)}` : 'Not Set'}
              readOnly
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileDashboard;
