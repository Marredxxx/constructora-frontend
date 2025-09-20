"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { apiBackend } from "@/services/ApiClient";

interface Material {
  idMaterial: number;
  nombreMaterial: string;
}

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  material: Material;
  onUpdateSuccess: () => void;
}

const DeleteMaterialModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  material,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    nombreMaterial: "",
  });

  useEffect(() => {
    if (material) {
      setFormData({
        nombreMaterial: material.nombreMaterial,
      });
    }
  }, [material]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDeleteMaterial = async () => {
    try {
      const response = await apiBackend.delete(
        `material/${material.idMaterial}`
      );

      if (response.data.success) {
        alert("Material eliminado con éxito");
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
        <Modal.Title>Eliminar Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="account-area-dashboard">
          <p>¿Está seguro de eliminar el material: {material.nombreMaterial}?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="rts-btn btn-secondary" onClick={handleClose}>
          Cancelar
        </button>
        <button className="rts-btn btn-danger" onClick={handleDeleteMaterial}>
          Eliminar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMaterialModal;
