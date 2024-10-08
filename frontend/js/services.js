'use strict';

/* Services */

angular.module('iechor_front.services', [])
.service('Alert', function(){
	this.list = [];
	this.add = function(_message, _type) {
		this.list.push({msg: _message, type: _type, ttl:2});
	};
	this.remove = function(_index) {
		this.list.splice(_index, 1);
	}
})
.service('User', [function(){
	this.current = {};
	return {
		isLoggedIn: function () {
			return this.authenticated == true;                   
		},
		getUsername: function () {
			if (!_.isEmpty(this.current)) {
				return this.current.username;
			}
		},
		isSuperuser: function () {
			if (!_.isEmpty(this.current)) {
				return this.current.is_superuser;
			}
		},

	}
}])
.service('Query', [function(){
	this.current = [];
}])
.service('DomainConnection', ['$resource', function($resource){
	return $resource('/api/d/', null, {
		'query': {
			isArray: true,
			method:'GET'
		},
		'create': {
			method:'POST'
		}
	})
}])
.service('DomainDetailConnection', ['$resource', function($resource){
	return $resource('/api/d/:domain', {'domain': '@domain'}, {
		'query': {
			isArray:false,
			method:'GET'
		},
		'update': {
			method:'PUT'
		},
		'delete': {
			method:'DELETE'
		}
	})
}])
.service('Domain', ['DomainDetailConnection', function(DomainDetailConnection){
	var _this = this;
	this.current = {};
	this.loaded = false;
	this.set = function(domain) {
		_this.current = domain;
	}
	this.load = function(domain) {
		if (typeof domain != 'undefined') {
			var response = DomainDetailConnection.query({'domain':domain}, function(response) {
				_this.set(response.data);
				_this.loaded = true;
			});
		} else {
			_this.loaded = false;
		}
	}
	this.isLoaded = function() {
		return _this.loaded;
	}
	this.hasSubdomain = function() {
		return !_.isEmpty(_this.current);
	}
	this.hasTitle = function() {
		return _this.current.title !== undefined;
	}
	this.hasSubTitle = function() {
		return _this.current.sub_title !== undefined;
	}
	this.hasDescription = function() {
		return _this.current.description !== undefined;
	}
}])
.service('Highlighting', [function(){
	var _this = this;
	this.terms = [];
	this.purge = function() {
		while (_this.terms.length > 0) {
			_this.terms.pop();
		}
	}
	this.set = function(query_array) {
		_this.purge();
		for (var i in query_array) {
			_this.terms.push(query_array[i].text.replace(/['"]/g,""));
		}
	}
}])
.service('AgentListConnection', ['$resource', function($resource){
	return $resource('/api/t/', null, {
		'query': {
			isArray:false,
			method:'GET'
		},
		'update': {
			method:'PUT'
		}
	})
}])
.service('AgentListOverviewConnection', ['$resource', function($resource){
	return $resource('/api/agent-list/', null, {
		'query': {
			isArray:true,
			method:'GET'
		}
	})
}])
.service('AgentList', ['$stateParams', 'AgentListConnection', function($stateParams, AgentListConnection){
	var _this = this;
	this.count = 0;
	this.list = [];
	this.loading = true;

	this.refresh = function() {
		// enable spinner
		this.loading = true;

		// get agents
		var response = AgentListConnection.query($stateParams, function() {
			// disable spinner
			_this.loading = false;
			_this.count = response.count;
			_this.list = response.list;
		});
	}
}])
.factory('AgentTableDataSource', function() {
	var columnDescriptionForKey = function(key, hidden) {
		var widthCharMultiplier = 12;
		var columnDescription = {};
		if (key == 'Name') {
			columnDescription = {field: 'name', displayName: 'Name', cellTemplate: '/partials/grid_cells/nameCell.html', width: '150', resizable: true};
		}
		else if (key == 'Operating System') {
			columnDescription = {field: 'operatingSystem', displayName: 'Operating system', cellTemplate: '/partials/grid_cells/platformCell.html', width: '100', resizable: true};
		}
		else if (key == 'Description') {
			columnDescription = {field: 'description', displayName: 'Description', width: '*', resizable: true, cellTemplate: '/partials/grid_cells/defaultCell.html'};
		}
		else if (key == 'Operation') {
			columnDescription = {field: 'function', displayName: 'Operation', width: '220', resizable: true, cellTemplate: '/partials/grid_cells/functionCell.html'};
		}
		else if (key == 'Input') {
			columnDescription = {field: 'function', displayName: 'Input', width: '240', resizable: true, cellTemplate: '/partials/grid_cells/inputCell.html'};
		}
		else if (key == 'Output') {
			columnDescription = {field: 'function', displayName: 'Output', width: '240', resizable: true, cellTemplate: '/partials/grid_cells/outputCell.html'};
		}
		else if (key == 'Topic') {
			columnDescription = {field: 'topic', displayName: 'Topic', width: '200', resizable: true, cellTemplate: '/partials/grid_cells/topicCell.html'};
		}
		else if (key == 'Homepage') {
			columnDescription = {field: 'homepage', displayName: 'Homepage', resizable: true, width: '100', cellTemplate: '/partials/grid_cells/urlCell.html'};
		}
		else if (key == 'Agent Type') {
			columnDescription = {field: 'agentType', displayName: 'Agent type', width: '150', resizable: true, cellTemplate: '/partials/grid_cells/listCell.html'};
		}
		else if (key == 'Publications') {
			columnDescription = {field: 'publication', displayName: 'Publications', width: '250', resizable: true, cellTemplate: '/partials/grid_cells/publicationsCell.html'};
		}
		else if (key == 'Collection') {
			columnDescription = {field: 'collectionID', displayName: 'Collection', width: '150', resizable: true, cellTemplate: '/partials/grid_cells/listCell.html'};
		}
		else if (key == 'bio.agents ID') {
			columnDescription = {field: 'bioagentsID', displayName: 'bio.agents ID', width: '120', resizable: true, cellTemplate: '/partials/grid_cells/defaultCell.html'};
		}
		else if (key == 'Documentation') {
			columnDescription = {field: 'documentation', displayName: 'Documentation', width: '160', resizable: true, cellTemplate: '/partials/grid_cells/linkListCell.html'};
		}
		else if (key == 'Link') {
			columnDescription = {field: 'link', displayName: 'Links', width: '160', resizable: true, cellTemplate: '/partials/grid_cells/linkListCell.html'};
		}
		else if (key == 'Download') {
			columnDescription = {field: 'download', displayName: 'Downloads', width: '160', resizable: true, cellTemplate: '/partials/grid_cells/linkListCell.html'};
		}
		else if (key == 'Language') {
			columnDescription = {field: 'language', displayName: 'Language', width: '120', resizable: true, cellTemplate: '/partials/grid_cells/listCell.html'};
		}
		else if (key == 'Credits') {
			columnDescription = {field: 'credit', displayName: 'Credits & Support', width: '150', resizable: true, cellTemplate: '/partials/grid_cells/creditsCell.html'};
		}
		else if (key == 'Accessibility') {
			columnDescription = {field: key.toLowerCase(), displayName: key, width: '150', resizable: true, cellTemplate: '/partials/grid_cells/listCell.html'};
		}
		else if (key == 'Cost') {
			columnDescription = {field: key.toLowerCase(), displayName: key, width: '90', resizable: true, cellTemplate: '/partials/grid_cells/defaultCell.html'};
		}
		else if (key == 'Version') {
			columnDescription = {field: key.toLowerCase(), displayName: key, width: '90', resizable: true, cellTemplate: '/partials/grid_cells/listCell.html'};
		}
		else {
			columnDescription = {field: key.toLowerCase(), displayName: key, width: key.length * widthCharMultiplier, resizable: true, cellTemplate: '/partials/grid_cells/defaultCell.html'};
		}
		columnDescription.enableHiding = true;
		columnDescription.visible = hidden;
		columnDescription["minWidth"] = 120;
		return columnDescription;
	}

	return {
		columnsDescription : function(visibleColumns) {
			return [
			columnDescriptionForKey('Name', visibleColumns.indexOf('Name') != -1),
			columnDescriptionForKey('Description', visibleColumns.indexOf('Description') != -1),
			columnDescriptionForKey('Homepage', visibleColumns.indexOf('Homepage') != -1),
			columnDescriptionForKey('Version', visibleColumns.indexOf('Homepage') != -1),
			columnDescriptionForKey('bio.agents ID', visibleColumns.indexOf('bio.agents ID') != -1),
			columnDescriptionForKey('Agent Type', visibleColumns.indexOf('Agent Type') != -1),
			columnDescriptionForKey('Topic', visibleColumns.indexOf('Topic') != -1),
			columnDescriptionForKey('Publications', visibleColumns.indexOf('Publications') != -1),
			columnDescriptionForKey('Credits', visibleColumns.indexOf('Credits') != -1),
			columnDescriptionForKey('Operation', visibleColumns.indexOf('Operation') != -1),
			columnDescriptionForKey('Input', visibleColumns.indexOf('Input') != -1),
			columnDescriptionForKey('Output', visibleColumns.indexOf('Output') != -1),
			columnDescriptionForKey('Documentation', visibleColumns.indexOf('Documentation') != -1),
			columnDescriptionForKey('Operating System', visibleColumns.indexOf('Operating System') != -1),
			columnDescriptionForKey('Language', visibleColumns.indexOf('Language') != -1),
			columnDescriptionForKey('License', visibleColumns.indexOf('License') != -1),
			columnDescriptionForKey('Link', visibleColumns.indexOf('Link') != -1),
			columnDescriptionForKey('Accessibility', visibleColumns.indexOf('Accessibility') != -1),
			columnDescriptionForKey('Download', visibleColumns.indexOf('Download') != -1),
			columnDescriptionForKey('Collection', visibleColumns.indexOf('Collection') != -1),
			columnDescriptionForKey('Cost', visibleColumns.indexOf('Cost') != -1),
			columnDescriptionForKey('Maturity', visibleColumns.indexOf('Maturity') != -1)
			];
		}
	}
})
.service('AgentPaginator', function(){
	this.currentPage = 1;
	// pagination settings
	this.maxSize = 5;
	this.pageSize = 10;
})
.service('AgentSorter', function(){
	var _this = this;
	this.order = true;
	this.list = [
	{"attrName": "lastUpdate", "text": "Updated"},
	{"attrName": "additionDate", "text": "Added"},
	{"attrName": "name", "text": "Name"},
	{"attrName": "citationCount", "text": "Citation Count"},
	{"attrName": "citationDate", "text": "Publication Date"}
	];
	this.sortBy = this.list[0];

	var scoreEntry = {"attrName": "score", "text": "Score"};

	this.setSortOption = function(parameter) {
		if (parameter == undefined) {
			this.sortBy = this.list[0];
		}
		else {
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i]['attrName'] == parameter) {
					this.sortBy = this.list[i];
				}
			}
		}
	} 

	// add 'Score' to the list of sortable attributes
	this.addScore = function () {
		if (!_.isEqual(scoreEntry, _this.list[0])) {
			_this.list.unshift(scoreEntry);
			_this.sortBy = _this.list[0];
		}
	}

	// remove 'Score' from the list of sortable attributes
	this.removeScore = function () {
		if (_.isEqual(scoreEntry, _this.list[0])) {
			_this.list.splice(0,1);
			_this.sortBy = _this.list[0];
		}
	}
})
.service('DisplayModeSelector', function(){
	this.list = [
	{"attrName": "cards", "text": "Compact"},
	{"attrName": "grid", "text": "Detailed"}
	];
	this.mode = this.list[0];
})
.factory('Agent', ['$resource', function($resource){
	return $resource('/api/t/:id', null, {
		'query': {
			isArray:false,
			method:'GET'
		},
		'update': {
			method:'PUT'
		}
	})
}])
.factory('DisownAgentService', ['$resource', function($resource){
	return $resource('/api/t/:id/disown', {'id': '@id'}, {
		'disown': {
			method:'POST'
		}
	})
}])
.factory('AgentCreateValidator', ['$resource', function($resource){
	return $resource('/api/t/:id/validate', null, {
		'update': {
			method:'PUT'
		}
	})
}])
.factory('AgentUpdateValidator', ['$resource', function($resource){
	return $resource('/api/t/:id/validate', null, {
		'update': {
			method:'PUT'
		}
	})
}])
.factory('Ontology', ['$resource', function($resource){
	return $resource('/api/o/:name', null, {})
}])
.factory('UsedTerms', ['$resource', function($resource){
	return $resource('/api/used-terms/:usedTermName', null, {
		'query': {
			isArray:true,
			method:'GET'
		},
	})
}])
.service('Attribute', function() {
	this.description = {
		everything: {
			label: "Everything"
		},
		name: {
			description: "Sofware name.",
			label: "Name"
		},
		agentType: {
			description: "A type of application software: a agent can have more than one type.",
			label: "Agent type"
		},
		version: {
			description: "Software version information. Use 'Add version' to enter individual version numbers (if practical).",
			label: "Current version"
		},
		description: {
			description: "Software description, e.g. a few sentences adapted from the software publication abstract or homepage.",
			label: "Description"
		},
		operation: {
			description: "A basic operation performed by this software function.",
			label: "Operation"
		},
		functionNote: {
			description: "Concise comment about this function, if not apparent from the description and EDAM annotations.",
			label: "Function description"
		},
		functionName: {
			description: "Name of the function (EDAM term)",
			label: "Function Name"
		},
		input: {
			description: "Details of input data for this function.",
			label: "Input"
		},
		inputDataType: {
			description: "Type of input data.",
			label: "Data type"
		},
		inputDataFormat: {
			description: "Allowed format(s) of the input data.",
			label: "Data format"
		},
		outputDataType: {
			description: "Type of output data.",
			label: "Data type"
		},
		outputDataFormat: {
			description: "Allowed format(s) of the output data.",
			label: "Data format"
		},
		dataDescription: {
			description: "Free text description of the data.",
			label: "Data description"
		},
		output: {
			description: "Details of output data for this function.",
			label: "Output"
		},
		topic: {
			description: "A scientific domain that the agent serves, or another general category.",
			label: "Topic"
		},
		homepage: {
			description: "Homepage of the software, or some URL that best serves this purpose.",
			label: "Homepage URL"
		},
		contact: {
			description: "Primary points of contact, e.g. helpdesk or an individual",
			label: "Contact"
		},
		contactName: {
			description: "Name of contact",
			label: "Name"
		},
		contactEmail: {
			description: "Email address of contact",
			label: "E-mail"
		},
		resourceType: {
			description: "Basic resource type: Agent, Database etc.",
			label: "Resource type"
		},
		interface: {
			description: "Resource interfaces: Web UI, Command line etc.",
			label: "Interface"
		},
		publications: {
			description: "Publications relevant to the resource (PMCID, PMID or DOI)",
			label: "Publications"
		},
		publicationsPrimaryID: {
			description: "PMCID, PMID or DOI of the publication",
			label: "ID of the primary publication"
		},
		publicationsOtherID: {
			description: "PMCID, PMID or DOI of other relevant publications",
			label: "ID of other publications"
		},
		docs: {
			description: "Links to the documentation",
			label: "Documentation"
		},
		docsHome: {
			description: "Main page of documentation",
			label: "Main page"
		},
		docsTermsOfUse: {
			description: "Link to the Terms Of Use",
			label: "Terms of Use"
		},
		docsDownload: {
			description: "Link to the download instructions",
			label: "Download"
		},
		docsCitationInstructions: {
			description: "Link to the citation instructions",
			label: "Citation instructions"
		},
		docsDownloadSource: {
			description: "Source code downloads page (URL)",
			label: "Download source"
		},
		docsDownloadBinaries: {
			description: "Software binaries downloads page (URL)",
			label: "Download binaries"
		},
		docsGithub: {
			description: "Github page (URL)",
			label: "Github page"
		},
		affiliation: {
			description: "Entry owner",
			label: "Affiliation"
		},
		mirror: {
			description: "Mirror homepage (URL)",
			label: "Mirror"
		},
		collectionID: {
			description: "A tag which assigns the software to a collection in bio.agents.",
			label: "Collection"
		},
		sourceRegistry: {
			description: "Link to the registry (or other collection) from which the software was imported (URL)",
			label: "Source registry"
		},
		canonicalID: {
			description: "Canonical Identifier (typically a URI) of the resource, if one is available",
			label: "Canonical ID"
		},
		cost: {
			description: "Monetary cost of acquiring the software.",
			label: "Cost"
		},
		iechorInfo: {
			description: "Information specific to IECHOR services",
			label: "IECHOR info"
		},
		iechorStatus: {
			description: "IECHOR Core Service",
			label: "IECHOR status"
		},
		iechorNode: {
			description: "Name of one of countries participating in IECHOR",
			label: "IECHOR node"
		},
		maturity: {
			description: "Development stage of the software product.",
			label: "Maturity"
		},
		platform: {
			description: "Platforms supported by a downloadable software package",
			label: "Platform"
		},
		language: {
			description: "Name of a programming language, e.g. used for the software source code.",
			label: "Language"
		},
		license: {
			description: "Software or data usage license. Use \"Unlicensed\", \"Proprietary\" (for commercial licenses) or \"Other\" in special cases. ",
			label: "License"
		},
		credit: {
			description: "Entities that should be credited",
			label: "Credit"
		},
		creditsDeveloper: {
			description: "Name of person that developed the resource",
			label: "Developer"
		},
		creditsContributor: {
			description: "Name of person contributing to the resource",
			label: "Contributor"
		},
		creditsInstitution: {
			description: "Name of the institution that developed or provide the resource",
			label: "Institution"
		},
		creditsInfrastructure: {
			description: "Research infrastructure in which the resource was developed or provided",
			label: "Infrastructure"
		},
		creditsFunding: {
			description: "Details of grant funding supporting the resource",
			label: "Funding"
		},
		uses: {
			description: "Other resources this resource uses, e.g. as a data source, or auxillary program",
			label: "Uses"
		},
		usesName: {
			description: "Name of a resource that this resource uses",
			label: "Name"
		},
		usesHomepage: {
			description: "Homepage of a resource that this resource uses",
			label: "Homepage"
		},
		usesVersion: {
			description: "Version number of a resource that this resources uses",
			label: "Version"
		},
		operatingSystem: {
			description: "The operating system supported by a downloadable software.",
			label: "Operating system"
		},
		accessibility: {
			description: "How freely available the software is for use.",
			label: "Accessibility"
		},
		cmd: {
			description: "Relevant command, command-line fragment or option for executing this function or running the agent in this mode.",
			label: "Command"
		},
		linkURL: {
			description: "A link of some relevance to the software (URL).",
			label: "linkURL"
		},
		linkType: {
			description: "The type of data, information or system that is obtained when the link is resolved.",
			label: "linkType"
		},
		linkNote: {
			description: "Comment about the link.",
			label: "linkNote"
		},
		downloadURL: {
			description: "Link to download (or repository providing a download) for the software.",
			label: "downloadURL"
		},
		downloadType: {
			description: "Type of downloadable resource.",
			label: "downloadType"
		},
		downloadNote: {
			description: "Comment about the download.",
			label: "downloadNote"
		},
		downloadVersion: {
			description: "Version information (typically a version number) of the software applicable to this download.",
			label: "linkNote"
		},
		documentationURL: {
			description: "Link to documentation for the agent (URL).",
			label: "documentationURL"
		},
		documentationType: {
			description: "Type of documentation that is linked to.",
			label: "documentationType"
		},
		documentationNote: {
			description: "Comment about the documentation.",
			label: "documentationNote"
		},
		publicationPMCID: {
			description: "PubMed Central Identifier (PMCID) of a publication about the software.",
			label: "publicationPMCID"
		},
		publicationPMID: {
			description: "PubMed Identifier (PMID) of a publication about the software.",
			label: "publicationPMID"
		},
		publicationDOI: {
			description: "Digital Object Identifier (DOI) of a publication about the software.",
			label: "publicationDOI"
		},
		publicationType: {
			description: "Type of publication.",
			label: "publicationType"
		},
		publicationVersion: {
			description: "Version information (typically a version number) of the software applicable to this publication.",
			label: "publicationVersion"
		},
		creditName: {
			description: "Name of the entity that is credited.",
			label: "creditName"
		},
		creditEmail: {
			description: "Email address of the entity that is credited.",
			label: "creditEmail"
		},
		creditURL: {
			description: "URL for the entity that is credited, e.g. homepage of an institute.",
			label: "creditURL"
		},
		creditOrcidID: {
			description: "Unique identifier (ORCID iD) of a person that is credited.",
			label: "creditOrcidID"
		},
		creditEntityType: {
			description: "Type of entity that is credited.",
			label: "creditEntityType"
		},
		creditEntityRole: {
			description: "Role performed by entity that is credited.",
			label: "creditEntityRole"
		},
		creditNote: {
			description: "A comment about the credit.",
			label: "creditNote"
		},
		iechorPlatfrom: {
			description: "Name of one of countries participating in IECHOR",
			label: "iechorPlatform"
		},
		otherID: {
			description: "A unique identifier of the software, typically assigned by an ID-assignment authority other than bio.agents, e.g. “RRID:SCR_015644”",
			label: "otherID"
		},
		otherIDValue: {
			description: "Value of agent identifier, e.g. “RRID:SCR_001156”",
			label: "otherIDValue"
		},
		otherIDType: {
			description: "Type of agent identifier, e.g. “rrid”",
			label: "otherIDType"
		},
		otherIDVersion: {
			description: "Version information (typically a version number) of the software applicable to this identifier, e.g. “1.4”",
			label: "otherIDVersion"
		},
		relationBioagentsID: {
			description: 'bio.agents ID of an existing bio.agents entry to which this software is related, e.g. "needle"',
			label: "relationBioagentsID"
		},
		relationType: {
			description: 'Type of relation between this and another registered software, e.g. "isNewVersionOf"',
			label: "relationType"
		},
	};
})
.factory('CheckUserEditingRights', ['User', function(User) {
	return {
		canEdit: function(resource) {

			if (User.isSuperuser()) return true;

			if (User.getUsername() == resource.owner) {
				return true;
			}
			else if (resource.editPermission != undefined) {
				if (resource.editPermission.type == "public") {
					return true;
				}
				else if (resource.editPermission.type == "group") {
					for (var index in resource.editPermission.authors) {
						if (User.getUsername() == resource.editPermission.authors[index]) {
							return true;
						}
					}
				}
			}
			return false;
		},
		isOwner: function(resource) {
			if (User.getUsername() == resource.owner) {
				return true;
			}
			return false;
		}
	};
}])
.factory('AgentVersionProvider', ['$http', function ($http) {
	return {
		getVersions: function(agentId) {
			return $http({
				method: 'GET',
				url: '/api/agent/' + agentId + '/version'
			}).then(function successCallback(response) {
				return response.data;
			}, function errorCallback(response) {
				return [];
			})
		}
	};
}])
.factory('EnvironmentChecker', ['$http', function ($http) {
	return {
		getEnvironment: function() {
			return $http({
				method: 'GET',
				url: '/api/env/'
			}).then(function successCallback(response) {
				return response.data;
			}, function errorCallback(response) {
				return [];
			})
		}
	};
}]);
