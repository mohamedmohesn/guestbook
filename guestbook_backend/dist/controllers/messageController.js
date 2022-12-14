"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var messageModel_1 = require("../models/messageModel");
var middleware_1 = require("../middleware");
var book = new messageModel_1.Messagebook();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book.index()];
            case 1:
                message = _a.sent();
                res.json([message]);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json(["Could not find messages"]);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messageContainer, newMessage, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                messageContainer = {
                    guests_id: req.body.guests_id,
                    messagetext: req.body.messagetext
                };
                return [4 /*yield*/, book.create(messageContainer)
                    // console.log(newMessage)
                ];
            case 1:
                newMessage = _a.sent();
                // console.log(newMessage)
                res.json({ newMessage: newMessage, mess: "add create new message is ".concat(messageContainer.messagetext) });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json("Could not add new Message");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book.show(req.params.id)];
            case 1:
                message = _a.sent();
                res.json([message]);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400);
                res.json("Could not find People");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book["delete"](req.params.id)];
            case 1:
                deleted = _a.sent();
                res.json({ deleted: deleted, mess: "message deleted" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400);
                res.json("Could not delete Message ".concat(req.params.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messagetext, newMessage, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                messagetext = req.body.messagetext;
                return [4 /*yield*/, book.edit(req.params.id, messagetext)];
            case 1:
                newMessage = _a.sent();
                console.log(newMessage);
                res.json({ newMessage: newMessage, mess: "editting message is ".concat(messagetext) });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json("Could not edit Message ");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var MessageRoutes = function (app) {
    app.get('/message', index);
    app.get('/message/:id', middleware_1.verifyToken, show);
    app.post('/message', middleware_1.verifyToken, create);
    app["delete"]('/message/:id', middleware_1.verifyToken, destroy);
    app.put('/message/edit/:id', middleware_1.verifyToken, updates);
};
exports["default"] = MessageRoutes;
