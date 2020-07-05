function viewScripts(){
	var s = document.getElementsByTagName('SCRIPT'); 
	var d = window.open('', '', 'height=400,width=600').document;
	d.open();
	d.close(); 
	var b = d.body;
	function trim(s){ 
		return s
			.replace(/^\\s*\\n/, '')
			.replace(/\\s*$/, ''); 
	}; 
	function add(h){
		b.appendChild(h);
	}
	function makeTag(t){
		return d.createElement(t);
	} 
	function makeText(tag,text){
		t=makeTag(tag);
		t.appendChild(d.createTextNode(text)); 
		return t;
	} 
	add(makeText('style', 'iframe{width:100%;height:18em;border:1px solid;')); 
	add(makeText('h3', d.title='Scripts in ' + location.href)); 
	for(i=0; i<s.length; ++i) { 
		if (s[i].src) { 
			add(makeText('h4','script src=%22' + s[i].src + '%22')); 
			iframe=makeTag('iframe'); 
			iframe.src=s[i].src; 
			add(iframe); 
		} else { 
			add(makeText('h4','Inline script')); 
			add(makeText('pre', trim(s[i].innerHTML))); 
		} 
	} 
	void 0
}