import Departement from "../models/DepartementModel.js";

// Ambil semua departemen
export const getAllDepartements = async (req, res) => {
  try {
    const departements = await Departement.findAll();
    res.json(departements);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Tambah departemen baru
export const createDepartement = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "Nama departemen wajib diisi" });
    const [departement, created] = await Departement.findOrCreate({ where: { name } });
    if (!created) return res.status(409).json({ msg: "Departemen sudah ada" });
    res.status(201).json(departement);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update departemen
export const updateDepartement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const dep = await Departement.findByPk(id);
    if (!dep) return res.status(404).json({ msg: "Departemen tidak ditemukan" });
    dep.name = name;
    await dep.save();
    res.json(dep);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Hapus departemen
export const deleteDepartement = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Departement.findByPk(id);
    if (!dep) return res.status(404).json({ msg: "Departemen tidak ditemukan" });
    await dep.destroy();
    res.json({ msg: "Departemen dihapus" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}; 