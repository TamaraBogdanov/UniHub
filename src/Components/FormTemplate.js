import React from "react";

function FormTemplate({ fields, onSubmit }) {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "select":
        return (
          <select name={field.name} required={field.required}>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormTemplate;
