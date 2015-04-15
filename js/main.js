$.urlParam = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if (!(results == null )) return results[1];
    return undefined;
}

$._urlParamAsInt = function(name, base){
    if (typeof base === 'undefined') { base = 10; }

    var res = $.urlParam(name);
    if (res == null) return undefined;
    res=parseInt(res, base);
    if(isNaN(res)) return undefined;
    return res;
}

$.urlParamAsInt = function(name, base){
    var res=$._urlParamAsInt(name, base);
    console.log(name);console.log(res);
    return res;
}

