sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/iot/elements/IoTEventsOnChartElement"
], function (Controller, IoTEventsOnChart) {
	"use strict";
	return Controller.extend("com.espedia.controller.Main", {

		onInit: function () {
			//inizializzo i dati 
			debugger;
			this.bRenderChart = true;
			this.bNavMp = false;
			//this.sThingId = oEvent.getParameter("arguments").thingId;
			var oModel = new sap.ui.model.json.JSONModel();
			var oChart = this.byId("idChart");
			oChart.setModel(oModel, "chartModel");
		},

		onOpenChart: function (oEvent) {
			debugger;
			var thing = oEvent.getParameters().thing;
			var sPath = thing.getPath();
			this.sThingId = this.getID(sPath);
			var oChart = this.byId("idChart");
			oChart.bNavFromMeasuredValue = false;
			oChart.bNavFromEventList = false;
			this._renderChart(oChart, this.sThingId);
			oChart.setVisible(true);
		},

		getID: function (string) {
			var regExp = /\('([A-Z0-9]+)'\)/;
			var match = regExp.exec(string);
			return match[1];
		},

		_renderChart: function (oChart, sThingId) {
			debugger;
			// Workaround as of now because onAfterRendering does not get called for the second time
			if (!this.bRenderChart) {
				oChart.setEventsVisible(false);
				oChart.setAssetId(sThingId);
			}
		},

		onAfterRendering: function () {
			debugger;
			if (this.bRenderChart) {
				var oChart = this.byId("idChart");
				this.bRenderChart = false;
				if (this.eventsContext) {
					oChart.setEventsVisible(true);
				} else {
					oChart.setEventsVisible(false);
				}
				oChart.setAssetId(this.sThingId);
			}
		},

		handleNavBackPress: function () {
			window.history.back();
			if (this.getOwnerComponent().isTimedOut) {
				this.getOwnerComponent().showTimeoutMessage();
			}
		}
	});

});