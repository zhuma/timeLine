/**
 * Created by hanshaojie on 2015/10/12.
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var icurr = 0;
        var bStop=true;
        for (var i in json) {
            if (i == "opacity") {
                icurr = parseInt(parseFloat(getStyle(obj, "opacity")) * 100);
            }
            else {
                icurr = parseInt(getStyle(obj, i));
            }
            var iSpeed = (json[i] - icurr) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(icurr!=json[i]){
                bStop=false;
            }
            if (i == "opacity") {
                obj.style.filter = "alpha(opacity:" + (icurr + iSpeed) + ")";
                obj.style.opacity = (icurr + iSpeed) / 100;
            }
            else {
                obj.style[i] = icurr + iSpeed + "px";
            }

        }
        if(bStop){
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30);
}