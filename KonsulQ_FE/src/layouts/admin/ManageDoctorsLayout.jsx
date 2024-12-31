import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";


const API_URL = "https://techsign.store/api/doctors";
const token = localStorage.getItem("token");
const TOKEN = `Bearer ${token}`;


DataTable.use(DT);

const ManageDoctorsLayout = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    gender: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    specialization: "",
    price: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: TOKEN },
      });
      console.log(response.data);

      setDoctorList(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };


  useEffect(() => {
    fetchDoctors();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleAdd = async () => {
    try {
      await axios.post(
        API_URL,
        {
          name: formData.name,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,
          address: formData.address,
          specialization: formData.specialization,
          bio: formData.bio,
          price: formData.price,
        },
        { headers: { Authorization: TOKEN } }
      );
      fetchDoctors();
      resetForm();
      setErrors({});
      closeModal();
      alert("Dokter berhasil ditambahkan");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error adding doctor:", error);
    }
  };


  const handleEdit = async () => {
    try {
      await axios.put(
        `${API_URL}/${formData.id}`,
        {
          name: formData.name,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,
          address: formData.address,
          specialization: formData.specialization,
          bio: formData.bio,
          price: formData.price,
        },
        { headers: { Authorization: TOKEN } }
      );
      fetchDoctors();
      resetForm();
      setIsEdit(false);
      setErrors({});
      closeModal();
      alert("Dokter berhasil diubah");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error editing doctor:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: TOKEN },
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };


  const loadEditData = (doctor) => {
    setFormData({
      id: doctor.id,
      name: doctor.user.name,
      gender: doctor.user.gender,
      email: doctor.user.email,
      phone_number: doctor.user.phone_number,
      address: doctor.user.address,
      specialization: doctor.specialization,
      bio: doctor.bio,
      price: doctor.price,
    });
    setIsEdit(true);
  };


  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      gender: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
      specialization: "",
      bio: "",
      price: "",
    });
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    setIsEdit(false);
    setErrors({});
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-4">Manajemen Dokter</h1>

      {/* Tombol untuk membuka modal */}
      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Tambah Dokter
      </button>
      {/* Modal Tambah/Edit Dokter */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Edit Dokter" : "Tambah Dokter"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEdit ? handleEdit() : handleAdd();
              }}
            >
              <div className="grid grid-cols-1 gap-4" >
                <input
                  type="text"
                  name="name"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                >
                  <option value="">Jenis Kelamin</option>
                  <option value="0">Perempuan</option>
                  <option value="1">Laki-laki</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender[0]}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}

                <input
                  type="text"
                  name="phone_number"
                  placeholder="Telepon"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                />
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number[0]}</p>}

                <input
                  type="text"
                  name="address"
                  placeholder="Alamat"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required={!isEdit}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}

                <input
                  type="text"
                  name="specialization"
                  placeholder="Spesialis"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required
                />
                {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization[0]}</p>}

                <textarea
                  type="text"
                  name="bio"
                  placeholder="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required
                />
                {errors.bio && <p className="text-red-500 text-sm">{errors.bio[0]}</p>}

                <input
                  type="number"
                  name="price"
                  placeholder="harga perjam"
                  value={formData.price}
                  onChange={handleChange}
                  className="p-2 border rounded w-100"
                  required
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}

              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  {isEdit ? "Edit Dokter" : "Tambah Dokter"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Tutup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Dokter */}
      <div className="overflow-x-auto">
        <DataTable
          className="display w-full"
          options={{
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
          }}
        >
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">No</th>
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">Jenis Kelamin</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Telepon</th>
              <th className="py-2 text-left max-w-xs truncate">Alamat</th>
              <th className="py-2 text-left">Spesialis</th>
              <th className="py-2 text-left">Harga/jam</th>
              <th className="py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.length > 0 ? (
              doctorList.map((doctor, index) => (
                <tr key={doctor.id} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{doctor.user.name}</td>
                  <td className="py-2">
                    {doctor.user.gender === 0 ? "Wanita" : "Pria"}
                  </td>
                  <td className="py-2">{doctor.user.email}</td>
                  <td className="py-2">{doctor.user.phone_number}</td>
                  <td className="py-2 max-w-xs break-words">{doctor.user.address}</td>
                  <td className="py-2">{doctor.specialization}</td>
                  <td className="py-2">{doctor.price}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          loadEditData(doctor);
                          openModal();
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              "No data"
            )}
          </tbody>
        </DataTable>
      </div>

    </div>
  );
};

export default ManageDoctorsLayout;
