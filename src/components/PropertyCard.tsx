import React from 'react';
import {
  Card, CardContent, Typography, Box, Button, CardActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Property } from '../types/propertyTypes';

interface PropertyCardProps {
  property: Property;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {property.propertyName}
        </Typography>
        <Typography variant="caption" sx={{ color: property.status === 'approved' ? 'green' : 'orange' }}>
          Status: {property.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.location}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
          </Typography>
          <Typography variant="body2">
            Max Guests: {property.maxGuests}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Base Rate:</strong> ${property.baseNightlyRate}/night
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/properties/${property.id}`}
          variant="outlined"
        >
          View
        </Button>
        <Button size="small" onClick={onEdit} variant="outlined" color="secondary">
          Edit
        </Button>
        <Button size="small" onClick={onDelete} variant="outlined" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
