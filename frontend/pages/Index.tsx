import { useEffect, useState } from 'react';
import axios from 'axios';
import AddVehicleForm from '../components/AddVehicleForm';
import UpdateVehicleForm from '../components/UpdateVehicleForm';
import '@/styles/CarTrackingMap.css';
import LeafletMap from '../components/LeafletMap';

const Index: React.FC = () => {
   const [vehicles, setVehicles] = useState<string[]>([]);
   const [data, setData] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
    fetchData();
  }, [currentPage]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/api/vehicles', {
      params: {
        page: currentPage,
        pageSize: 10, // Change this to your desired page size
      },
    });
    setVehicles(response.data.vehicles);
    setTotalPages(response.data.totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

    const deleteVehicle = async (index: number) => {
        await axios.delete(`http://localhost:5000/api/vehicles/${index}`);
        fetchData();
    };

      const handleAddVehicle = () => {
    setShowAddForm(true);
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchData();
};
      const handleUpdateVehicle = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    fetchData();
};

    return (
        <div>
        <h1>Welcome to Car Tracker!</h1>
        <div className="car-tracking-map-container">
      <div id="map" className="map"><LeafletMap /></div>
      <div className="car-list">
        <h2>Car List</h2>
        {vehicles.map((car,index) => (
        <ul>
            <li key={index}>
              <div className="car-info">
                <div className="car-name">{car}</div>
                <div className="car-details">
                  <div>Speed: 52 km/h</div>
                  <div>Location: (0.99, 0.9925)</div>
                </div>
                <button onClick={() => deleteVehicle(index)}>Delete</button>
                <button onClick={handleUpdateVehicle}>Edit Vehicle</button>
                {showUpdateForm && <UpdateVehicleForm onAdd={handleUpdateSuccess} index={index} />}
              </div>
            </li>
        </ul>
          ))}
          
          <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      {showAddForm && <AddVehicleForm onAdd={handleAddSuccess} />}
      </div>
    </div>
      </div>
        
    );
    };

export default Index;