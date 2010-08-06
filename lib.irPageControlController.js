//	iridia.pageControlController.js
//	Evadne Wu at Iridia, 2010





	window.iridia = (window && window.iridia || {});
	
	
	
	
	
	
	
	
	
	
	iridia.pageControlController = new JS.Class({
	
		extend: {
		
			delegateProtocol: new JS.Interface([
			
				/* (Boolean) */ "pageControlShouldShowPage",
				/* (void) */ "pageControlDidShowPage"
			
			])
		
		},
	
		include: JS.Delegatable,
		
		"initialize": function (inOptions, inDelegate) {
		
			this.options = $.extend(jQuery.kDeepCopyEnabled, {
			
				manifestObject: undefined,
				manifestObjectChildrenSelectorString: "li",
				manifestObjectChildrenActiveCSSClass: "active",
				
				totalPages: 0,
				currentPageIndex: 0,
				hoverredPageIndex: null
			
			}, inOptions);
			
			this.generateManifestObjectChildren();
		
		},
		
		
		
		
		
		"setCurrentPage": function (inPageIndexToMakeCurrent) {
		
			if (typeof inPageIndexToMakeCurrent != "number") return;
			
			this.representingObjectForPageIndex(this.options.currentPageIndex).removeClass(
			
				this.options.manifestObjectChildrenActiveCSSClass
			
			);
			
			if (inPageIndexToMakeCurrent > this.options.totalPages)
			this.setTotalPages(inPageIndexToMakeCurrent + 1);
			
			this.options.currentPageIndex = inPageIndexToMakeCurrent;
			
			this.representingObjectForPageIndex(this.options.currentPageIndex).addClass(
			
				this.options.manifestObjectChildrenActiveCSSClass
			
			);
		
		},
		
		
		
		
		
		"setTotalPages": function (inTotalPagesCount) {
		
			if (typeof inTotalPagesCount != "number") return;
		
			this.options.totalPages = inTotalPagesCount;	
			this.generateManifestObjectChildren();
		
			//	Current page out of bounds?
			
			if (this.options.currentPageIndex > this.options.totalPages)
			this.setCurrentPage(null);
		
		},
		
		
		
		
		
		//! 
		//!	DOM Helper
		
		representingObjectForPageIndex: function (inIndex) {
		
			return this.options.manifestObject.children(
			
				this.options.manifestObjectChildrenSelectorString
			
			).eq(inIndex);
		
		},
		
		generateManifestObjectChildren: function () {	
		
			if ((this.options.manifestObject == undefined) || (this.options.manifestObject.length == 0))
			return mono.error("The manifest object does not even exist for the childrens to be generated.  Bailing!");
			
			this.options.manifestObject.empty();
			
			var i = this.options.totalPages; while(i--) {
			
				var childrenObject = $(["<", this.options.manifestObjectChildrenSelectorString, "/>"].join(""));
				
				var thisObject = this;
				
				childrenObject
				.hover(function (event) {
				
					thisObject.handleManifestObjectChildrenMouseOver.call(thisObject, event)
				
				}, function (event) {
				
					thisObject.handleManifestObjectChildrenMouseOut.call(thisObject, event)
				
				}).prependTo(thisObject.options.manifestObject);
			
			}
		
		},
		
		handleManifestObjectChildrenMouseOver: function (event) {
		
			mono.log("handleManifestObjectChildrenMouseOver called.");
		
		},
		
		handleManifestObjectChildrenMouseOut: function (event) {
		
			mono.log("handleManifestObjectChildrenMouseOut called.");
		
		}
	
	});
	
	
	
	
	