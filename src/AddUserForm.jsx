import React, { useState, useEffect } from "react";

const AddUserForm = ({
  showModal,
  handleCloseModal,
  handleFormSubmit,
  editingUser,
  isEditMode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Populate form with existing user data when in edit mode
  useEffect(() => {
    if (isEditMode && editingUser) {
      setFormData({
        ...editingUser,
        company: editingUser.company.name || "",
      });
    } else {
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
        },
      });
    }
  }, [editingUser, isEditMode]);

  const validateForm = () => {
    const newErrors = {};
    // Name validation
    if (!formData.name) newErrors.name = "Name is required.";
    else if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters long.";

    // Username validation
    if (!isEditMode && (!formData.username || formData.username.length < 3)) {
      newErrors.username = "Username is required and must be at least 3 characters long.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email must be valid.";

    // Phone validation
    const phoneRegex = /^[0-9]+$/;
    if (!formData.phone) newErrors.phone = "Phone is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be a valid number.";

    // Address validation
    if (!formData.address.street) newErrors.street = "Street is required.";
    if (!formData.address.city) newErrors.city = "City is required.";

    // Company validation (optional, if provided)
    if (formData.company && formData.company.length < 3) {
      newErrors.company = "If provided, Company Name must be at least 3 characters.";
    }

    // Website validation (optional, if provided)
    if (formData.website) {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(formData.website)) newErrors.website = "If provided, Website must be a valid URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "street" || name === "city" || name === "zipcode") {
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Auto-generate username when the name changes for new users
    if (!isEditMode && name === "name") {
      setFormData((prevData) => ({
        ...prevData,
        username: `user_${value}`.replace(/\s+/g, "_"), // Replace spaces with underscores
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleFormSubmit(formData);
      handleCloseModal(); // Close modal after submission
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {isEditMode ? "Edit User" : "Add New User"}
          </h2>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={isEditMode ? formData.username : formData.username} // Maintain username in edit mode
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                  readOnly={isEditMode} // Make it non-editable while editing
                />
                {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                />
                {errors.website && <span className="text-red-500 text-xs">{errors.website}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                />
                {errors.company && <span className="text-red-500 text-xs">{errors.company}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                />
                {errors.street && <span className="text-red-500 text-xs">{errors.street}</span>}
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white text-black border rounded"
                  required
                />
                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
              </div>
              <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.address.zipcode}
                  onChange={handleInputChange}
                  className="w-full p-2 border bg-white text-black rounded"
                  required
                />
                {errors.zipcode && <span className="text-red-500 text-xs">{errors.zipcode}</span>}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                {isEditMode ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddUserForm;
