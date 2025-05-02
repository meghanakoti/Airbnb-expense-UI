import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack,
  InputLabel, FormControl, Select, SelectChangeEvent, Box
} from "@mui/material";
import { Property } from "../../types/propertyTypes";
import {
  isValidName, isRequired, isPositiveNumber, isNonNegativeNumber,
  isPercentage, isNameTypingAllowed, isNumberTypingAllowed
} from "../../utils/validators";

interface PropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Property) => void;
  initialData?: Property;
}

// FormData type: string versions of numeric fields
type PropertyFormData = Omit<Property,
  'id' | 'bedrooms' | 'bathrooms' | 'maxGuests' |
  'baseNightlyRate' | 'peakSeasonRate' | 'offSeasonRate' |
  'cleaningFee' | 'serviceFeePercent' | 'taxRatePercent'
> & {
  bedrooms: string;
  bathrooms: string;
  maxGuests: string;
  baseNightlyRate: string;
  peakSeasonRate: string;
  offSeasonRate: string;
  cleaningFee: string;
  serviceFeePercent: string;
  taxRatePercent: string;
};

const AddPropertyModal: React.FC<PropertyModalProps> = ({ open, onClose, onSubmit, initialData }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    baseNightlyRate: "",
    peakSeasonRate: "",
    offSeasonRate: "",
    cleaningFee: "",
    serviceFeePercent: "",
    taxRatePercent: "",
    owner: "",
    status: "pending",
  });

  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        propertyName: initialData.propertyName,
        location: initialData.location,
        bedrooms: String(initialData.bedrooms),
        bathrooms: String(initialData.bathrooms),
        maxGuests: String(initialData.maxGuests),
        baseNightlyRate: String(initialData.baseNightlyRate),
        peakSeasonRate: initialData.peakSeasonRate?.toString() ?? "",
        offSeasonRate: initialData.offSeasonRate?.toString() ?? "",
        cleaningFee: initialData.cleaningFee?.toString() ?? "",
        serviceFeePercent: initialData.serviceFeePercent?.toString() ?? "",
        taxRatePercent: initialData.taxRatePercent?.toString() ?? "",
        owner: initialData.owner,
        status: initialData.status,
      });
    } else {
      setFormData({
        propertyName: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        maxGuests: "",
        baseNightlyRate: "",
        peakSeasonRate: "",
        offSeasonRate: "",
        cleaningFee: "",
        serviceFeePercent: "",
        taxRatePercent: "",
        owner: "",
        status: "pending",
      });
    }
    setTouchedFields({});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNameTypingAllowed(value)) {
      handleChange(e);
    }
  };

  const handleNumberFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNumberTypingAllowed(value)) {
      handleChange(e);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (): boolean => {
    return (
      isRequired(formData.propertyName) &&
      isValidName(formData.propertyName) &&
      isRequired(formData.location) &&
      isPositiveNumber(formData.bedrooms) &&
      isPositiveNumber(formData.bathrooms) &&
      isPositiveNumber(formData.maxGuests) &&
      isPositiveNumber(formData.baseNightlyRate) &&
      (!formData.peakSeasonRate || isNonNegativeNumber(formData.peakSeasonRate)) &&
      (!formData.offSeasonRate || isNonNegativeNumber(formData.offSeasonRate)) &&
      (!formData.cleaningFee || isNonNegativeNumber(formData.cleaningFee)) &&
      (!formData.serviceFeePercent || isPercentage(formData.serviceFeePercent)) &&
      (!formData.taxRatePercent || isPercentage(formData.taxRatePercent)) &&
      isRequired(formData.owner) &&
      isValidName(formData.owner)
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const finalData: Property = {
      ...(initialData || { id: Date.now() }), // ✅ fixed
      propertyName: formData.propertyName.trim(),
      location: formData.location.trim(),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      maxGuests: Number(formData.maxGuests),
      baseNightlyRate: Number(formData.baseNightlyRate),
      peakSeasonRate: formData.peakSeasonRate ? Number(formData.peakSeasonRate) : undefined,
      offSeasonRate: formData.offSeasonRate ? Number(formData.offSeasonRate) : undefined,
      cleaningFee: formData.cleaningFee ? Number(formData.cleaningFee) : undefined,
      serviceFeePercent: formData.serviceFeePercent ? Number(formData.serviceFeePercent) : undefined,
      taxRatePercent: formData.taxRatePercent ? Number(formData.taxRatePercent) : undefined,
      owner: formData.owner.trim(),
      status: formData.status,
    };
    

    onSubmit(finalData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEdit ? "Edit Property" : "Add New Property"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={2}>
          <TextField
            required
            name="propertyName"
            label="Property Name"
            value={formData.propertyName}
            onChange={handleNameFieldChange}
            error={touchedFields.propertyName && (!isRequired(formData.propertyName) || !isValidName(formData.propertyName))}
            helperText={
              touchedFields.propertyName && formData.propertyName && !isValidName(formData.propertyName)
                ? "Only allowed characters: A-Z, 0-9, &, -, ', etc. Must start with a letter."
                : touchedFields.propertyName && !isRequired(formData.propertyName)
                ? "Property name is required"
                : ""
            }
            fullWidth
          />

          <TextField
            required
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            error={touchedFields.location && !isRequired(formData.location)}
            helperText={touchedFields.location && !isRequired(formData.location) ? "Location is required" : ""}
            fullWidth
          />

          <Box display="flex" gap={2}>
            {["bedrooms", "bathrooms", "maxGuests"].map((field) => (
              <FormControl
                key={field}
                fullWidth
                required
                error={touchedFields[field] && !isPositiveNumber(formData[field as keyof PropertyFormData])}
              >
                <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                <Select
                  name={field}
                  value={formData[field as keyof PropertyFormData]}
                  onChange={handleSelectChange}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                >
                  {[...Array(field === "maxGuests" ? 21 : 11)].map((_, i) => (
                    <MenuItem key={i} value={String(i)}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>

          <TextField
            required name="baseNightlyRate" label="Base Nightly Rate ($)"
            value={formData.baseNightlyRate} onChange={handleNumberFieldChange}
            error={touchedFields.baseNightlyRate && !isPositiveNumber(formData.baseNightlyRate)}
            helperText={touchedFields.baseNightlyRate && !isPositiveNumber(formData.baseNightlyRate) ? "Must be positive" : ""}
            fullWidth
          />

{([
  ["peakSeasonRate", "Peak Season Rate ($)", isNonNegativeNumber],
  ["offSeasonRate", "Off Season Rate ($)", isNonNegativeNumber],
  ["cleaningFee", "Cleaning Fee ($)", isNonNegativeNumber],
  ["serviceFeePercent", "Service Fee (%)", isPercentage],
  ["taxRatePercent", "Tax Rate (%)", isPercentage],
] as [keyof PropertyFormData, string, (value: string | number) => boolean][]).map(
  ([name, label, validator]) => (
    <TextField
      key={name}
      name={name}
      label={label}
      value={formData[name]}
      onChange={handleNumberFieldChange}
      error={touchedFields[name] && !validator(formData[name])}
      helperText={
        touchedFields[name] && !validator(formData[name])
          ? label.includes("%") ? "Must be between 0–100%" : "Cannot be negative"
          : ""
      }
      fullWidth
    />
  )
)}


          <TextField
            required name="owner" label="Owner"
            value={formData.owner} onChange={handleNameFieldChange}
            error={touchedFields.owner && (!isRequired(formData.owner) || !isValidName(formData.owner))}
            helperText={
              touchedFields.owner && formData.owner && !isValidName(formData.owner)
                ? "Only letters, &, -, ', etc. allowed"
                : touchedFields.owner && !isRequired(formData.owner)
                ? "Owner is required"
                : ""
            }
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid()}>
          {isEdit ? "Update Property" : "Add Property"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPropertyModal;
