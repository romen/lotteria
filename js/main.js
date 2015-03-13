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

function newTable(cols) {
    var t=document.createElement('table');
    $(t).attr('class','lotteria')
    for(var i=0; i<cols; i++) {
        t.appendChild(document.createElement('col'));
    }

    var tb=document.createElement('tbody');
    t.appendChild(tb);

    return [t,tb];
}

function genLotteria(num, cols, rows, start) {
    if (typeof cols  === 'undefined') { cols  = 5; }
    if (typeof rows  === 'undefined') { rows  = 7; }
    if (typeof start === 'undefined') { start = 1; }

    var mod=cols*rows;
    var num=num+mod-1-(num-1)%mod;

    var numberOfDigits=parseInt(Math.floor(Math.log(num) / Math.LN10 + 1), 10);

    var cont=document.createElement('div'); $(cont).attr('id', 'container');

    var t; var tb;

    for(var i=0; i<num; i+=cols) {
        if((i/cols)%rows==0) {
            ret = newTable(cols); t=ret[0]; tb=ret[1];
            page = document.createElement('div');
            $(page).attr('class', 'A4Portrait');
            page.appendChild(t);
            cont.appendChild(page);
        }

        var tr=document.createElement('tr');
        tb.appendChild(tr);
        for(var j=0; j<cols; j++) {
            // r.push(i+j);
            td=document.createElement('td');
            // $(td).text(i+j);
            $(td).text(sprintf("%0"+numberOfDigits+"i",i+j+start));
            tr.appendChild(td);
        }

        if((i/cols)%rows==rows-1) {
            pb=document.createElement('div'); $(pb).attr('class', 'page-break');
            pb.appendChild(document.createElement('br'));
            cont.appendChild(pb);
        }
    }

    return cont;
}


$(function() {
    var num=$.urlParamAsInt('num');
    var cols=$.urlParamAsInt('cols');
    var rows=$.urlParamAsInt('rows');
    var start=$.urlParamAsInt('start');

    if (num == null) return;

    cont=genLotteria(num, cols, rows, start);

    $('body').replaceWith($('<body>').append($(cont)));
});
