
function OmitterDom (dom, count, cramp){
	this.dom = dom;
	this.domContent = dom.innerText;
	this.cramp = null;
	this.crampContent = cramp;
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
		// var charactorContent = document.createTextNode(this.domContent.slice(i, i+1));
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

OmitterDom.prototype.do1 = function (){
	if (this.cramp.classList.contains("omitter-hidden"))
		this.cramp.classList.remove("omitter-hidden");
};

OmitterDom.prototype.do2 = function (){

	var poses = new Array();
	var i = 0;
	var is = this.charactors.childNodes.length;
	while (i < is){
		var pos = this.charactors.childNodes[i].offsetTop;
		if (poses.indexOf(pos) == -1)
			poses.push(pos);
		i = (i+1)|0;
	}
	
	this.maxTop = poses.length == 0 ? 0 :
		poses[Math.min(poses.length -1, this.count)];
};

OmitterDom.prototype.do3 = function (){

	this.maxHeight = 0;
	
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		if (this.charactors.childNodes[i].offsetTop == this.maxTop)
			this.maxHeight = Math.max(this.maxHeight, this.charactors.childNodes[i].offsetHeight);
		i = (i-1)|0;
	}
};
;
OmitterDom.prototype.do4 = function (){

	var done = false;
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		if (this.maxTop < this.charactors.childNodes[i].offsetTop)
			this.charactors.childNodes[i].classList.add("omitter-hidden");
		else if (this.maxTop == this.charactors.childNodes[i].offsetTop){
			if (this.cramp.offsetWidth < this.charactors.offsetWidth - this.charactors.childNodes[i].offsetLeft){
				if (!done){
					done = true;
					this.cramp.style.top = this.charactors.childNodes[i].offsetTop + "px";
					this.cramp.style.left = this.charactors.childNodes[i].offsetLeft + "px";
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
	this.do1();
	this.do2();
	this.do3();
	this.do4();
};

OmitterDom.prototype.unomit1 = function (){
	if (this.cramp.classList.contains("omitter-hidden") == false)
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
	this.doms.map(function (dom){ dom.do1(); });
	this.doms.map(function (dom){ dom.do2(); });
	this.doms.map(function (dom){ dom.do3(); });
	this.doms.map(function (dom){ dom.do4(); });
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
