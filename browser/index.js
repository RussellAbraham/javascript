
const browser = {}; 

function load(){
    function scriptNode(src, onload, onerror){
        var script = document.createElement('script');
        script.src = src + '.js';
        script.onload = onload;
        script.onerror = onerror || onload;
        return document.head.appendChild(script);
    }
    function scriptLoad(){
        console.info('success loading : ', this);
    }
    function scriptError(){
        console.error('failed loading : ', this);
    }
    [].slice.call(arguments).forEach(function(string){
        scriptNode(string, scriptLoad, scriptError);
    });
}

function init(){
    [ 'cookies', 'dialog', 'history', 'location', 'navigator', 'screen', 'storage', 'timing', 'window' ].forEach(function(object){
        load(object + '/index');
    });
}

setTimeout(init, 1);
