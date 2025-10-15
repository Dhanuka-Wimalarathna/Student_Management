"use client";

import { useState } from "react";
import Button from "./ui/Button";
import { FloatingInput } from "./ui/FloatingInput";

interface StudentFormProps {
  onSubmit: (studentData: StudentFormData) => void;
  onCancel: () => void;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  nic: string;
  phone: string;
  enrollmentDate: string;
  vehicleCategory: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  address?: string;
  nic?: string;
  phone?: string;
  enrollmentDate?: string;
  vehicleCategory?: string;
}

export default function StudentForm({ onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    fullName: "",
    address: "",
    nic: "",
    phone: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    vehicleCategory: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (!/^[A-Za-z]+$/.test(value))
          return "Only letters allowed (no spaces, numbers, or special characters)";
        return "";

      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Only letters and spaces allowed";
        return "";

      case "address":
        if (!value.trim()) return "Address is required";
        return "";

      case "nic":
        if (!value.trim()) return "NIC is required";
        if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(value))
          return "Invalid NIC format (9 digits with V/X or 12 digits)";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[0-9]{10}$/.test(value)) return "Phone number must be 10 digits";
        if (!/^(7[0-9]|0[0-9])/.test(value))
          return "Invalid phone number format";
        return "";

      case "enrollmentDate":
        if (!value) return "Enrollment date is required";
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today)
          return "Enrollment date cannot be in the future";
        return "";

      case "vehicleCategory":
        if (!value) return "Please select a vehicle category";
        return "";

      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof StudentFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData({
        firstName: "",
        lastName: "",
        fullName: "",
        address: "",
        nic: "",
        phone: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        vehicleCategory: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    // Clear the error for this field when focused
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First & Last Name in one row */}
      <div className="flex gap-4">
        {/* First name */}
        <div className="w-1/2">
          <FloatingInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            disabled={loading}
            error={errors.firstName}
            placeholder="Enter first name"
          />
        </div>

        {/* Last name */}
        <div className="w-1/2">
          <FloatingInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            disabled={loading}
            error={errors.lastName}
            placeholder="Enter last name"
          />
        </div>
      </div>

      {/* Full Name */}
      <div>
        <FloatingInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          disabled={loading}
          error={errors.fullName}
          placeholder="Enter full name"
        />
      </div>

      {/* Address */}
      <div>
        <FloatingInput
          label="Permanent Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          disabled={loading}
          error={errors.address}
          placeholder="Enter permanent address"
        />
      </div>

      {/* NIC and Phone in one row */}
      <div className="flex gap-4">
        {/* NIC */}
        <div className="w-1/2">
          <FloatingInput
            label="NIC"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            disabled={loading}
            error={errors.nic}
            placeholder="Enter NIC number"
            maxLength={12}
          />
        </div>

        {/* Phone Number */}
        <div className="w-1/2">
          <FloatingInput
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            disabled={loading}
            error={errors.phone}
            placeholder="Enter phone number"
            maxLength={10}
            type="tel"
          />
        </div>
      </div>

      {/* Vehicle Category - Custom floating select */}
      <div className="relative">
        <label
          htmlFor="vehicleCategory"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.vehicleCategory !== ""
              ? "top-2 text-xs text-primary-600 font-medium"
              : "top-4 text-sm text-gray-500"
          } ${errors.vehicleCategory ? "text-red-500" : ""} ${
            loading ? "text-gray-400" : ""
          }`}
        >
          Vehicle Category *
        </label>
        <select
          id="vehicleCategory"
          name="vehicleCategory"
          value={formData.vehicleCategory}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          disabled={loading}
          className={`w-full pt-6 pb-2 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.vehicleCategory
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary-500"
          }`}
        >
          <option></option>
          <option value="A1/A only">A1/A only (Bike)</option>
          <option value="B1 only">B1 only (Three-Wheeler)</option>
          <option value="B only">B only (Dual Purpose)</option>
          <option value="A and B1 only">
            A and B1 only (Bike and Three-Wheeler)
          </option>
          <option value="A and C only">
            A and C only (Bike and Dual Purpose)
          </option>
          <option value="B1 and C only">
            B1 and C only (Three-Wheeler and Dual Purpose)
          </option>
          <option value="A, B1 and C">
            A, B1 and C (Bike, Three-Wheeler and Dual Purpose)
          </option>
          <option value="D only">D only (Heavy Vehicle)</option>
        </select>
        {errors.vehicleCategory && (
          <p className="text-red-500 text-sm mt-1">{errors.vehicleCategory}</p>
        )}
      </div>

      {/* Enrollment Date */}
      <div className="relative">
        <label
          htmlFor="enrollmentDate"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.enrollmentDate !== ""
              ? "top-2 text-xs text-primary-600 font-medium"
              : "top-4 text-sm text-gray-500"
          } ${errors.enrollmentDate ? "text-red-500" : ""} ${
            loading ? "text-gray-400" : ""
          }`}
        >
          Enrollment Date *
        </label>
        <input
          id="enrollmentDate"
          name="enrollmentDate"
          type="date"
          value={formData.enrollmentDate}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          disabled={loading}
          className={`w-full pt-6 pb-2 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.enrollmentDate
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary-500"
          }`}
        />
        {errors.enrollmentDate && (
          <p className="text-red-500 text-sm mt-1">{errors.enrollmentDate}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          className="flex-1 py-3 text-base flex justify-center items-center"
          disabled={
            loading ||
            Object.keys(errors).some((key) => errors[key as keyof FormErrors])
          }
        >
          {loading ? "Adding..." : "Add Student"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 py-3 text-base flex justify-center items-center"
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
