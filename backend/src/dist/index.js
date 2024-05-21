"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Car_1 = __importDefault(require("./models/Car")); // Import your Car model
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://yutahKim:wgWYABBvFvJDfZUW@pproy.vs88k8u.mongodb.net/?retryWrites=true&w=majority&appName=Pproy', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors({ origin: 'http://localhost:3000' }));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/api/data', (req, res) => {
    const message = 'Hello, World!';
    res.json({ message });
});
// Define a sample vehicle list (you would replace this with your actual data)
let vehicles = ['Car', 'Truck', 'Motorcycle'];
let seachedVehicles = [];
app.use(express_1.default.json());
function deleteAllCars() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Car_1.default.deleteMany({});
            console.log('All cars deleted successfully.');
        }
        catch (error) {
            console.error('Error deleting cars:', error);
        }
    });
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
app.get('/api/vehicles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database to fetch all cars
        const results = yield Car_1.default.find({});
        //res.json(results);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
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
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Delete car
app.delete('/api/vehicles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield Car_1.default.findOneAndDelete({ placa: id });
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Add car
app.post('/api/vehicles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCarData = req.body;
        const newCar = yield Car_1.default.create(newCarData);
        res.json(newCar);
    }
    catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.put('/api/vehicles/:placa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const placa = req.params.placa;
        const updatedCarData = req.body; // New data for the car
        console.log(updatedCarData);
        console.log(placa);
        // Find the car by placa and update its data
        const updatedCar = yield Car_1.default.findOneAndUpdate({ placa: placa }, updatedCarData, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        return res.json(updatedCar);
    }
    catch (error) {
        console.error('Error updating car by placa:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
// Search vehicles
app.get('/api/searchVehicles', (req, res) => {
    console.log(req.query.name);
    seachedVehicles = vehicles.filter(x => [req.query.name].includes(x));
    console.log(seachedVehicles);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
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
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchQuery } = req.query;
        if (!searchQuery) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const regex = new RegExp(searchQuery, 'i');
        const results = yield Car_1.default.find({ MODEL: regex });
        console.log(results);
        res.json(results);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Update a vehicle
app.post('/api/updateVehicle/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newName = req.body.name;
    vehicles[id] = newName;
    console.log(id);
    console.log(vehicles);
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
