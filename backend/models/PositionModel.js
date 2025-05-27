import { DataTypes } from "sequelize";
import db from "../config/Database.js";  // Pastikan path ini benar

const Position = db.define(
  "position",  // Nama tabel dalam bentuk singular
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,  // Posisi tidak perlu unik
    },
  },
  {
    freezeTableName: true,  // Menggunakan nama tabel tanpa pluralisasi otomatis
    timestamps: false,      // Menonaktifkan createdAt dan updatedAt jika tidak diperlukan
  }
);

export default Position;
