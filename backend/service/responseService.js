const responseService = {
  statusCodes: {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
    serviceUnavailable: 503,
  },

  success(message, data = {}, statusCode = this.statusCodes.ok) {
    return {
      success: true,
      message,
      data,
      status: statusCode,
    };
  },

  error(message, error = null, statusCode = this.statusCodes.badRequest) {
    return {
      success: false,
      message,
      error,
      status: statusCode,
    };
  },

  unauthorizedError(message, error = "Unauthorized") {
    return this.error(message, error, this.statusCodes.unauthorized);
  },
  forbiddenError(message, error = "Forbidden") {
    return this.error(message, error, this.statusCodes.forbidden);
  },

  notFoundError(message, error = "Not Found") {
    return this.error(message, error, this.statusCodes.notFound);
  },

  conflictError(message, error = "Conflict") {
    return this.error(message, error, this.statusCodes.conflict);
  },

  internalServerError(message, error = "Internal Server Error") {
    return this.error(message, error, this.statusCodes.internalServerError);
  },

  serviceUnavailableError(message, error = "Service Unavailable") {
    return this.error(message, error, this.statusCodes.serviceUnavailable);
  },
};

module.exports = responseService;
