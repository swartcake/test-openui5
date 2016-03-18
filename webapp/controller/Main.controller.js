sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
	"use strict";

	var CController = Controller.extend("myApp.controller.Main", {
		model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
				title: 'Général',
				key: 'root1',
				icon: 'sap-icon://folder-blank',
				expanded: false,
				items: [{
					title: "Dossier principal",
					key: 'DOS'
				}, {
					title: "Dossier de paie",
					key: 'PAD'
				}]
			}, {
				title: "Paramétrage du dossier",
				icon: 'sap-icon://building',
				expanded: false,
				items: [{
					title: "Etablissement",
					icon: 'sap-icon://building',
					key: 'ETA'
				}, {
					title: "Signataires",
					key: 'RSP'
				}, {
					title: "Périodes de paie",
					key: 'PER'
				}, {
					title: "Rubriques",
					key: 'RUB'
				}, {
					title: "Modèles de contrat",
					key: 'MCT'
				}, {
					title: "Regroupements comptables",
					key: 'RGC'
				}]
			}, {
				title: "Gestion du personnel",
				icon: 'sap-icon://employee',
				expanded: false,
				items: [{
					title: "Personnes",
					icon: 'sap-icon://employee',
					key: 'SAL'
				}, {
					title: "Contrats de travail",
					icon: 'sap-icon://my-sales-order',
					key: 'CNT'
				}, {
					title: "Absences",
					key: 'ABS'
				}, {
					title: "Décomptes IJSS",
					key: 'DIJ'
				}, {
					title: "Avances et acomptes",
					key: 'AVA'
				}, {
					title: "Saisies sur salaires",
					key: 'SSS'
				}]
			}, {
				title: "Paie",
				icon: 'sap-icon://action',
				expanded: false,
				items: [{
					title: "Saisies de la période",
					key: 'EPR'
				}, {
					title: "Bulletins",
					key: 'BUL'
				}, {
					title: "Historique des calculs",
					key: 'CLP'
				}, {
					title: "Paiements",
					key: 'SSS'
				}, {
					title: "Cumuls",
					key: 'CML'
				}, {
					title: "Reprises de cumuls",
					key: 'RPC'
				}]
			}, {
				title: "Etats et déclarations",
				icon: 'sap-icon://documents',
				expanded: false,
				items: [{
					title: "Bulletins",
					key: 'REPORTS_BUL'
				}, {
					title: "Cumuls",
					key: 'REPORTS_CML'
				}, {
					title: "Rubriques",
					key: 'REPORTS_RUB'
				}, {
					title: "Liste des paiements",
					key: 'REPORTS_PAIEMENT'
				}, {
					title: "Récapitulatif de paie",
					key: 'REPORTS_RECAP'
				}, {
					title: "Etat des cotisations",
					key: 'REPORTS_COTIS'
				}, {
					title: "DUCS",
					key: 'REPORTS_DUCS'
				}, {
					title: "DSN",
					key: 'DSN'
				}]
			}, {
				title: "Comptabilité",
				icon: 'sap-icon://accounting-document-verification',
				expanded: false,
				items: [{
					title: "Comptes",
					key: 'CPT'
				}, {
					title: "Générer les écritures comptables",
					key: 'REPORTS_CML'
				}]
			}, {
				title: "Paramètres",
				icon: 'sap-icon://accounting-document-verification',
				expanded: false,
				items: [{
					title: "Types de contrat",
					key: 'TCT'
				}, {
					title: "Entrées/sorties",
					expanded: false,
					items: [{
						text: "Motifs d'entrée",
						key: 'MTE'
					}, {
						text: "Motifs d'entrée Pôle Emploi",
						key: 'MEA'
					}, {
						text: "Motifs de sortie",
						key: 'MTF'
					}, {
						text: "Motifs de sortie Pôle Emploi",
						key: 'MFA'
					}]
				}, {
					title: "Paramètres de paie",
					expanded: false,
					items: [{
						text: 'Groupes de paye',
						key: 'GRP'
					}, {
						text: 'Lots de paye',
						key: 'LOT'
					}, {
						text: "Variables",
						key: 'VAR'
					}, {
						text: "Valeurs variables globales",
						key: 'VGL'
					}, {
						text: "Regroupements de rubriques",
						key: 'REG'
					}, {
						text: "Types d'absences",
						key: 'TAB'
					}]
				}, {
					title: "Calculs de paie",
					expanded: false,
					items: [{
						text: 'Colonnes de bulletin',
						key: 'CLB'
					}, {
						text: "Types d'alimentation de données",
						key: 'TAL'
					}, {
						text: "Types de données rubrique",
						key: 'TDR'
					}, {
						text: "Formats de données rubrique",
						key: 'TDO'
					}, {
						text: "Compteurs",
						key: 'CPT'
					}, {
						text: "Cumuls",
						key: 'CML'
					}]
				}, {
					title: "Paramètres de cotisations",
					expanded: false,
					items: [{
						text: "Types de cotisants",
						key: 'TCO'
					}, {
						text: "Codes DUCS",
						key: 'CDU'
					}, {
						text: "Types d'organismes",
						key: 'TOR'
					}, {
						text: "Organismes",
						key: 'ORG'
					}, {
						text: "Regroupements d'organismes",
						key: 'ROR'
					}]
				},
				{
					title: "Paramètres conventionnels",
					expanded: false,
					items: [{
						text: "Conventions collectives",
						key: 'CCL'
					}, {
						text: "Emplois",
						key: 'EMP'
					}]
				}, {
					title: "Autres codifications",
					expanded: false,
					items: [{
						text: "Codes Insee PCS-ESE",
						key: 'PCS'
					}]
				}, {
					title: "Paramètres DSN",
					expanded: false,
					items: [{
						text: "Paramètres XXX DSN",
						key: 'DSN_PARAM_XXX'
					}]
				}]
			}],
			fixedNavigation: [{
				title: 'Fixed Item 1',
				icon: 'sap-icon://employee'
			}, {
				title: 'Fixed Item 2',
				icon: 'sap-icon://building'
			}],
			// headerItems: [{
			// 	text: "File"
			// }, {
			// 	text: "Edit"
			// }, {
			// 	text: "View"
			// }, {
			// 	text: "Settings"
			// }, {
			// 	text: "Help"
			// }]
		},
		onInit: function() {
			this.model.setData(this.data);
			this.getView().setModel(this.model);

			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
		},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},

		handleUserNamePress: function(event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content: [
					new Button({
						text: "Mon compte",
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: "Mes demandes d'amélioration",
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: "Se déconnecter",
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		},

		onSideNavButtonPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		}

	});


	return CController;

});