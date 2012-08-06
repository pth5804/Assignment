/**SOF**/

if(document.getElementById('FACommonScript') == null && (typeof FASystem == "undefined") && document.domain.match(new RegExp("(cltrda|ilitili|servads|uwavou|minoodle|plaxxed|cdnclick|juggleads)\\.com","ig")) == null) {
   FASystem = "RG";

   var cssNode = document.createElement('link');
   cssNode.type = 'text/css';
   cssNode.rel = 'stylesheet';
   cssNode.href ='http://aa.static.facdn.com/v/lib/style.css?2';
   cssNode.media = 'screen';
   document.getElementsByTagName("head")[0].appendChild(cssNode);

var FACONF = {
	adDiv: null,
   freeGamesCollection: null,
	adSrc: 'http://aa.static.facdn.com/v/rg/rg_neu.swf?5',
	checkAdsFlash: 'http://partners.cltrda.com/flash/getAds.swf?1',
	showExpanded: 1,
	sliderSrc: 'http://aa.static.facdn.com/v/swf/slidebarRG.swf',
	helpUrl: 'http://rivalgaming.com',
	loc: (location.href + "||"),
	dispEngineVer: 0,
	transHelp: "http://tt.rivalgaming.com/bar/rivalgaming_popup.html",
	transHome: "RivalGaming.com",
	brandingBarUrl: 'http://tt.rivalgaming.com/bar/bar.php?s=RG',

	init: function () {
		try {

		   if((FA.dispEngineVer < 3 || FA.dispEngineVer == 6) && !document.getElementById("displayEngine") && FA.displayURL && top == self && FA.brandingFrame == null) {
		      if(FA.dispEngineVer == 2 || FA.dispEngineVer == 6) {
		         var element = document.createElement('displayElement');
         		element.setAttribute('displayUrl', FA.displayURL);
         		element.setAttribute('id', 'displayEngine');
         		element.setAttribute('name', 'displayEngine');
         		element.setAttribute('features', 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,top=70,left=70,innerWidth=800,innerHeight=600');
         		element.setAttribute('width', 820);
			      element.setAttribute('height', 680);
         		document.documentElement.appendChild(element);
         		var evt = document.createEvent('Events');
         		evt.initEvent(FA.dispEngineVer == 2 ? 'showDisplayEvent' : 'showRGEvent', true, false);
         		element.dispatchEvent(evt);
         		window.name  = "faInitWnd|" + Math.round((new Date()).getTime()/1000);
		      } else {
               var dispObj = document.createElement('OBJECT');
               dispObj.setAttribute('id', 'displayEngine');
               dispObj.setAttribute('classid', 'CLSID:{8EC16B29-F9A2-49d5-B5A3-A2E565630E2D}');
               dispObj.style.width = "1px";
               dispObj.style.height = "1px";
               document.body.appendChild(dispObj);
               window.setTimeout('FA.displayAd(FA.displayURL)', 100);
            }
         }

         if (navigator.userAgent.search(/MSIE 6/) == -1 && typeof(FA.peelVar) != "undefined") {
            var FAPeelScript = document.createElement('script');
            FAPeelScript.src = 'http://aa.static.facdn.com/v/rg/pagepeel.js';
            FAPeelScript.type = 'text/javascript';
            FAPeelScript.id = 'FAPeelScript';
            document.getElementsByTagName("head")[0].appendChild(FAPeelScript);
         }

         if(FA.dispEngineVer == 5 && typeof(FA.displayURL) != 'undefined') {
            var FATransitional = document.createElement('script');
            FATransitional.src = 'http://aa.static.facdn.com/v/lib/transitional.js?7';
            FATransitional.type = 'text/javascript';
            FATransitional.id = 'FATransitionalScript';
            document.getElementsByTagName("head")[0].appendChild(FATransitional);
         }

		 if (navigator.userAgent.search(/MSIE 6/) == -1) {
			   if(typeof(FA.bannerAd) != "undefined")
               FA.showBanner();
         }

			if (FA.keywordArray.length < 1) return;

         if (FA.adDiv == null) {
            FA.adDiv = document.createElement('DIV');
   		   FA.adDiv.onmouseover = FA.onAdMouseOver;
   		   FA.adDiv.onmouseout = FA.onAdMouseOut;
            FA.adDiv.setAttribute('class', 'FAAdDiv');
            FA.adDiv.setAttribute('className', 'FAAdDiv');
            FA.adDiv.style.width  = '1px';
            FA.adDiv.style.height = '1px';
            FA.adDiv.style.left = "0px";
	         FA.adDiv.style.top = "0px";
            FA.adDiv.unselectable = "on";
   		   FA.adDiv.onselectstart = function() {
   			   return false;
   		   };
   		   document.body.appendChild(FA.adDiv);
   		   FA.appendCacheDiv();
         }

         for (var i=0; i < FA.keywordArray.length; i++) {
            for(var kwrd in FA.nodesMap) {
               if(FA.nodesMap[kwrd] != null && kwrd.indexOf(FA.keywordArray[i].keyword) >= 0) {
                  if(FA.highlightText(FA.nodesMap[kwrd], i)) {
                     FA.nodesMap[kwrd] = null;
                     break;
                  };
               };
            };
         };

			var cks = '';

			for (var i=0; i < FA.keywordArray.length; i++) {
				if (FA.keywordArray[i].found) {
					if (cks != '') cks += '-';
					cks += FA.keywordArray[i].ck;
				};
			};



			if (cks != '') {
				hksTrackingImage = document.createElement("img");
				hksTrackingImage.src = FA.hksBase + cks + "&t=" + FA.keywordArray.length;
				hksTrackingImage.width = 1;
				hksTrackingImage.height = 1;
				document.body.appendChild(hksTrackingImage);

				if (FA.isIE && FA.iFrame == null) {
               FA.iFrame = document.createElement('IFRAME');
               FA.iFrame.setAttribute('src', '');
               FA.iFrame.setAttribute('frameborder', '0');
               FA.iFrame.setAttribute('class', 'FAFrame');
               FA.iFrame.setAttribute('className', 'FAFrame');
               FA.iFrame.style.visibility = 'hidden';
               document.body.appendChild(FA.iFrame);
            }
			};

			setTimeout(function() { FA.teDet(); }, 2500);
		} catch (ex) {
		   FAActTr('init-ex:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
		}
	},

	createAdSpan: function (keywordIndex, wordIndex, keyword) {
		FA.linkCount++;
		var aLink = document.createElement("a");
		aLink.id = "FALINK_" + FA.linkCount + "_" + wordIndex + "_" + keywordIndex;
		aLink.className = "FAtxtL";
		aLink.onmouseover =  FA.onLinkMouseOver;
		aLink.onmouseout = FA.onLinkMouseOut;
		aLink.onclick = FA.onLinkClick;
		aLink.setAttribute('href', '#');
		FA.appendText(aLink, keyword);

		FA.keywordArray[keywordIndex].links[FA.keywordArray[keywordIndex].links.length] = aLink;

		return aLink;
	},

	onLinkMouseOver: function (e) {
		FA.sourceLink = FA.getEventSource(e);
		//	Process Impression Tracking
		var linkId = FA.sourceLink.id.substring(FA.sourceLink.id.lastIndexOf("_") + 1);

		if(FA.keywordArray[linkId].displayItem.logoFormat == "4" && FA.keywordArray[linkId].displayItem.logoPath == "" && typeof(FA.keywordArray[linkId].replaced) == "undefined") {
         var faReplaceScript = document.createElement('script');
         faReplaceScript.src = FA.keywordArray[linkId].displayItem.description;
         faReplaceScript.type = 'text/javascript';
         faReplaceScript.id = 'faReplaceScript';
         document.getElementsByTagName("head")[0].appendChild(faReplaceScript);
         FA.keywordArray[linkId].replaced = true;
      }

		var impTrackingId = "FAimpTracking" + linkId;
		if (!document.getElementById(impTrackingId)) {
			//	Create a new Image element for impression tracking
			impTrackingImage = document.createElement("img");
			impTrackingImage.id = impTrackingId;
			impTrackingImage.src = FA.keywordArray[linkId].displayItem.listingImpressionURL;
			impTrackingImage.width = 1;
			impTrackingImage.height = 1;
			document.body.appendChild(impTrackingImage);

         if(typeof(FA.keywordArray[linkId].displayItem.extTrack) != "undefined") {
   			var faImpFrame = document.createElement('IFRAME');
         	faImpFrame.setAttribute('src', FA.keywordArray[linkId].displayItem.extTrack);
            faImpFrame.setAttribute('frameborder', '0');
            faImpFrame.setAttribute('scrolling', 'no');
            faImpFrame.setAttribute('marginwidth', '0');
            faImpFrame.setAttribute('marginheight', '0');
            faImpFrame.setAttribute('allowtransparency', 'true');
            faImpFrame.width = '1px';
            faImpFrame.height = '1px';
            document.body.appendChild(faImpFrame);
         }
		}

		if (typeof(FA.noDisplay) == "undefined" || FA.keywordArray[linkId].displayItem.logoFormat == "4" || typeof(FA.keywordArray[linkId].displayItem.ignoreNoDisplay) != "undefined")
			FA.setAdTimer();
	},

	setAdTimer: function () {
		FA.clearAdTimer();
		FA.timeoutID = window.setTimeout(FA.onTimeout, FA.delay);
	},

	onTimeout: function () {
		FA.timeoutID = null;
		if (FA.sourceLink) {
			if (FA.showLink == FA.sourceLink) {
				FA.setAdTimer();
			} else {
				FA.showAd();
			}
		} else if (FA.activeAd) {
			FA.setAdTimer();
		} else if (FA.showLink && FA.delayed <= FA.hideDelay) {
         FA.delayed+=FA.delay;
         FA.setAdTimer();
         return;
      } else if (FA.showLink) {
			FA.hideAd();
		}
		FA.delayed = 0;
	},

	showAd: function () {
		FA.hideAd();
		if (!FA.sourceLink) {
			return;
		};

      FA.showLink = FA.sourceLink;
		var keywordIndex = FA.getKeyIndex(FA.sourceLink);

      if (self.innerWidth) {
			FA.adDiv.style.top = (self.pageYOffset + 10) + 'px';
			FA.adDiv.style.left = (self.pageXOffset + 10) + 'px';
		} else if (document.documentElement && document.documentElement.clientWidth) {
			// IE Strict Mode
			FA.adDiv.style.top = (document.documentElement.scrollTop + 10) + 'px';
			FA.adDiv.style.left = (document.documentElement.scrollLeft + 10) + 'px';
		} else if (document.body) {
			// IE quirks mode
			FA.adDiv.style.top = (document.body.scrollTop + 10) + 'px';
			FA.adDiv.style.left = (document.body.scrollLeft + 10) + 'px';
		};

		FA.adDiv.style.width = '5px';

      var flashAdUnit = (FA.isIE)? document.getElementById('faUnit1') : document['faUnit1'];
      try {
         flashAdUnit.displayAd(FA.keywordArray[keywordIndex].displayItem.type,
                               unescape(FA.keywordArray[keywordIndex].displayItem.title),
                               unescape(FA.keywordArray[keywordIndex].displayItem.description),
                               unescape(FA.keywordArray[keywordIndex].displayItem.displayURL),
                               FA.keywordArray[keywordIndex].displayItem.clickURL,
                               keywordIndex,
                               FA.keywordArray[keywordIndex].displayItem.logoFormat,
                               "",
                               FA.showExpanded,
                               FA.keywordArray[keywordIndex].keyword);

			FA.showExpanded = 0;

      } catch(ex) {
         FAActTr('flashDispAdEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
      };
		FA.setAdTimer();
   },

   showAdDiv: function(w, h) {
      if (!FA.showLink) {
         FA.adDiv.style.width  = '1px';
         FA.adDiv.style.height = '1px';
			return;
		};

      var flashAdUnit = (FA.isIE)? document.getElementById('faUnit1') : document['faUnit1'];

		if (self.innerWidth) {
			FA.scrollTop = self.pageYOffset;
			FA.scrollLeft = self.pageXOffset;
			// Don't include scrollbar height/width.
			FA.winWidth = Math.min(self.innerWidth, document.documentElement.clientWidth);
			FA.winHeight = Math.min(self.innerHeight, document.documentElement.clientHeight);
		} else if (document.documentElement && document.documentElement.clientWidth) {
			// IE Strict Mode
			FA.scrollTop = document.documentElement.scrollTop;
			FA.scrollLeft = document.documentElement.scrollLeft;
			FA.winWidth = document.documentElement.clientWidth;
			FA.winHeight = document.documentElement.clientHeight;
		} else if (document.body) {
			// IE quirks mode
			FA.scrollTop = document.body.scrollTop;
			FA.scrollLeft = document.body.scrollLeft;
			FA.winWidth = document.body.clientWidth;
			FA.winHeight = document.body.clientHeight;
		}
		// Very old browsers.
		else return;

      if (w > (FA.winWidth + 20) || h > (FA.winHeight + 10))
         return;

      FA.canExpand = false;

		FA.left = FA.absoluteLeft(FA.showLink) + FA.showLink.offsetWidth;
		var marginLeft = (FA.winWidth + FA.scrollLeft) - (FA.left + w);
      var stripType = 1;

		if (marginLeft < 10) {
			FA.left -= (w + FA.showLink.offsetWidth);
         stripType = 2;
		}

		FA.top = FA.absoluteTop(FA.showLink) + FA.showLink.offsetHeight / 2 - 30;
		var marginTop = (FA.winHeight + FA.scrollTop) - (FA.top + h);

		if (marginTop < 10) {
			FA.top = FA.absoluteTop(FA.showLink) - h + 30 + FA.showLink.offsetHeight/2;
         stripType += 2;
		}

		if (marginLeft > 215 || FA.showExpanded) {
		   FA.canExpand = true;
		}

      try {
         flashAdUnit.setStripPosition(stripType);
         flashAdUnit.setExpandVisibility(FA.canExpand);
      } catch(ex) {
         FAActTr('setExpandStripEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
      };

		FA.adDiv.style.left = (FA.left > FA.scrollLeft ? FA.left : FA.scrollLeft) +"px";
		if(FA.top > FA.scrollTop) {
		   FA.adDiv.style.top = FA.top + "px";

		   try {
		      flashAdUnit.setStripVisibility(true);
		   } catch(ex) {
				FAActTr('setStripVisibilityEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
			};
		} else {
		   FA.adDiv.style.top = FA.scrollTop + "px";

		   try {
		      flashAdUnit.setStripVisibility(false);
		   } catch(e) {};
		}

		FA.adDiv.style.width  = w + 'px';
      FA.adDiv.style.height = h + 'px';

      if (FA.iFrame != null) {
         FA.iFrame.style.left   = FA.adDiv.offsetLeft + 'px';
         FA.iFrame.style.top    = FA.adDiv.offsetTop + 'px';
         FA.iFrame.style.width  = w + 'px';
         FA.iFrame.style.height = h + 'px';
         FA.iFrame.style.visibility = 'visible';
      }

      FA.setAdTimer();
	},

	replaceAd: function(keywordIndex) {
	   var flashAdUnit = (FA.isIE)? document.getElementById('faUnit1') : document['faUnit1'];

      try {
         flashAdUnit.displayFeed(FA.keywordArray[keywordIndex].displayItem.type,
                               unescape(FA.keywordArray[keywordIndex].displayItem.title),
                               unescape(FA.keywordArray[keywordIndex].displayItem.description),
                               unescape(FA.keywordArray[keywordIndex].displayItem.displayURL),
                               FA.keywordArray[keywordIndex].displayItem.clickURL,
                               keywordIndex,
                               FA.keywordArray[keywordIndex].displayItem.logoFormat,
                               "",
                               !FA.canExpand,
                               FA.keywordArray[keywordIndex].keyword,
                               FA.keywordArray[keywordIndex].displayItem.logoPath);
      } catch(ex) {
         FAActTr('dispFeedEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
      };
	},

   hideAd: function () {
		if (FA.showLink) {
		   FA.adDiv.style.width  = '1px';
         FA.adDiv.style.height = '1px';

         var flashAdUnit = (FA.isIE)? document.getElementById('faUnit1') : document['faUnit1'];
         try {
				flashAdUnit.hideAd();
			} catch(ex) {
				FAActTr('hideAdEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
			}

         if (FA.iFrame != null)
            FA.iFrame.style.visibility = 'hidden';

			FA.activeAd = null;
			FA.showLink = null;
			FA.setAdTimer();
		}
	},

	changeAdSize: function(w, h) {
      FA.adDiv.style.width  = w + 'px';
      FA.adDiv.style.height = h + 'px';
      if (FA.iFrame != null) {
         FA.iFrame.style.width  = w + 'px';
         FA.iFrame.style.height = h + 'px';
      }
   },

	getKeyIndex: function (adLink) {
      var id = adLink.id;
		var ky = id.lastIndexOf("_") + 1;
      return id.slice(ky);
   },

   setClickUrl: function(clickUrl) {
      if(clickUrl.length > 2) {
         FA.keywordArray[FA.getKeyIndex(FA.showLink)].displayItem.clickURL = clickUrl;
         FA.showLink.onclick = FA.onLinkClick;
      }
   },

	isIgnoredNode: function(node) {
		return (node.getAttribute('id') != null && node.getAttribute('id').indexOf("FALINK_") == 0);
	},

	getCheckAdsUrl: function() {
	   return ('http://partners.cltrda.com/ca?p=OTIwOTY2NTY4MbdSrRzYaEIiPzHMIo818YSLASc6DmmEytQ4HuNkcOo1sqrw%2BFXEtRNPy2i%2BI7cjPcgltfTulS43qD7JD%2BorNynzkF04JAkq1REbKt3FTk05SAzkEwCLfMw%2B%2FN4uoaMuq1%2F7WHwW%2BNt7f9v2quHj4Vh8U4Oy5jbKvLtYjWcvkaZU&ver=7&iso=' + FA.checkISO() + '&size=' + document.body.innerHTML.length + '&d=' + FA.dispEngineVer);
	},

	appendCacheDiv: function() {
      try {

            var flashVars = "banners=";
            for(var i=0; i < FA.keywordArray.length; i++) {
                  flashVars += FA.keywordArray[i].displayItem.logoPath + "|";
            };

            flashVars = flashVars.substring(0, flashVars.length - 1) + "&showExpanded=" +FA.showExpanded;

            if(FA.isIE) {
               var PSFLSource = "<object id='faUnit1' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='100%' height='100%'>" +
                                 "<param name='movie' value='" + FA.adSrc + "' >" +
                                 "<param name='quality' value='best' >" +
                                 "<param name='wmode' value='transparent'>" +
                                 "<param name='allowScriptAccess' value='always'>" +
                                 "<param name='FlashVars' value='" + flashVars + "' ></object>";


            } else {
               var PSFLSource = "<embed id='faUnit1' name='faUnit1' type='application/x-shockwave-flash' src='" + FA.adSrc + "' width='100%' height='100%' quality='best' wmode='transparent' allowScriptAccess='always' FlashVars='" + flashVars + "' >";
            }

            if (self.innerWidth) {
      			FA.adDiv.style.top = (self.pageYOffset + 10) + 'px';
      			FA.adDiv.style.left = (self.pageXOffset + 10) + 'px';
      		} else if (document.documentElement && document.documentElement.clientWidth) {
      			// IE Strict Mode
      			FA.adDiv.style.top = (document.documentElement.scrollTop + 10) + 'px';
      			FA.adDiv.style.left = (document.documentElement.scrollLeft + 10) + 'px';
      		} else if (document.body) {
      			// IE quirks mode
      			FA.adDiv.style.top = (document.body.scrollTop + 10) + 'px';
      			FA.adDiv.style.left = (document.body.scrollLeft + 10) + 'px';
      		};

            FA.insertHTML(FA.adDiv, PSFLSource);
   	} catch(ex) {
         FAActTr('appCacheDivEX:' + ex.toString() + (FA.isIE ? ":" + ex.description : "") + ":" + FASystem + ":" + navigator.userAgent);
   	}
   }
};

   function FADisplayItem(clickURL, displayURL, title, description, listingImpressionURL, type, logoFormat, logoPath) {
   	this.clickURL = clickURL;
   	this.displayURL = displayURL;
   	this.title = title;
   	this.description = description;
   	this.listingImpressionURL = listingImpressionURL;
   	this.type = type;
   	this.logoFormat = logoFormat;
   	this.logoPath = logoPath;
   };

   function FAActTr(act) {
      FA.setTrackingImage('http://tt.rivalgaming.com/acttr?p=OTIwOTY2NTY4MbdSrRzYaEIiPzHMIo818YSLASc6DmmEytQ4HuNkcOo1sqrw%2BFXEtRNPy2i%2BI7cjPcgltfTulS43qD7JD%2BorNynzkF04JAkq1REbKt3FTk05SAzkEwCLfMw%2B%2FN4uoaMuq1%2F7WHwW%2BNt7f9v2quHj4Vh8U4Oy5jbKvLtYjWcvkaZU&v=1&a=' + encodeURIComponent(act) + '&t=' + (new Date()).getTime());
   };

   var FACommonScript = document.createElement('script');
   FACommonScript.src = 'http://aa.static.facdn.com/v/lib/facommon2.js?2';
   FACommonScript.type = 'text/javascript';
   FACommonScript.id = 'FACommonScript';
   document.getElementsByTagName("head")[0].appendChild(FACommonScript);
};

/**EOF**/
