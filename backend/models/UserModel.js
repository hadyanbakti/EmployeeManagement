import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    foto: {
      type: DataTypes.STRING, // path atau url file foto
      allowNull: true,
    },
    departementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departement",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;
