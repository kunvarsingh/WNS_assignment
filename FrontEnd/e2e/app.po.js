"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
var MdProAngularCliPage = /** @class */ (function () {
    function MdProAngularCliPage() {
    }
    MdProAngularCliPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    MdProAngularCliPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return MdProAngularCliPage;
}());
exports.MdProAngularCliPage = MdProAngularCliPage;
