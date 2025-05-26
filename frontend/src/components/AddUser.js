import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptor from "../api/axiosInterceptor";
import { useAuth } from "../auth/useAuth";

const AddUser = () => {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [departementId, setDepartementId] = useState("");
  const [foto, setFoto] = useState(null);
  const [departements, setDepartements] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const axiosJWT = useAxiosInterceptor();
  const { setAuth } = useAuth();

  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const res = await axiosJWT.get("/departements");
        setDepartements(res.data);
      } catch (err) {
        setMsg("Gagal mengambil data departemen");
      }
    };
    fetchDepartements();
  }, [axiosJWT]);

  const saveUser = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!nama || !nip || !departementId) {
      setMsg("Semua kolom wajib diisi");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("nip", nip);
      formData.append("departementId", departementId);
      if (foto) formData.append("foto", foto);
      await axiosJWT.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/users");
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setAuth(null);
        navigate("/login");
      } else {
        setMsg(error.response?.data?.msg || "Gagal menyimpan data karyawan.");
      }
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser} encType="multipart/form-data">
          {msg && <p className="has-text-danger mb-4">{msg}</p>}
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NIP</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Nomor Induk Pegawai"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Departemen</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={departementId} onChange={(e) => setDepartementId(e.target.value)}>
                  <option value="">Pilih Departemen</option>
                  {departements.map((dep) => (
                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Foto</label>
            <div className="control">
              <input
                type="file"
                className="input"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
