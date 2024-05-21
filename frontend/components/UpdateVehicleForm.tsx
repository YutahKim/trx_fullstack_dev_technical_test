// components/UpdateVehicleForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Car  from '../types/Car';
interface UpdateVehicleFormProps {
  onAdd: () => void;
  onClose: () => void;
  index: number;
  car: Car;
}

const UpdateVehicleForm: React.FC<UpdateVehicleFormProps> = ({ onAdd, onClose, index, car}) => {

  const [updatedCar, setCar] = useState<Car>({
    placa: '',
    numeroEconomico: '',
    vim: '',
    asientos: 0,
    seguro: '',
    segureNumebr: '',
    BRAND: '',
    MODEL: '',
    YEAR: 0,
    COLOR: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://trx-fullstack-dev-technical-test-02vb.onrender.com/api/vehicles/${car.placa}`,  updatedCar );
      onAdd(); // Call the parent component's callback to trigger a re-fetch of the vehicle list
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="numeroEconomico" onChange={handleChange} placeholder="Economic number: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="vim" onChange={handleChange} placeholder="vim: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="asientos" onChange={handleChange} placeholder="asientos: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="seguro" onChange={handleChange} placeholder="seguro: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="segureNumebr" onChange={handleChange} placeholder="segure numebr: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="BRAND" onChange={handleChange} placeholder="BRAND: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="MODEL" onChange={handleChange} placeholder="MODEL: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="YEAR" onChange={handleChange} placeholder="YEAR: "/>
          </div>
         <div className="input-row">
          <input className="car-inputs" type="text" name="COLOR" onChange={handleChange} placeholder="COLOR: "/>
          </div>
      </div>
      <button type="submit">Update</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default UpdateVehicleForm;