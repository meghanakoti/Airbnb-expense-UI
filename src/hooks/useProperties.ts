import { useEffect, useState } from "react";
import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../api/properties";
import { Property } from "../types/propertyTypes";
import { handleApiError } from "../utils/errorHandler"; // Assuming same handler as expenses

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err, "Failed to load properties", "fetchProperties"));
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (property: Property) => {
    const tempId = Date.now(); // ✅ number (matches Property.id type)
    const newProperty = { ...property, id: tempId };

    // Optimistically update UI
    setProperties((prev) => [...prev, newProperty]);

    try {
      await addProperty(newProperty);
      setActionError(null);
    } catch (err) {
      // Rollback on failure
      setProperties((prev) => prev.filter((p) => p.id !== tempId));
      throw new Error(handleApiError(err, "Failed to add property", "createProperty"));
    }
  };

  const editProperty = async (id: number, data: Partial<Property>) => {
    try {
      await updateProperty(id, data);
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      setActionError(null);
    } catch (err) {
      throw new Error(handleApiError(err, "Failed to edit property", "editProperty"));
    }
  };

  const removeProperty = async (id: number) => {
    await deleteProperty(id);
    setProperties((prev) => prev.filter((p) => p.id !== id)); // ✅ no casting needed
  };
  

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    actionError,
    setActionError,
    fetchProperties,
    createProperty,
    editProperty,
    removeProperty,
  };
};
