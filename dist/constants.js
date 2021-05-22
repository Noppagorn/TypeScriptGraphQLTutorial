"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__password_db__ = exports.__username_db__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.__username_db__ = "postgres";
exports.__password_db__ = "080940";
exports.COOKIE_NAME = "qid";
exports.FORGET_PASSWORD_PREFIX = 'forget-password:';
//# sourceMappingURL=constants.js.map