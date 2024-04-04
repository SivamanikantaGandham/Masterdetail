sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'tcs/sap/ui/hm/util/formatter',
    'sap/ui/model/FilterOperator'
], function(Controller,formatter,FilterOperator) {
    'use strict';
    return Controller.extend("tcs.sap.ui.hm.BaseController",{
        formatter:formatter,
        FilterOperator:FilterOperator
    });
});