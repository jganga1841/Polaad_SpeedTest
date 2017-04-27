"use strict";
var MenuInformation = (function () {
    function MenuInformation(MenuId, MenuName, ParentId, SubMenuList, Path, MenuClass) {
        this.MenuId = MenuId;
        this.MenuName = MenuName;
        this.ParentId = ParentId;
        this.SubMenuList = SubMenuList;
        this.Path = Path;
        this.MenuClass = MenuClass;
    }
    return MenuInformation;
}());
exports.MenuInformation = MenuInformation;
//# sourceMappingURL=menu_information.js.map