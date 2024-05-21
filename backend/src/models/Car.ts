import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Car document
export interface ICar extends Document {
    placa: String;
    numeroEconomico: String;
    vim: String;
    asientos: Number;
    seguro: String;
    segureNumebr: String;
    BRAND: String;
    MODEL: String;
    YEAR: Number;
    COLOR: String;
}

// Define schema for Car model
const carSchema: Schema = new Schema({
    placa: { type: String, required: true },
    numeroEconomico: { type: String, required: true },
    vim: { type: String, required: true },
    asientos: { type: Number, required: true },
    seguro: { type: String, required: true },
    segureNumebr: { type: String, required: true },
    BRAND: { type: String, required: true },
    MODEL: { type: String, required: true },
    YEAR: { type: Number, required: true },
    COLOR: { type: String, required: true },
    // Define other fields here
});

// Create and export Car model
const CarModel = mongoose.model<ICar>('Car', carSchema);
export default CarModel;