import { DataTypes } from "sequelize";
import db from "../config/Database.js";  

const Position = db.define(
  "position",  
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,  
    },
  },
  {
    freezeTableName: true,  
    timestamps: false,     
  }
);

export default Position;
