import express, { Request, Response } from 'express';

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());

// Get all vehicles
app.get('/api/vehicles', (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);
  
    res.json({
      vehicles: paginatedVehicles,
      currentPage: page,
      totalPages: Math.ceil(vehicles.length / pageSize),
    });
  });

// Add a new vehicle
app.post('/api/vehicles', (req: Request, res: Response) => {
  const { name } = req.body;
  vehicles.push(name);
  res.sendStatus(201);
});

// Update a vehicle
app.post('/api/updateVehicle/:id', (req: Request, res: Response) => {
    console.log(req.body)
    const id = parseInt(req.params.id);
    const newName = req.body.name;
    vehicles[id] = newName;
    console.log(id)
    console.log(vehicles)
    res.sendStatus(200);
  });

// Delete a vehicle
app.delete('/api/vehicles/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  vehicles.splice(id, 1);
  res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

