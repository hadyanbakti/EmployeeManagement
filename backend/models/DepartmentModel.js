import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Department = db.define(
  "department",  // Mengubah nama tabel menjadi singular dan lebih konsisten
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Setiap department akan memiliki nama yang unik
    },
  },
  {
    freezeTableName: true,  // Menonaktifkan pluralisasi otomatis pada nama tabel
    timestamps: false,  // Menonaktifkan otomatis createdAt dan updatedAt
  }
);

export default Department;
