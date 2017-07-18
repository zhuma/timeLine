/**
 * Created by hanshaojie on 2017/3/7.
 */
window.onload = function () {
    var oUL = document.getElementById("year");
    var oLi = oUL.getElementsByTagName("li");
    var oB = document.getElementById("b");
    var oLine = document.getElementById("line");
    var oArea = document.getElementById("area");
    //布局转换
    var arr = [];
    for (var i = 0; i < oLi.length; i++) {
        arr.push([oLi[i].offsetLeft, oLi[i].offsetTop]);
    }
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.position = "absolute";
        oLi[i].style.left = arr[i][0] + "px";
        oLi[i].style.top = arr[i][1] + "px";
        oLi[i].style.margin = 0;
    }

    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            oArea.innerHTML = this.innerHTML;
            oB.style.left = this.index * oLi[0].offsetWidth + 50 + "px";
        }
    }


    //拖拽
    oB.onmousedown = function (e) {
        var ev = e || event;
        var disX = ev.clientX - this.offsetLeft;
        var iNow = this;
        document.onmousemove = function (e) {
            var ev = e || event;
            var aNow = minVal(iNow);

            var l = ev.clientX - disX - 7.5;

            if (l <= 0) {
                l = 0;
            }

            if (l >= oLine.offsetWidth) {
                l = oLine.offsetWidth - iNow.offsetWidth;
            }

            iNow.style.left = l + "px";
            iNow.style.top = -5 + "px";
            oArea.innerHTML = oLi[aNow].innerHTML;

        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };

    //求最短距离
    function getDis(arg1, arg2) {
        var a = arg1.offsetLeft - (arg2.offsetLeft+50);
        var b = 30;
        return Math.sqrt(a * a + b * b);
    }

    //找出碰撞元素中的最小值
    function minVal(obj) {
        var Max = 9999999999999;
        var minIndex = -1;
        for (var i = 0; i < oLi.length; i++) {
            if (obj == oLi[i])continue;
            var disTance = getDis(obj, oLi[i]);
            if (Max > disTance) {
                Max = disTance;
                minIndex = i;
            }
        }
        if (minIndex == -1) {
            return null;
        }
        else {
            return minIndex;
        }
    }
};
