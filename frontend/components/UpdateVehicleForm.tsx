// components/UpdateVehicleForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface UpdateVehicleFormProps {
  onAdd: () => void;
  index: number;
  prevName: string;
}

const UpdateVehicleForm: React.FC<UpdateVehicleFormProps> = ({ onAdd, index, prevName}) => {
  const [name, setName] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/updateVehicle/${index}`, { name });
      setName('');
      onAdd(); // Call the parent component's callback to trigger a re-fetch of the vehicle list
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div  style={{ display: 'flex' }}>
        <label style={{
          marginRight: '5px',
        }}>
          Name: </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={prevName}
          style={{
            marginRight: '5px',
            minWidth: '10px'
          }}/>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateVehicleForm;