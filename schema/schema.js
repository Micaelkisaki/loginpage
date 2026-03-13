import Database from '../lib/db.js';

class Schema {
  constructor() {
    this.db = Database;
  } 
  async createUsersTable() {
    try {
        const [sql] = this.db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        return sql;
    } catch (error) {
        throw new Error('Erro ao criar tabela: ' + error.message);
    }
  }
}

export default new Schema();