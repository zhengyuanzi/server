// 扩展 res 对象，添加 success 和 error 方法
module.exports = (req, res, next) => {
	/**
	 * 成功响应
	 * @param {any} data - 要返回的数据（可选）
	 * @param {string} msg - 成功提示信息（默认："操作成功"）
	 * @param {number} code - 业务状态码（默认：1）
	 */
	res.success = (data, msg = "操作成功", code = 200) => {
		res.status(200).json({  // HTTP 状态码固定 200（成功）
			code,
			msg,
			data: data || null  // 无数据时返回 null
		});
	};

	/**
	 * 失败响应
	 * @param {string} msg - 错误提示信息（默认："操作失败"）
	 * @param {number} code - 业务状态码（默认：400）
	 * @param {number} httpStatus - HTTP 状态码（默认：200，如需特殊状态码可自定义）
	 * @param {any} data - 错误相关数据（可选，默认：null）
	 */
	res.error = ({
		msg = "操作失败",
		code = 400,
		httpStatus = 200,
		data = null
	}) => {
		res.status(httpStatus).json({  // HTTP 状态码可自定义（如 401 未授权）
			code,
			msg,
			data
		});
	};

	next(); // 继续执行后续中间件
};