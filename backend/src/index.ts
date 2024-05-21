import express, { Request, Response } from 'express';
import CarModel, { ICar } from './models/Car'; // Import your Car model

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://yutahKim:wgWYABBvFvJDfZUW@pproy.vs88k8u.mongodb.net/?retryWrites=true&w=majority&appName=Pproy', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/api/data', (req: Request, res: Response) => {
    const message = 'Hello, World!';
    res.json({ message });
});

// Define a sample vehicle list (you would replace this with your actual data)
let vehicles: string[] = ['Car', 'Truck', 'Motorcycle'];
let seachedVehicles: string[] = [];

app.use(express.json());

async function deleteAllCars() {
  try {
    await CarModel.deleteMany({});
    console.log('All cars deleted successfully.');
  } catch (error) {
    console.error('Error deleting cars:', error);
  }
}

//deleteAllCars();

//async function populateCars() {
//  try {
//    // Connect to MongoDB
//    await mongoose.connect('mongodb+srv://yutahKim:wgWYABBvFvJDfZUW@pproy.vs88k8u.mongodb.net/?retryWrites=true&w=majority&appName=Pproy', {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//    });
//
//    // Insert the JSON data into the "cars" collection
//    await CarModel.insertMany(carsData);
//    console.log('Cars populated successfully.');
//  } catch (error) {
//    console.error('Error populating cars:', error);
//  } finally {
//    // Close the connection
//    mongoose.disconnect();
//  }
//}

//populateCars();

// Get all vehicles
app.get('/api/vehicles', async (req: Request, res: Response ) => {
  try {
    // Query the database to fetch all cars
    const results: ICar[] = await CarModel.find({});
    //res.json(results);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const paginatedVehicles = results.slice(startIndex, endIndex);
    //console.log(paginatedVehicles[0])
    //console.log(results)
    //console.log(page)
    //console.log(Math.ceil(results.length / pageSize))
    res.json({
      vehicles: paginatedVehicles,
      currentPage: page,
      totalPages: Math.ceil(results.length / pageSize),
    });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
  });

// Delete car
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await CarModel.findOneAndDelete({placa:id});
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add car
app.post('/api/vehicles', async (req, res) => {
  try {
    const newCarData = req.body;
    const newCar = await CarModel.create(newCarData);
    res.json(newCar);
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/vehicles/:placa', async (req, res) => {
  try {
    const placa = req.params.placa;
    const updatedCarData = req.body; // New data for the car
    console.log(updatedCarData)
    console.log(placa)
    // Find the car by placa and update its data
    const updatedCar = await CarModel.findOneAndUpdate({ placa: placa }, updatedCarData, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.json(updatedCar);
  } catch (error) {
    console.error('Error updating car by placa:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Search vehicles
app.get('/api/searchVehicles', (req: Request, res: Response) => {
  console.log(req.query.name)
  seachedVehicles = vehicles.filter(x => [req.query.name].includes(x));
  console.log(seachedVehicles)

  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedVehicles = seachedVehicles.slice(startIndex, endIndex);

  res.json({
    vehicles: paginatedVehicles,
    currentPage: page,
    totalPages: Math.ceil(seachedVehicles.length / pageSize),
  });
});

// Route to handle search requests
app.get('/api/search', async (req: Request, res: Response) => {
  try {
      const { searchQuery } = req.query;
      if (!searchQuery) {
          return res.status(400).json({ error: 'Search query is required' });
      }
      const regex = new RegExp(searchQuery as string, 'i');
      const results: ICar[] = await CarModel.find({ MODEL: regex });
      console.log(results);
      res.json(results);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a vehicle
app.post('/api/updateVehicle/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newName = req.body.name;
    vehicles[id] = newName;
    console.log(id)
    console.log(vehicles)
    res.sendStatus(200);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;