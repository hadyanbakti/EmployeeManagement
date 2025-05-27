import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Position from "./PositionModel.js";
import Login from "./LoginModel.js";
import Department from "./DepartmentModel.js";

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Department,
        key: "id",
      },
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Position,
        key: "id",
      },
    },
    addedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Login,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relasi antar model
User.belongsTo(Position, { foreignKey: "positionId" });
User.belongsTo(Department, { foreignKey: "departmentId" });
User.belongsTo(Login, { foreignKey: "addedByUserId", as: "addedByUser" });

Position.hasMany(User, { foreignKey: "positionId" });
Department.hasMany(User, { foreignKey: "departmentId" });
Login.hasMany(User, { foreignKey: "addedByUserId", as: "addedByUser" });

export default User;
