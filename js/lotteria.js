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

function genLotteria(num, cols, rows, start, cb) {
    if (typeof cols  === 'undefined') { cols  = 5; }
    if (typeof rows  === 'undefined') { rows  = 7; }
    if (typeof start === 'undefined') { start = 1; }

    var mod=cols*rows
        , num=num+mod-1-(num-1)%mod
        , numberOfDigits=parseInt(Math.floor(Math.log(num) / Math.LN10 + 1), 10)
        , t, tb
        , cont=document.createElement('div');

    cont.id='container';

    (function(cb) {
        var progressBar= $('#progressbar')
            , updateProgress = function(value) {
                // console.log('progress: '+value);
                progressBar.progressbar("option", "value", value);
            };

        var mainLoop = function(i) {
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
                td=document.createElement('td');
                $(td).text(sprintf("%0"+numberOfDigits+"i",i+j+start));
                tr.appendChild(td);
            }

            if((i/cols)%rows==rows-1) {
                pb=document.createElement('div'); $(pb).attr('class', 'page-break');
                pb.appendChild(document.createElement('br'));
                cont.appendChild(pb);
            }
        };

        var i=0;
        var looper = function() {
            if(i<num) {
                mainLoop(i);

                i+= cols;
                setTimeout(looper, 0);
                updateProgress(i);
            } else { // loop ended
                console.log('looper ended');
                cb();
            }
            return;
        };
        console.log('looper starting');
        looper();
    } )(cb);

    return cont;
}

$(function() {
    var num=$.urlParamAsInt('num');
    var cols=$.urlParamAsInt('cols');
    var rows=$.urlParamAsInt('rows');
    var start=$.urlParamAsInt('start');

    if (num == null) return;

    $('#placeholder > .main').html(
        '<div id="progressbar"><div class="progress-label"></div></div>');

    var progressBar=$('#progressbar')
        , progressLabel=$('#progressbar .progress-label');

    (function(){
        var points=0, pb_last_ts=0;
        progressBar.progressbar({
            value: 0,
            max: num,
            change: function(){
                var pb_ts=new Date().getTime();
                if (pb_ts-pb_last_ts>=300){
                    pb_last_ts=pb_ts;
                    progressLabel.text('Elaborazione in corso' +
                                    Array(1+points).join('.'));
                    points=(points+1)%4;
                }
            }
        });
    })();

    console.log("starting genLotteria");
    var container=genLotteria(num, cols, rows, start
        , function() { // callback
            console.log(container);
            console.log("replacing body");
            $('body').replaceWith($('<body>').append(container));
            console.log("done");
          });
});

