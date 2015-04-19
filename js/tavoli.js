function tavoli(t,p) {
    var b=(p-(t%p))%p, a=(t-b*(p-1))/p;

    if(a>0 && b>=0 && a>=b)
        return [a,b];
    return null;
}

$('#tavoli input').on('input', function() {
    var t=$('#t')[0].valueAsNumber, p=$('#p')[0].valueAsNumber, res;
    var output=$('#output');

    output.hide();

    if(!isInteger(t) || !isInteger(p)) {
        console.log("Either t or p isn't an Integer");
        console.log([t,p]);
        output.hide(); return;
    }

    res = tavoli(t,p);
    if (!res) {
        console.log("No valid solution for tavoli(t,p) with [t,p]:")
        console.log(t,p);
        output.hide(); return;
    }

    var o=output.children();
    o[0].value=res[0]; o[2].value=res[1];
    o[1].value=p; o[3].value=p-1;

    output.show(); return true;
})
