"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var userController_1 = __importDefault(require("./controllers/userController"));
var messageController_1 = __importDefault(require("./controllers/messageController"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:4000";
app.use((0, cors_1["default"])());
app.use((0, cookie_parser_1["default"])());
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, userController_1["default"])(app);
(0, messageController_1["default"])(app);
app.listen(4000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
