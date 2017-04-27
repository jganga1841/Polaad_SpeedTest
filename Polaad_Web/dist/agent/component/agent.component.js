"use strict";
var AgentsComponent = (function () {
    function AgentsComponent() {
    }
    AgentsComponent.prototype.getDealerAddrInfo = function (dealerId) {
        this.dealerAddrInfo = this.agentServices.getDealerAddrInfo(dealerId);
    };
    AgentsComponent.prototype.ngOnInit = function () {
    };
    return AgentsComponent;
}());
exports.AgentsComponent = AgentsComponent;
//# sourceMappingURL=agent.component.js.map