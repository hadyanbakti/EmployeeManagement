import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Department = db.define(
  "department",  
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  },
  {
    freezeTableName: true, 
    timestamps: false,  
  }
);

export default Department;
