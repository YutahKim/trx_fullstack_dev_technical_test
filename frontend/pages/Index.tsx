import { useEffect, useState } from 'react';
import axios from 'axios';
import AddVehicleForm from '../components/AddVehicleForm';
import UpdateVehicleForm from '../components/UpdateVehicleForm';
import '@/styles/CarTrackingMap.css';
import LeafletMap from '../components/LeafletMap';
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import ClickableIcon from '@/components/ClickableIcon';
import Car from '../types/Car';

const Index: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateFormIndex, setShowUpdateFormIndex] = useState<number | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car|null>(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await axios.get('https://trx-fullstack-dev-technical-test-02vb.onrender.com/api/vehicles', {
      params: {
        page: currentPage,
        pageSize: 10,
      },
    });
    setCars(response.data.vehicles);
    setTotalPages(response.data.totalPages);
  };

  const searchVehicle = async (name: string) => {
    const response = await axios.get('https://trx-fullstack-dev-technical-test-02vb.onrender.com/api/search', {
      params: {
        searchQuery: name
      },
    });
    setCars(response.data);
    setTotalPages(response.data.totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const deleteVehicle = async (placa: String) => {
    await axios.delete(`https://trx-fullstack-dev-technical-test-02vb.onrender.com/api/vehicles/${placa}`);
    fetchData();
  };

  const handleAddVehicle = () => {
    setShowAddForm((prev) => !prev);
    setIsAddingVehicle((prev) => !prev);
  };

  const handleAddFormClose = () => {
    setShowAddForm((prev) => !prev);
    setIsAddingVehicle((prev) => !prev);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchData();
  };

  const handleUpdateVehicle = (index: number) => {
    setShowUpdateFormIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleUpdateFormClose = () => {
    setShowUpdateFormIndex(null);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateFormIndex(null);
    fetchData();
  };
  
  const handleCLickCar = (car:Car) => {
    setSelectedCar(car);
    
  };

  return (
    <div>
      <div className="car-tracking-map-container">
        {cars.length > 0 && <div id="map" className="map"><LeafletMap cars={cars} selectedCar={selectedCar}/></div>}
        <div className='right-panel'>
          <div className='title-container'>
            <h2>Search cars</h2>
            <ClickableIcon
              align={"right"}
              icon={<FaSearch color='black' />}
              onClick={() => searchVehicle('Pac')}
            />
          </div>
          <div className={isAddingVehicle ? 'car-list-minimized' : 'car-list'}>
            <ul>
              {cars.map((car, index) => (
                <li key={index} onClick={()=>handleCLickCar(car)}>
                  <div className="car-info">
                    <div className='title-container'>
                      <div className="car-name">{car.MODEL}</div>
                      <div className='icons-container'>
                        <ClickableIcon
                          align={"right"}
                          icon={<FaTrashAlt color='#4cb69f' />}
                          onClick={() => deleteVehicle(car.placa)}
                        />
                        <ClickableIcon
                          align={"right"}
                          icon={<FaPen color='#4cb69f' />}
                          onClick={() => handleUpdateVehicle(index)}
                        />
                      </div>
                    </div>
                    {showUpdateFormIndex === index && <UpdateVehicleForm onAdd={handleUpdateSuccess} onClose={handleUpdateFormClose} index={index} car={car}   />}
                    <div className="car-details">
                      <div>{car.BRAND}</div>
                      <div>plate: {car.placa}</div>
                      <div>econ: {car.numeroEconomico}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='bottom-box'>
          <div style={{marginBottom:"10px"}}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          <div className={isAddingVehicle ? 'title-container-expanded' : 'title-container'}>
            {!showAddForm && <button onClick={handleAddVehicle} >Add Vehicle</button>}
            {showAddForm && <AddVehicleForm onAdd={handleAddSuccess} onClose={handleAddFormClose}/>}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;