// components/AddVehicleForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface AddVehicleFormProps {
  onAdd: () => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ onAdd}) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vehicles', { name });
      setName('');
      onAdd(); // Call the parent component's callback to trigger a re-fetch of the vehicle list
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter vehicle name" />
      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default AddVehicleForm;