"use client";
import React, { useEffect, useState } from "react";
import { apiBackend } from "@services/ApiClient";
import DataTable, { TableColumn } from "react-data-table-component";
import EditMaterialModal from "./EditMaterialModal";
import DeleteMaterialModal from "./DeleteMaterialModal";

interface Material {
  idMaterial: number;
  nombreMaterial: string;
  descripcionMaterial: string;
  tiempoCaducidad: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

const MaterialTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Material[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deletingMaterial, setDeletingMaterial] = useState<Material | null>(
    null
  );

  const fetchMateriales = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await apiBackend.get("material", {
        params: { page, limit },
      });

      setData(res.data.data.materiales);
      setTotalRows(res.data.data.pagination.totalItems);
    } catch (err) {
      console.error("Error al obtener materiales:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMateriales(currentPage, perPage);
  }, [currentPage, perPage]);

  const handleOpenEditModal = (material: Material) => {
    setEditingMaterial(material);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingMaterial(null);
  };

  const handleUpdateSuccess = () => {
    handleCloseEditModal();
    fetchMateriales(currentPage, perPage);
  };

  const handleOpenDeleteModal = (material: Material) => {
    setDeletingMaterial(material);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingMaterial(null);
  };

  const handleDeleteSuccess = () => {
    handleCloseDeleteModal();
    fetchMateriales(currentPage, perPage);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    setPerPage(newPerPage);
    setCurrentPage(1);
    setLoading(false);
  };

  const columns: TableColumn<Material>[] = [
    {
      name: "ID",
      selector: (row) => row.idMaterial,
      sortable: true,
      width: "80px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombreMaterial,
      sortable: true,
      wrap: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcionMaterial,
      wrap: true,
    },
    {
      name: "Tiempo Caducidad",
      selector: (row) => row.tiempoCaducidad,
    },
    {
      name: "Status",
      cell: (row) => (
        <span className={row.status ? "open" : "close"}>
          {row.status ? "Activo" : "Inactivo"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="action-buttons d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary btn-custom"
            onClick={() => handleOpenEditModal(row)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-custom"
            onClick={() => handleOpenDeleteModal(row)}
          >
            Borrar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="body-root-inner">
      <div className="vendor-grid-top-search-area">
        <h5 className="title">Lista de Materiales</h5>
      </div>

      <div className="vendor-list-main-wrapper">
        <div className="card-body">
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="footer-copyright">
        {" "}
        <div className="left">
          {" "}
          <p>Copyright © 2025 All Right Reserved.</p>{" "}
        </div>{" "}
        <ul>
          {" "}
          <li>
            {" "}
            <a href="#">Terms</a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#">Privacy</a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#">Help</a>{" "}
          </li>{" "}
        </ul>{" "}
      </div>

      {showEditModal && editingMaterial && (
        <EditMaterialModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          material={editingMaterial}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {showDeleteModal && deletingMaterial && (
        <DeleteMaterialModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          material={deletingMaterial}
          onUpdateSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default MaterialTable;
