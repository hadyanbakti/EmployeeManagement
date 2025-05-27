import db from "../config/Database.js";
import User from "../models/UserModel.js";
import Login from "../models/LoginModel.js";
import Department from "../models/DepartmentModel.js";
import Position from "../models/PositionModel.js";

Login.hasMany(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.belongsTo(Login, { foreignKey: "userId" });
User.belongsTo(Department, { foreignKey: "departmentId" });
Department.hasMany(User, { foreignKey: "departmentId" });
User.belongsTo(Position, { foreignKey: "positionId" });
Position.hasMany(User, { foreignKey: "positionId" });
User.belongsTo(Login, { foreignKey: "addedByUserId", as: "addedBy" });
Login.hasMany(User, { foreignKey: "addedByUserId", as: "addedBy" });

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Koneksi database berhasil!");
    
  
    await db.sync({ alter: true });
    console.log("✅ Semua tabel berhasil disinkronisasi.");

    const departmentCount = await Department.count();
    if (departmentCount === 0) {
     
      await Department.bulkCreate([
        { name: "IT" },
        { name: "HR" },
        { name: "Finance" },
        { name: "Marketing" }
      ]);
      console.log("✅ Initial departments created.");
    }

    const positionCount = await Position.count();
    if (positionCount === 0) {
     
      await Position.bulkCreate([
        { name: "Manager" },
        { name: "Supervisor" },
        { name: "Staff" },
        { name: "Intern" }
      ]);
      console.log("✅ Initial positions created.");
    }
  } catch (err) {
    console.error("❌ Gagal koneksi DB:", err);
  }
})();

export { User, Login, Department, Position };
