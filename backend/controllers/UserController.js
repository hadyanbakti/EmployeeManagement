import User from "../models/UserModel.js";

// Ambil semua user (bisa disesuaikan untuk join departement jika perlu)
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        userId: req.userId, // Hanya ambil milik user login
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Ambil satu user berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "User not found or unauthorized" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Tambahkan user baru (tanpa foto)
export const createUser = async (req, res) => {
  try {
    const { nama, nip, departementId } = req.body;
    if (!nama || !nip || !departementId) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    await User.create({
      nama,
      nip,
      departementId,
      userId: req.userId, // Jika memang ingin relasi ke login
    });
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update user (tanpa foto)
export const updateUser = async (req, res) => {
  try {
    const { nama, nip, departementId } = req.body;
    const user = await User.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found or unauthorized" });
    }
    user.nama = nama || user.nama;
    user.nip = nip || user.nip;
    user.departementId = departementId || user.departementId;
    await user.save();
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Hapus user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    if (!deleted) {
      return res.status(404).json({ msg: "User not found or unauthorized" });
    }
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
