import React, { useState, useEffect } from "react";

function FormWithProgressSaving({ formId, initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    // Load saved progress when component mounts
    const savedData = localStorage.getItem(`form_${formId}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [formId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    // Save progress to localStorage
    localStorage.setItem(`form_${formId}`, JSON.stringify(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Clear saved progress after successful submission
    localStorage.removeItem(`form_${formId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormWithProgressSaving;
