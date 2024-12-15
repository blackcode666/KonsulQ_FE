function Navbar() {
    return (
        <nav style={styles.navbar}>
            <div style={styles.leftSection}>
                <button style={styles.button}>Login</button>
            </div>
            <div style={styles.centerSection}>
                <button style={styles.button}>Beranda</button>
                <button style={styles.button}>Pengguna</button>
                <button style={styles.button}>Dokter</button>
                <button style={styles.button}>Jadwal</button>
            </div>
            <div style={styles.rightSection}>
                <span style={styles.text}>Konsul Q</span>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',  // membuat navbar tetap di atas saat scroll
        top: 0,  // pastikan navbar berada di atas
        left: 0,  // pastikan navbar tidak bergeser ke kiri
        right: 0,  // pastikan navbar tidak bergeser ke kanan
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
        zIndex: 1000,  // pastikan navbar selalu di atas konten lainnya
    },
    leftSection: {
        flex: 1,
    },
    centerSection: {
        display: 'flex',
        justifyContent: 'center',
        flex: 2,
    },
    rightSection: {
        flex: 1,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        margin: '0 5px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    text: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
};

export default Navbar;
