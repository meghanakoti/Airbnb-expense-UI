import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
} from '@mui/material';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/PropertyCard';
import AddPropertyModal from '../components/properties/AddPropertyModel';
import { Property } from '../types/propertyTypes';
import { useUndoableDelete } from '../hooks/useUndoableDelete';

const PropertyDashboard: React.FC = () => {
  const {
    properties,
    createProperty,
    editProperty,
    removeProperty,
    loading,
    error,
  } = useProperties();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const {
    deleteWithUndo,
    undoDelete,
    snackbarOpen,
    closeSnackbar,
    deletedItems,
  } = useUndoableDelete<Property>(
    async (id) => await removeProperty(id),
    () => {}, // no need to refetch if updating locally
    60000
  );

  const handleAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = (property: Property) => {
    deleteWithUndo(property, property.id);
  };

  const handleSubmit = (data: Property) => {
    if (editingProperty) {
      editProperty(data.id, data);
    } else {
      createProperty(data);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Your Properties</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          + Add Property
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading properties...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : properties.filter(p => !deletedItems.includes(p.id)).length === 0 ? (
        <Typography>No properties found. Please add one!</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {properties
            .filter((p) => !deletedItems.includes(p.id))
            .map((property) => (
              <Box key={property.id} sx={{ width: '300px' }}>
                <PropertyCard
                  property={property}
                  onEdit={() => handleEdit(property)}
                  onDelete={() => handleDelete(property)}
                />
              </Box>
            ))}
        </Box>
      )}

      <AddPropertyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProperty ?? undefined}
      />

      <Snackbar
        open={snackbarOpen}
        message="Property deleted"
        action={
          <Button color="secondary" size="small" onClick={undoDelete}>
            UNDO
          </Button>
        }
        autoHideDuration={60000}
        onClose={(event, reason) => {
          if (reason !== 'clickaway') closeSnackbar();
        }}
      />
    </Container>
  );
};

export default PropertyDashboard;
