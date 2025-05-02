import axios from "axios";
import { Property } from "../types/propertyTypes";

// ✅ Mock data with numeric IDs
let mockProperties: Property[] = [
  {
    id: 1,
    propertyName: "Downtown Loft",
    location: "New York, NY",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    baseNightlyRate: 150,
    peakSeasonRate: 180,
    offSeasonRate: 120,
    cleaningFee: 75,
    serviceFeePercent: 14,
    taxRatePercent: 8.875,
    owner: "John S",
    status: "pending",
  },
  {
    id: 2,
    propertyName: "Beachfront Villa",
    location: "Miami, FL",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    baseNightlyRate: 300,
    peakSeasonRate: 350,
    offSeasonRate: 250,
    cleaningFee: 120,
    serviceFeePercent: 14,
    taxRatePercent: 6,
    owner: "María L",
    status: "pending",
  },
];

// API functions
export const getProperties = async (): Promise<Property[]> => {
  return Promise.resolve(mockProperties);
  // return axios.get("/api/properties").then((res) => res.data);
};

export const addProperty = async (property: Property): Promise<void> => {
  mockProperties.push({ ...property, id: Date.now() }); // ✅ Numeric temp ID
  return Promise.resolve();
  // return axios.post("/api/properties", property);
};

export const updateProperty = async (
  id: number,
  data: Partial<Property>
): Promise<void> => {
  mockProperties = mockProperties.map((prop) =>
    prop.id === id ? { ...prop, ...data } : prop
  );
  return Promise.resolve();
  // return axios.put(`/api/properties/${id}`, data);
};

export const deleteProperty = async (id: number): Promise<void> => {
  mockProperties = mockProperties.filter((prop) => prop.id !== id);
  return Promise.resolve();
  // return axios.delete(`/api/properties/${id}`);
};
