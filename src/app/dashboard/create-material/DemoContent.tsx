"use client";
import { apiBackend } from "@/services/ApiClient";
import React, { useState } from "react";

const VendorTable: React.FC = () => {
  const [materialForm, setMaterialForm] = useState({
    nombreMaterial: "",
    descripcionMaterial: "",
    tiempoCaducidad: "",
  });

  const handleMaterialInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setMaterialForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCreateMaterial = async () => {
    try {
      console.log(materialForm);
      const response = await apiBackend.post("material", {
        nombreMaterial: materialForm.nombreMaterial,
        descripcionMaterial: materialForm.descripcionMaterial,
        tiempoCaducidad: materialForm.tiempoCaducidad,
      });
      if (response.data.success == true) {
        alert("Material creado con éxito");
      }
    } catch (error) {
      console.error("Error al crear el  material:", error);
    }
  };

  return (
    <div className="body-root-inner">
      <h3>Crear Material</h3>
      <div className="account-area-dashboard">
        <form className="needs-validation user-add" noValidate>
          <h4>Account</h4>
          <div className="form-group row">
            <div className="col-xl-3 col-md-4">
              <label htmlFor="nombreMaterial">
                <span>*</span> Nombre Material
              </label>
            </div>
            <div className="col-xl-8 col-md-7">
              <input
                className="form-control"
                id="nombreMaterial"
                type="text"
                value={materialForm.nombreMaterial}
                onChange={handleMaterialInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xl-3 col-md-4">
              <label htmlFor="descripcionMaterial">
                <span>*</span> Descripción
              </label>
            </div>
            <div className="col-xl-8 col-md-7">
              <input
                className="form-control"
                id="descripcionMaterial"
                type="text"
                value={materialForm.descripcionMaterial}
                onChange={handleMaterialInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xl-3 col-md-4">
              <label htmlFor="tiempoCaducidad">
                <span>*</span> Tiempo de Caducidad
              </label>
            </div>
            <div className="col-xl-8 col-md-7">
              <input
                className="form-control"
                id="tiempoCaducidad"
                type="date"
                value={materialForm.tiempoCaducidad}
                onChange={handleMaterialInputChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
      <button
        className="rts-btn btn-primary mt--50"
        onClick={handleCreateMaterial}
      >
        Guardar Material
      </button>
    </div>
  );
};

export default VendorTable;
