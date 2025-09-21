"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { apiBackend } from "@/services/ApiClient";

interface Material {
  idMaterial: number;
  nombreMaterial: string;
  descripcionMaterial: string;
  tiempoCaducidad: string;
}

interface EditModalProps {
  show: boolean;
  handleClose: () => void;
  material: Material;
  onUpdateSuccess: () => void;
}

const EditMaterialModal: React.FC<EditModalProps> = ({
  show,
  handleClose,
  material,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    nombreMaterial: "",
    descripcionMaterial: "",
    tiempoCaducidad: "",
  });

  useEffect(() => {
    if (material) {
      setFormData({
        nombreMaterial: material.nombreMaterial,
        descripcionMaterial: material.descripcionMaterial,
        tiempoCaducidad: material.tiempoCaducidad,
        // tiempoCaducidad: new Date(material.tiempoCaducidad)
        //   .toISOString()
        //   .split("T")[0],
      });
    }
  }, [material]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateMaterial = async () => {
    try {
      const response = await apiBackend.put(`material/${material.idMaterial}`, {
        nombreMaterial: formData.nombreMaterial,
        descripcionMaterial: formData.descripcionMaterial,
        tiempoCaducidad: formData.tiempoCaducidad,
      });

      if (response.data.success) {
        alert("Material actualizado con éxito");
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Error al actualizar el material:", error);
      alert("Hubo un error al actualizar el material.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                  value={formData.nombreMaterial}
                  onChange={handleInputChange}
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
                  value={formData.descripcionMaterial}
                  onChange={handleInputChange}
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
                  value={formData.tiempoCaducidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="rts-btn btn-danger" onClick={handleClose}>
          Cancelar
        </button>
        <button className="rts-btn btn-primary" onClick={handleUpdateMaterial}>
          Guardar Cambios
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMaterialModal;
