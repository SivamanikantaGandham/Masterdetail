sap.ui.define([
    'tcs/sap/ui/hm/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
    
], function(BaseController,Filter,FilterOperator,MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend("tcs.sap.ui.hm.controller.View1",{
        onGoTo: function(sIndex){
            //get the object of router
            var oRouter= this.getOwnerComponent().getRouter();
            //ask router to navigate
            oRouter.navTo("jack",{
                fruitId:sIndex
            });
            //Step 1: get the App Container class object where we embedded our views
            //var oAppCon = this.getView().getParent().getParent();
            //step 2: container has API to navigate
           // oAppCon.toDetail("idView2")
            //alert("Function under construction");
            
        },
        onOrder:function(){
            this.onGoTo();
        },
        onSearch:function(oEvent){
            //step1:what was the value entered by user in search field -oEvent-query
            var sVal=oEvent.getParameter("query");
            //step2:construct a filter obj - just like a condition property opr value
            var oFilter1 = new Filter("name",FilterOperator.Contains,sVal);
            var oFilter2 = new Filter("taste",FilterOperator.Contains,sVal);
            var oFilter = new Filter({
                filters:[oFilter1,oFilter2],
                and:false
            });
            //Step 3:get the list control object
            var oList = this.getView().byId("idList");
            //step4:we have binding inside the list -- items -- inject our filter inside
            oList.getBinding("items").filter([oFilter]);
        },
        onItemDelete:function(oEvent){
            //step1: get the object of the item on which delete was performed
            var oToBeDeleted=oEvent.getParameter("listItem");
            //Step 2:get the object of list control
            var oList = oEvent.getSource();
            //step 3: fire function of list to perform delete
             oList.removeItem(oToBeDeleted);
        },
        onSelectItemNavigation: function(oEvent){
            //Step 1:obtain the path of selected item(element)
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            //Step2: get the object of View2
            //var oView2 = this.getView().getParent().getPage("idView2");
            //var oView2 = this.getView().getParent().getParent().getDetailPage("idView2");
            // step3: perform binding with view2 whole of the first element
            //oView2.bindElement(sPath);
            var sIndex = sPath.split("/")[sPath.split("/").length-1];
            //Navigate to next screen
            this.onGoTo(sIndex);
        },
        onAddDataDialogOpen: function() {
            var dialog = this.byId("addDataDialog");
            if (!dialog) {
                dialog = sap.ui.xmlfragment(this.getView().getId(), "tcs.sap.ui.hm.fragments.addFruit", this);
                this.getView().addDependent(dialog);
            }
            dialog.open();
        },

        onAddDataPress: function() {
            var newData = {
                name: this.byId("nameInput").getValue(),
                color: this.byId("colorInput").getValue(),
                taste: this.byId("tasteInput").getValue(),
                size: this.byId("sizeInput").getValue(),
                price: parseFloat(this.byId("priceInput").getValue()),
                curr: this.byId("currencyInput").getValue(),
                healthBenefit: this.byId("healthInput").getValue(),
                season: this.byId("seasonInput").getValue(),
                availability: this.byId("availabilityInput").getValue(),
                image: this.byId("imageInput").getValue()
            };

            //sending the newData 
            console.log("New data:", newData);
            
            this.byId("addDataDialog").close();
            sap.m.MessageToast.show("New Fruit added successfully");
        },

        onCancelPress: function() {
            this.byId("addDataDialog").close();
        }

    });
    
});