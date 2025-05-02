// src/data/propertiesData.ts

import { Property } from '../types/propertyTypes';

export const properties: Property[] = [
  {
    id: 1,
    propertyName: 'Downtown Loft',
    location: 'New York, NY',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    baseNightlyRate: 150,
    peakSeasonRate: 180,
    offSeasonRate: 120,
    cleaningFee: 75,
    serviceFeePercent: 14,
    taxRatePercent: 8.875,
    owner: 'John S',
    status:'pending'
  },
  {
    id: 2,
    propertyName: 'Beachfront Villa',
    location: 'Miami, FL',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    baseNightlyRate: 300,
    peakSeasonRate: 350,
    offSeasonRate: 250,
    cleaningFee: 120,
    serviceFeePercent: 14,
    taxRatePercent: 6,
    owner: 'María L',
    status:'pending'
  }
];
