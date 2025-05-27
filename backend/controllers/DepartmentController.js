import Department from "../models/DepartmentModel.js";

// Ambil semua department
export const getDepartments = async (req, res) => {
  try {
    console.log("Fetching all departments...");
    const departments = await Department.findAll();
    console.log("Departments found:", departments);
    res.status(200).json(departments); // Konsisten dengan status code 200
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Ambil department berdasarkan ID
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Tambah department baru
export const createDepartment = async (req, res) => {
  try {
    console.log("Creating new department with data:", req.body);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Department name is required" }); // FIXED: Pesan error yang benar
    }

    const [department, created] = await Department.findOrCreate({ where: { name } });

    if (!created) {
      return res.status(409).json({ msg: "Department already exists" }); // FIXED: Pesan error yang benar
    }

    console.log("Department created:", department);
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    department.name = name || department.name;
    await department.save();
    
    res.status(200).json(department); // Konsisten dengan format response
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Hapus department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    
    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }
    
    await department.destroy();
    res.status(200).json({ msg: "Department deleted successfully" }); // Konsisten dengan pesan success
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};