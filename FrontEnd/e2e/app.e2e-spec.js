"use strict";
exports.__esModule = true;
var app_po_1 = require("./app.po");
describe('md-pro-angular-cli App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.MdProAngularCliPage();
    });
    it('should display message saying app works', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
