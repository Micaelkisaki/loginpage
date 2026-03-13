import mysql2 from 'mysql2/promise';

class Database {
  constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'loginpage'
    };
  }

  async getConnection() {
    return await mysql2.createConnection(this.config);
  }

  async query(sql, values = []) {
    const connection = await this.getConnection();
    try {
      const [results] = await connection.execute(sql, values);
      return results;
    } finally {
      await connection.end();
    }
  }
}

export default new Database();
