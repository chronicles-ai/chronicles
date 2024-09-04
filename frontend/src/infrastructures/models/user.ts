type User = {
  id: string;
  name: string;
  username: string;
  token: string;
  role: 'kelompok' | 'guru';
  classId?: string;
  guruId?: string;
};

export default User;
