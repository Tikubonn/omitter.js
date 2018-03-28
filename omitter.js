/* 
	Copyright (c) 2018 tikubonn.
	Released under the MIT license 
	http://opensource.org/licenses/mitlicense.php 
*/

function OmitterDom (dom, count, ellipsis){
	this.dom = dom;
	this.domContent = dom.innerText;
	this.ellipsis = null;
	this.ellipsisContent = ellipsis;
	this.ellipsisWidth = null;
	this.charactors = null;
	this.charactorsWidth = null;
	this.charactorHeights = null;
	this.charactorLefts = null;
	this.charactorTops = null;
	this.root = null;
	this.maxTop = null;
	this.maxHeight = null;
	this.count = count;
	this.init();
}

OmitterDom.prototype.init1 = function (){
	var i = this.dom.childNodes.length -1;
	while (-1 < i){
		this.dom.removeChild(
			this.dom.childNodes[i]);
		i = (i-1)|0;
	}
};

OmitterDom.prototype.init2 = function (){

	var root = document.createElement("div");
	root.classList.add("omitter");
	
	var charactors = document.createElement("div");
	charactors.classList.add("omitter-charactors");
	var charactorsFragment = document.createDocumentFragment();
	
	var i = 0;
	var is = this.domContent.length;
	while (i < is){
		var charactor = document.createElement("span");
		var charactorContent = document.createTextNode(this.domContent[i]);
		charactor.appendChild(charactorContent);
		charactor.classList.add("omitter-charactor");
		charactorsFragment.appendChild(charactor);
		i = (i+1)|0;
	}
	
	if (this.ellipsisContent && 
			this.ellipsisContent.length){
		var ellipsis = document.createElement("span");
		var ellipsisContent = document.createTextNode(this.ellipsisContent);
		ellipsis.appendChild(ellipsisContent);
		ellipsis.classList.add("omitter-ellipsis");
		root.appendChild(ellipsis);
		this.ellipsis = ellipsis;
	}

	charactors.appendChild(charactorsFragment);
	this.charactors = charactors;
	
	root.appendChild(charactors);
	this.dom.appendChild(root);
	this.root = root;
	
};

OmitterDom.prototype.init = function (){
	this.init1();
	this.init2();
};

OmitterDom.prototype.omit1 = function (){
	
	var ellipsisWidth = this.ellipsis.offsetWidth;
	var charactorsWidth = this.charactors.offsetWidth;
	var charactorHeights = new Array();
	var charactorLefts = new Array();
	var charactorTops = new Array();
	
	var i = 0;
	var is = this.charactors.childNodes.length;
	while (i < is){
		charactorHeights.push(this.charactors.childNodes[i].offsetHeight);
		charactorLefts.push(this.charactors.childNodes[i].offsetLeft);
		charactorTops.push(this.charactors.childNodes[i].offsetTop);
		i = (i+1)|0;
	}

	this.ellipsisWidth = ellipsisWidth;
	this.charactorsWidth = charactorsWidth;
	this.charactorHeights = charactorHeights;
	this.charactorLefts = charactorLefts;
	this.charactorTops = charactorTops;
};

OmitterDom.prototype.omit2 = function (){

	var poses = new Array();
	var i = 0;
	var is = this.charactorTops.length;
	while (i < is){
		var pos = this.charactorTops[i];
		if (poses.indexOf(pos) == -1)
			poses.push(pos);
		i = (i+1)|0;
	}
	
	this.maxTop = poses.length == 0 ? 0 :
		poses[Math.min(poses.length -1, this.count -1)];
	
	this.hideable = this.count < poses.length;
	if (this.hideable)
		this.ellipsis.classList.remove("omitter-hidden");
	else this.ellipsis.classList.add("omitter-hidden");
};

OmitterDom.prototype.omit3 = function (){

	this.maxHeight = 0;
	
	var i = this.charactorTops.length -1;
	while (-1 < i){
		if (this.charactorTops[i] == this.maxTop)
			this.maxHeight = Math.max(this.maxHeight, this.charactorHeights[i]);
		i = (i-1)|0;
	}
};
;
OmitterDom.prototype.omit4 = function (){

	var done = false;
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		if (this.maxTop < this.charactorTops[i]){
			this.charactors.childNodes[i].classList.add("omitter-hidden");
		}
		else if (this.maxTop == this.charactorTops[i]){
			if (this.ellipsisWidth < this.charactorsWidth - this.charactorLefts[i]){
				if (!done && this.hideable){
					done = true;
					this.ellipsis.style.top = this.charactorTops[i] + "px";
					this.ellipsis.style.left = this.charactorLefts[i] + "px";
					this.charactors.childNodes[i].classList.add("omitter-hidden");
				}
				else {
					this.charactors.childNodes[i].classList.remove("omitter-hidden");
				}
			}
			else {
				this.charactors.childNodes[i].classList.add("omitter-hidden");
			}
		}
		else {
			this.charactors.childNodes[i].classList.remove("omitter-hidden");
		}
		i = (i-1)|0;
	}
	
	this.root.style.maxHeight = (this.maxTop + this.maxHeight).toString() + "px";
	
};

OmitterDom.prototype.omit = function (){
	this.omit1();
	this.omit2();
	this.omit3();
	this.omit4();
};

OmitterDom.prototype.unomit1 = function (){
	this.ellipsis.classList.add("omitter-hidden");
};

OmitterDom.prototype.unomit2 = function (){
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		this.charactors.childNodes[i].classList.remove("omitter-hidden");
		i = (i-1)|0;
	}
};

OmitterDom.prototype.unomit3 = function (){
	this.root.style.maxHeight = null;
};

OmitterDom.prototype.unomit = function (){
	this.unomit1();
	this.unomit2();
	this.unomit3();
};

function Omitter (doms, count, token){
	this.status = false;
	
	if (window.jQuery &&
			doms instanceof window.jQuery){
		doms = doms.toArray();
	}
	
	this.doms = Array.prototype.slice.call(doms).map(
		function (dom){
			return new OmitterDom(dom, count, token);
		});
}

Omitter.prototype.omit = function (){
	this.status = true;
	this.doms.map(function (dom){ dom.omit1(); });
	this.doms.map(function (dom){ dom.omit2(); });
	this.doms.map(function (dom){ dom.omit3(); });
	this.doms.map(function (dom){ dom.omit4(); });
};

Omitter.prototype.unomit = function (){
	this.status && 
		this.doms.map(
			function (dom){
				dom.unomit();
			});
	this.status = false;
};

Omitter.prototype.toggle = function (){
	this.status ? 
		this.unomit():
		this.omit();
};

Omitter.prototype.update = function (){
	this.status ? 
		this.omit():
		this.unomit();
};
