

export interface Property {
  id: number;
  propertyName: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  baseNightlyRate: number;
  peakSeasonRate?: number;
  offSeasonRate?: number;
  cleaningFee?: number;
  serviceFeePercent?: number;
  taxRatePercent?: number;
  owner: string;
  status: 'pending' | 'approved'; // ✅ add this line
}

export{}