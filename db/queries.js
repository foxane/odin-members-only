import pool from './pool.js';

export default {
  // USER QUERIES =========================
  createUser: async (fullName, username, password) => {
    await pool.query(
      `
      INSERT INTO users (full_name, username, password)
      VALUES ($1,$2,$3);`,
      [fullName, username, password],
    );
  },

  deleteUser: async userId => {
    await pool.query('DELETE FROM users WHERE id=$1', [userId]);
  },

  makeMember: async userId => {
    await pool.query('UPDATE users SET is_member = true WHERE id = $1', [
      userId,
    ]);
  },

  makeAdmin: async userId => {
    await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [
      userId,
    ]);
  },

  getAllUser: async () => {
    const { rows } = await pool.query(`
      SELECT 
          u.id, 
          u.username, 
          u.full_name, 
          u.create_date, 
          u.is_member, 
          u.is_admin,
          COUNT(p.id) AS post_count
      FROM users AS u
      LEFT JOIN posts AS p ON u.id = p.user_id
      GROUP BY 
          u.id, u.username, u.full_name, u.create_date, u.is_member, u.is_admin
      ORDER BY 
          u.id;
      `);
    return rows;
  },

  // POST QUERIES =========================
  getAllPost: async () => {
    const { rows } = await pool.query(`
      SELECT 
          p.id, 
          COALESCE(u.full_name, 'Anonymous') AS full_name, 
          p.title, 
          p.content, 
          p.create_date
      FROM posts AS p
      LEFT JOIN users AS u ON u.id = p.user_id
      ORDER BY p.create_date DESC;
      ;`);

    return rows;
  },

  createPost: async (user_id, title, content) => {
    await pool.query(
      `
      INSERT INTO posts (user_id, title, content)
      VALUES ($1,$2,$3);`,
      [user_id, title, content],
    );
  },

  deletePost: async postId => {
    await pool.query('DELETE FROM posts WHERE id=$1', [postId]);
  },
};
