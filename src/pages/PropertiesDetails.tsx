import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import {
  Container, Typography, Box, Button, Divider
} from '@mui/material';
import AddPropertyModal from '../components/properties/AddPropertyModel';
import { Property } from '../types/propertyTypes';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id); // ✅ Convert string to number

  const navigate = useNavigate();
  const { properties, editProperty } = useProperties();

  const [modalOpen, setModalOpen] = useState(false);

  const property = properties.find(p => p.id === numericId); // ✅ Match type

  const handleSubmit = (data: Property) => {
    editProperty(data.id, data);
    setModalOpen(false);
  };

  if (!property) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" textAlign="center">Property not found</Typography>
        <Box textAlign="center" mt={3}>
          <Button variant="contained" onClick={() => navigate('/properties')}>
            Back to Properties
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, maxWidth: 'md' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        {property.propertyName}
      </Typography>
      <Typography variant="subtitle1" textAlign="center" color="text.secondary" gutterBottom>
        {property.location}
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <Typography><strong>Bedrooms:</strong> {property.bedrooms}</Typography>
        <Typography><strong>Bathrooms:</strong> {property.bathrooms}</Typography>
        <Typography><strong>Max Guests:</strong> {property.maxGuests}</Typography>
        <Typography><strong>Base Nightly Rate:</strong> ${property.baseNightlyRate}</Typography>
        {property.peakSeasonRate && <Typography><strong>Peak:</strong> ${property.peakSeasonRate}</Typography>}
        {property.offSeasonRate && <Typography><strong>Off:</strong> ${property.offSeasonRate}</Typography>}
        {property.cleaningFee && <Typography><strong>Cleaning:</strong> ${property.cleaningFee}</Typography>}
        {property.serviceFeePercent && <Typography><strong>Service Fee:</strong> {property.serviceFeePercent}%</Typography>}
        {property.taxRatePercent && <Typography><strong>Tax:</strong> {property.taxRatePercent}%</Typography>}
      </Box>

      <Divider sx={{ my: 3 }} />
      <Typography><strong>Owner:</strong> {property.owner}</Typography>
      <Typography sx={{ mt: 1 }}>
        <strong>Status:</strong>{' '}
        <span style={{ color: property.status === 'approved' ? 'green' : 'orange' }}>
          {property.status}
        </span>
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Edit Property
        </Button>
        <Button variant="outlined" onClick={() => navigate('/properties')}>
          Back to Properties
        </Button>
      </Box>

      <AddPropertyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={property}
      />
    </Container>
  );
};

export default PropertyDetails;
