/* 
	Copyright (c) 2018 tikubonn.
	Released under the MIT license 
	http://opensource.org/licenses/mitlicense.php 
*/

function OmitterDom (dom, count, cramp){
	this.dom = dom;
	this.domContent = dom.innerText;
	this.cramp = null;
	this.crampContent = cramp;
	this.crampWidth = null;
	this.charactors = null;
	this.charactorsWidth = null;
	this.charactorsWidths = null;
	this.charactorsHeights = null;
	this.charactorsTops = null;
	this.charactorsLefts = null;
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
	
	if (this.crampContent && 
			this.crampContent.length){
		var cramp = document.createElement("span");
		var crampContent = document.createTextNode(this.crampContent);
		cramp.appendChild(crampContent);
		cramp.classList.add("omitter-cramp");
		root.appendChild(cramp);
		this.cramp = cramp;
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
	// if (this.cramp.classList.contains("omitter-hidden"))
	// 	this.cramp.classList.remove("omitter-hidden");
};

OmitterDom.prototype.omit2 = function (){
	
	var crampWidth = this.cramp.offsetWidth;
	var charactorsWidth = this.charactors.offsetWidth;
	var charactorsHeights = new Array();
	var charactorsLefts = new Array();
	var charactorsTops = new Array();
	
	var i = 0;
	var is = this.charactors.childNodes.length;
	while (i < is){
		charactorsHeights.push(this.charactors.childNodes[i].offsetHeight);
		charactorsLefts.push(this.charactors.childNodes[i].offsetLeft);
		charactorsTops.push(this.charactors.childNodes[i].offsetTop);
		i = (i+1)|0;
	}

	this.crampWidth = crampWidth;
	this.charactorsWidth = charactorsWidth;
	this.charactorsHeights = charactorsHeights;
	this.charactorsLefts = charactorsLefts;
	this.charactorsTops = charactorsTops;
};

OmitterDom.prototype.omit3 = function (){

	var poses = new Array();
	var i = 0;
	var is = this.charactorsTops.length;
	while (i < is){
		var pos = this.charactorsTops[i];
		if (poses.indexOf(pos) == -1)
			poses.push(pos);
		i = (i+1)|0;
	}
	
	this.maxTop = poses.length == 0 ? 0 :
		poses[Math.min(poses.length -1, this.count -1)];
	
	this.hideable = this.count < poses.length;
	if (this.hideable)
		this.cramp.classList.remove("omitter-hidden");
	else this.cramp.classList.add("omitter-hidden");
};

OmitterDom.prototype.omit4 = function (){

	this.maxHeight = 0;
	
	var i = this.charactorsTops.length -1;
	while (-1 < i){
		if (this.charactorsTops[i] == this.maxTop)
			this.maxHeight = Math.max(this.maxHeight, this.charactorsHeights[i]);
		i = (i-1)|0;
	}
};
;
OmitterDom.prototype.omit5 = function (){

	var done = false;
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		if (this.maxTop < this.charactorsTops[i]){
			this.charactors.childNodes[i].classList.add("omitter-hidden");
		}
		else if (this.maxTop == this.charactorsTops[i]){
			if (this.crampWidth < this.charactorsWidth - this.charactorsLefts[i]){
				if (!done && this.hideable){
					done = true;
					this.cramp.style.top = this.charactorsTops[i] + "px";
					this.cramp.style.left = this.charactorsLefts[i] + "px";
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
	this.omit5();
};

OmitterDom.prototype.unomit1 = function (){
	this.cramp.classList.add("omitter-hidden");
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
	this.doms.map(function (dom){ dom.omit5(); });
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
