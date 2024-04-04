sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("tcs.sap.ui.hm.Component",{
        metadata:{
            manifest:"json"
        },
        init: function(){
            //call base class constructor---get goodies from parent class
            UIComponent.prototype.init.apply(this);

            // 1.Get the router obj from parent class
            var  oRouter = this.getRouter();
            //2. Initialize the router object,the moment we initialize,
            //it will look for routing configuration, if the cofiguration
            //is not found in manifest.json it will dump
            oRouter.initialize();

        }, 
        // createContent: function(){
        //     //This is for the root view of out app
        //     var oAppView = new sap.ui.view({
        //         id:"idRootView",
        //         viewName:'tcs.sap.ui.hm.view.App',
        //         type:"XML"
        //     });
        //     //from the App View object we now obtain the container control object
        //     var  oAppCon = oAppView.byId("idAppCon");

        //     //now we have to create our view objects
        //     var oView1 = new sap.ui.view({
        //         id:"idView1",
        //         viewName:'tcs.sap.ui.hm.view.View1',
        //         type:"XML"
        //     });

        //     var oView2 = new sap.ui.view({
        //         id:"idView2",
        //         viewName:'tcs.sap.ui.hm.view.View2',
        //         type:"XML"
        //     });

        //     var oEmpty = new sap.ui.view({
        //         id:"idEmpty",
        //         viewName:'tcs.sap.ui.hm.view.Empty',
        //         type:"XML"
        //     });

        //     //add these view objects inside the pages aggrigation of app container
        //     // for this we use addPage() function from SDK -- chaining
        //     oAppCon.addMasterPage(oView1).addDetailPage(oEmpty).addDetailPage(oView2);


        //     return oAppView;
        // },
        destroy: function(){

        }
    })
});