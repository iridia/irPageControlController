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
			
			this.generateManifestObjectChildrens();
		
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
		
			if (inTotalPagesCount != this.options.totalPages)
			this.options.manifestObject.empty()
		
			this.options.totalPages = inTotalPageCount;
			
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
		
		generateManifestObjectChildrens: function () {		
		
			if ((this.options.manifestObject == undefined) || (this.options.manifestObject.length == 0))
			return mono.error("The manifest object does not even exist for the childrens to be generated.  Bailing!");
			
			this.options.manifestObject.empty();
			
			var i = this.options.totalPages; while(i--) {
			
				this.options.manifestObject.prepend(
				
					$(["<", this.options.manifestObjectChildrenSelectorString, "/>"].join(""))
				
				);
			
			}
		
		}
	
	});
	
	
	
	
	