$.urlParam = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
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

function genLotteria(num, cols, rows) {
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
        for(var j=1; j<=cols; j++) {
            // r.push(i+j);
            td=document.createElement('td');
            // $(td).text(i+j);
            $(td).text(sprintf("%0"+numberOfDigits+"i",i+j));
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

function genLotteriaFromURL() {
    var num=parseInt($.urlParam('num'),10);
    var cols=parseInt($.urlParam('cols'),10);
    var rows=parseInt($.urlParam('rows'),10);

    return genLotteria(num, cols, rows);
}

$(function() {
    var cont=genLotteriaFromURL();

    $('body').replaceWith($('<body>').append($(cont)));
});
