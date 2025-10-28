const Task = require('../models/taskModel');

exports.getTasksList = async (req, res) => {
	try {
		const page = Number(req.query.page);
		const pageSize = Number(req.query.pageSize) || 10;
		const {
			taskId = '',
			taskName = '',
			taskStatus = ''
		} = req.query
		const whereConditions = [];
		const queryParams = [];
		if (taskId) {
			whereConditions.push(`TaskId LIKE ?`);
			queryParams.push(`%${taskId}%`);
		}
		if (taskName) {
			whereConditions.push(`TaskName LIKE ?`);
			queryParams.push(`%${taskName}%`);
		}
		if (taskStatus) {
			whereConditions.push(`Status = ?`);
			queryParams.push(taskStatus);
		}
		const tasks = await Task.getTasksList({
			page,
			pageSize,
			whereConditions,
			queryParams
		});
		res.success(tasks);
	} catch (error) {
		res.error({
			httpStatus: 500,
			msg: error.message
		})
	}
};

exports.createTask = async (req, res) => {
	try {
		if (!req.body.TaskId) {
			return res.error({
				msg: '任务编号不能为空'
			})
		}

		if (!req.body.TaskName) {
			return res.error({
				msg: '任务名称不能为空'
			})
		}

		if (!req.body.Status) {
			return res.error({
				msg: '任务状态不能为空'
			})
		}

		const validStatusValues = [0, 1, 2, 3];
		if (!validStatusValues.includes(parseInt(req.body.Status))) {
			return res.error({
				msg: '任务状态输入错误'
			})
		}

		const existingTask = await Task.getTaskByTaskId(req.body.TaskId);
		if (existingTask) {
			return res.error({
				msg: '该任务已存在'
			})
		}

		const newTask = await Task.createTask(req.body);
		res.success(newTask);
	} catch (error) {
		res.error({
			httpStatus: 500,
			msg: error.message
		})
	}
};

exports.updateTask = async (req, res) => {
	try {
		const existingTask = await Task.getTaskById(req.body.Id);
		if (!existingTask) {
			return res.error({
				msg: '该任务不存在'
			})
		}

		if (req.body.Status !== undefined) {
			const validStatusValues = [0, 1, 2, 3];
			if (!validStatusValues.includes(parseInt(req.body.Status))) {
				return res.error({
					msg: '任务状态输入错误'
				})
			}
		}

		if (req.body.TaskId && req.body.TaskId !== existingTask.TaskId) {
			const taskWithNewId = await Task.getTaskByTaskId(req.body.TaskId);
			if (taskWithNewId) {
				return res.error({
					msg: '该任务编号已存在'
				})
			}
		}

		const updated = await Task.updateTask(req.body);
		if (updated) {
			const updatedTask = await Task.getTaskById(req.body.Id);
			res.success(updatedTask);
		} else {
			res.error({
				msg: '任务更新失败'
			})
		}
	} catch (error) {
		res.error({
			httpStatus: 500,
			msg: error.message
		})
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const existingTask = await Task.getTaskById(req.body.id);
		if (!existingTask) {
			return res.error({
				msg: '该任务不存在'
			})
		}

		const deleted = await Task.deleteTask(req.body.id);
		if (deleted) {
			res.success();
		} else {
			res.error({
				msg: '任务删除失败'
			})
		}
	} catch (error) {
		res.error({
			httpStatus: 500,
			msg: error.message
		})
	}
};

exports.getTasksDetail = async (req, res) => {
	try {
		const existingTask = await Task.getTaskById(req.query.id);
		if (!existingTask) {
			return res.error({
				msg: '该任务不存在'
			})
		}

		const taskInfo = await Task.getTaskById(req.query.id);
		if (taskInfo) {
			res.success(taskInfo);
		} else {
			res.error({
				msg: '获取任务详情失败'
			})
		}
	} catch (error) {
		res.error({
			httpStatus: 500,
			msg: error.message
		})
	}
}