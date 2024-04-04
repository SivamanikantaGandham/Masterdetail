sap.ui.define([
    'tcs/sap/ui/hm/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter'
    
], function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend("tcs.sap.ui.hm.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("jack").attachMatched(this.dragon,this);

        },
        onSupplierSelect: function(oEvent){
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length-1];
           this.oRouter.navTo("daniel",{
            supplierId: sIndex 
           });
        },
        //this function gets triggered automatically everytime route changes
        dragon: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/'+ sIndex;
            this.getView().bindElement(sPath); 
        },
        onBack: function(){
            //Step 1: get the App Container class object where we embedded our views
            var oAppCon = this.getView().getParent();
            //step 2: container has API to navigate
            oAppCon.to("idView1")
            //alert("Function under construction");
        },
        oSupplierPopup:null,
        oCityPopup:null,
        suppFilter: function(){
            //here we create a local copy of this variable
            var that = this;
            if(!this.oSupplierPopup){
                Fragment.load({
                    name:'tcs.sap.ui.hm.fragments.popup',
                    type:'XML',
                    id:'supplier',
                     controller: this
                }).then(function(oPopup){
                    //a local variable can be accessed in promise function
                    that.oSupplierPopup = oPopup;
                    that.oSupplierPopup.bindAggregation("items",{
                        path:'/supplier',
                        template:new sap.m.StandardListItem({
                            icon:'sap-icon://supplier',
                            description:'{city}',
                            title:'{name}'
                        })
                    });
                    that.oSupplierPopup.setTitle("Select Supplier");
                    // allowing the immune system to access body partd to a parasite
                    // the view allowing fragment to access the model
                    that.getView().addDependent(that.oSupplierPopup)
                    that.oSupplierPopup.open();
                });

            }else{
                this.oSupplierPopup.open();
            }
            
        },
        
        cityValueHelp: function(oEvent){
            this.oField = oEvent.getSource();
            var that = this;
            
            if(!this.oCityPopup){
                Fragment.load({
                    name:'tcs.sap.ui.hm.fragments.popup',
                    type:'XML',
                    id:'city',
                    controller: this
                }).then(function(oPopup){
                    //a local variable can be accessed in promise function
                    that.oCityPopup = oPopup;
                    that.oCityPopup.bindAggregation("items",{
                        path:'/cities',
                        template:new sap.m.StandardListItem({
                            icon:'sap-icon://home',
                            description:'{famousFor}',
                            title:'{name}'
                        })
                    });
                    that.oCityPopup.setTitle("Select City");
                    // allowing the immune system to access body partd to a parasite
                    // the view allowing fragment to access the model
                    that.getView().addDependent(that.oCityPopup)
                    that.oCityPopup.open();
                    
                });

            }else{
                this.oCityPopup.open();
            }
        },
        oField:null,
        onConfirmPopup: function(oEvent){
            var sId = oEvent.getSource().getId();
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sName = oSelectedItem.getTitle();
            if(sId.indexOf("city") != -1){
                this.oField.setValue(sName);
            }else{
                this.getView().byId("suppTab").getBinding("items").filter(
                    [new Filter("name", this.FilterOperator.EQ, sName)]
                );
            }
        },
        onSave:function(){
            MessageBox.confirm("Would you like to order fruits??",{
                title: "Confirm your order?",
                onClose: function(choice){
                    if(choice === "OK"){
                    MessageToast.show("Your order has been placed successfully");
                    }else{
                        MessageToast.show("Oops! your order was cancelled");
                    }
                }
            });
        }
    });
    
});