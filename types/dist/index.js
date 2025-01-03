"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog = exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean(),
    category: zod_1.default.string(),
    date: zod_1.default.string().date(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
    published: zod_1.default.boolean().default(false),
    category: zod_1.default.string(),
});
exports.blog = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().min(4).max(60),
    content: zod_1.default.string(),
    published: zod_1.default.boolean().default(false),
    authorId: zod_1.default.string(),
    category: zod_1.default.string(),
    date: zod_1.default.string().date(),
});
