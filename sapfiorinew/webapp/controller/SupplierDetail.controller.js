sap.ui.define([
    'tcs/sap/ui/hm/controller/BaseController',
    "sap/ui/core/routing/History"
], function(BaseController,History) {
    'use strict';
    return BaseController.extend("tcs.sap.ui.hm.controller.SupplierDetail",{
       
        onInit: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("daniel").attachMatched(this.dragon,this);

        },
        //this function gets triggered automatically everytime route changes
        dragon: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").supplierId;
            var sPath = '/supplier/'+ sIndex;
            this.getView().bindElement(sPath); 
        },
        onBack: function(){
            
            var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("jack", {fruitId:0}, true);
			}
        }
        
    });
    
});