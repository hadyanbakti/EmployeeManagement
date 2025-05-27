import Position from "../models/PositionModel.js";

// Ambil semua posisi
export const getPositions = async (req, res) => {
  try {
    const positions = await Position.findAll();
    res.status(200).json(positions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Ambil posisi berdasarkan ID
export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) {
      return res.status(404).json({ msg: "Position not found" });
    }
    res.status(200).json(position);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Tambah posisi baru
export const createPosition = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Position name is required" });
    }

    const [position, created] = await Position.findOrCreate({ where: { name } });

    if (!created) {
      return res.status(409).json({ msg: "Position already exists" });
    }

    res.status(201).json(position);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update posisi
export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const position = await Position.findByPk(id);
    if (!position) {
      return res.status(404).json({ msg: "Position not found" });
    }

    position.name = name || position.name;
    await position.save();

    res.status(200).json(position);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Hapus posisi
export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await Position.findByPk(id);

    if (!position) {
      return res.status(404).json({ msg: "Position not found" });
    }

    await position.destroy();
    res.status(200).json({ msg: "Position deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
