import db from "../config/Database.js";
import User from "../models/UserModel.js";
import Login from "./LoginModel.js";
import Departement from "./DepartementModel.js";
import ensureDatabase from "../config/EnsureDatabase.js";

Login.hasMany(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.belongsTo(Login, { foreignKey: "userId" });
User.belongsTo(Departement, { foreignKey: "departementId" });
Departement.hasMany(User, { foreignKey: "departementId" });

(async () => {
  try {
    await ensureDatabase();
    await db.authenticate();
    console.log("✅ Koneksi database berhasil!");
    await db.sync({ alter: true });
    console.log("✅ Semua tabel berhasil disinkronisasi.");
  } catch (err) {
    console.error("❌ Gagal koneksi DB:", err);
  }
})();

export { User, Login, Departement };
