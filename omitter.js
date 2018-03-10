
function OmitterDom (dom, count){
	this.dom = dom;
	this.domContent = dom.innerText;
	this.count = count;
	this.init();
}

OmitterDom.prototype.init = function (){

	var i = this.dom.childNodes.length -1;
	while (-1 < i){
		this.dom.removeChild(
			this.dom.childNodes[i]);
		i = (i-1)|0;
	}
	
	var root = document.createElement("div");
	var rootNodes = document.createDocumentFragment();
	root.className = "omitter-sentence";
	
	var j = 0;
	var js = this.domContent.length;
	while (j < js){
		var dom = document.createElement("span");
		var domContent = document.createTextNode(this.domContent[j]);
		dom.appendChild(domContent);
		rootNodes.appendChild(dom);
		j = (j+1)|0;
	}
	
	root.appendChild(rootNodes);
	this.root = root;
	this.dom.appendChild(root);
};

OmitterDom.prototype.do1 = function (){
	
	var poses = new Array();
	var i = 0;
	var is = this.root.childNodes.length;
	while (i < is && poses.length < this.count){
		var pos = this.root.childNodes[i].offsetTop;
		if (poses.indexOf(pos) == -1)
			poses.push(pos);
		i = (i+1)|0;
	}
	
	this.max = poses[ Math.min(poses.length -1, this.count) ];

	this.maxh = 0;
	
	var j = this.root.childNodes.length -1;
	while (-1 < j){
		if (this.root.childNodes[j].offsetTop == this.max)
			this.maxh = Math.max(this.maxh, this.root.childNodes[j].offsetHeight);
		j = (j-1)|0;
	}
	
};

OmitterDom.prototype.do2 = function (){
	this.root.style.maxHeight = "" + (this.max + this.maxh).toString() + "px";
};

OmitterDom.prototype.omit = function (){
	this.do1();
	this.do2();
};

OmitterDom.prototype.unomit = function (){
	this.root.style.maxHeight = null;
};

function Omitter (doms, count){
	this.doms = Array.prototype.slice.call(doms).map(
		function (dom){
			return new OmitterDom(dom, count);
		});
}

Omitter.prototype.omit = function (){
	this.doms.map(
		function (dom){
			dom.do1();
		});
	this.doms.map(
		function (dom){
			dom.do2();
		});
};

Omitter.prototype.unomit = function (){
	this.doms.map(
		function (dom){
			dom.unomit();
		});
};
