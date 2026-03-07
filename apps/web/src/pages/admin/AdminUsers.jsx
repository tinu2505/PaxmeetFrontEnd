import styles from './Admin.module.css';

export default function AdminUsers() {
  // Dummy data for now
  const users = [
    { id: 1, name: "Tushar", email: "t.tushar@example.com", status: "Active" },
    { id: 2, name: "John Doe", email: "john@example.com", status: "Banned" },
  ];

  return (
    <div className={styles.tableCard}>
      <h3>User Management</h3>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className={styles[`status${u.status}`]}>{u.status}</span></td>
              <td>
                <button className={styles.editBtn}>Edit</button>
                <button className={styles.deleteBtn}>Ban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}