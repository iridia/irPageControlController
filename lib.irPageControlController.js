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
		
		
		
		
		
		"setCurrentPageIndex": function (inPageIndexToMakeCurrent) {
		
			this.representingObjectForPageIndex(this.options.currentPageIndex).removeClass(
			
				this.options.manifestObjectChildrenActiveCSSClass
			
			);
		
			if (typeof inPageIndexToMakeCurrent != "number") return;
			
			if ((inPageIndexToMakeCurrent + 1) > this.options.totalPages)
			this.setTotalPages(inPageIndexToMakeCurrent + 1);
			
			this.options.currentPageIndex = inPageIndexToMakeCurrent;
			
			this.representingObjectForPageIndex(this.options.currentPageIndex).addClass(
			
				this.options.manifestObjectChildrenActiveCSSClass
			
			);
		
		},
		
		
		
		
		
		"setTotalPages": function (inTotalPagesCount, inOptions) {
		
			if (typeof inTotalPagesCount != "number") return;
			
			var options = $.extend(true, {
			
				animate: false
				
			}, inOptions);
		
			this.options.totalPages = inTotalPagesCount;
		
		
		//	Current page out of bounds?
			
			if (this.options.currentPageIndex > this.options.totalPages)
			this.setCurrentPage(null);
		
		
		//	Animate the changes, or not
				
			var animateDuration = (options.animate) ? 250 : 0;
			var thisObject = this;
			
			this.options.manifestObject.animate({
			
				opacity: 0
			
			}, animateDuration, function () {
			
				thisObject.generateManifestObjectChildren();
			
				$(this).animate({
				
					opacity: 1
					
				}, animateDuration);
			
			});
		
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
				
				}).click(function (event) {
				
					thisObject.handleManifestObjectChildrenClick.call(thisObject, event)
				
				}).prependTo(thisObject.options.manifestObject);
			
			}
		
		},
		
		handleManifestObjectChildrenClick: function (event) {
		
			mono.log("handleManifestObjectChildrenClick called.", this, this.hash());
		
		},
		
		handleManifestObjectChildrenMouseOver: function (event) {
		
			mono.log("handleManifestObjectChildrenMouseOver called.");
		
		},
		
		handleManifestObjectChildrenMouseOut: function (event) {
		
			mono.log("handleManifestObjectChildrenMouseOut called.");
		
		}
	
	});
	
	
	
	
	