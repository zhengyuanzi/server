const { executeQuery, pool } = require('../config/db');

class Task {
  static async getTasksList(params) {
    const offset = (params.page - 1) * params.pageSize;
    const whereClause = params.whereConditions.length > 0
      ? `WHERE ${params.whereConditions.join(' AND ')}`
      : '';
    const dataSql = `SELECT Id, TaskId, TaskName, Prototype, Status, Workload, DATE_FORMAT(CreateTime, '%Y-%m-%d %H:%i:%s') AS CreateTime, DATE_FORMAT(UpdateTime, '%Y-%m-%d %H:%i:%s') AS UpdateTime FROM task ${whereClause} ORDER BY CreateTime DESC LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total FROM task ${whereClause}`;
    const dataParams = [...params.queryParams, params.pageSize, offset];
    const [rows] = await pool.query(dataSql, dataParams);
    const [totalResult] = await pool.query(countSql, params.queryParams);
    const total = totalResult[0].total;
    return {
      list: rows,
      total,
    }
  }

  static async getTaskById(id) {
    const rows = await executeQuery('SELECT * FROM task WHERE Id = ?', [id]);
    return rows[0];
  }

  static async getTaskByTaskId(taskId) {
    const rows = await executeQuery('SELECT * FROM task WHERE TaskId = ?', [taskId]);
    return rows[0];
  }

  static async createTask(task) {
    console.log(task)
    const { TaskId, TaskName, Prototype, Status, Workload } = task;
    const CreateTime = new Date();
    const UpdateTime = new Date();
    const [result] = await pool.query(
      'INSERT INTO task (TaskId, TaskName, Prototype, Status, Workload, CreateTime, UpdateTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [TaskId, TaskName, Prototype, Status, Workload, CreateTime, UpdateTime]
    );
    
    return { Id: result.insertId, ...task, CreateTime, UpdateTime };
  }

  static async updateTask(task) {
    const { Id, TaskId, TaskName, Prototype, Status, Workload } = task;
    const UpdateTime = new Date();
    const [result] = await pool.query(
      'UPDATE task SET TaskId = ?, taskName = ?, Prototype = ?, Status = ?, Workload = ?, UpdateTime = ? WHERE Id = ?',
      [TaskId, TaskName, Prototype, Status, Workload, UpdateTime, Id]
    );
    
    return result.affectedRows > 0;
  }

  static async deleteTask(id) {
    const [result] = await pool.query('DELETE FROM task WHERE Id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Task;
