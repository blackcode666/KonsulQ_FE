const ManageUsersLayout = ({ users, loading, error }) => {
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Manajemen Pasien</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">Tanggal</th>
              <th className="py-2 text-left">Room Number</th>
              <th className="py-2 text-left">Patient ID</th>
              <th className="py-2 text-left">Jenis Layanan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">No</th>
            <th className="py-2 text-left">Nama</th>
            <th className="py-2 text-left">Tanggal</th>
            <th className="py-2 text-left">Room Number</th>
            <th className="py-2 text-left">Jenis Layanan</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2">{user.id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.date}</td>
                <td className="py-2">{user.room}</td>
                <td className="py-2">{user.service}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersLayout;
