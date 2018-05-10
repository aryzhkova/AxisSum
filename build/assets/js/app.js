var sumItems = (function () {
    var wrapCanvas = $(document).find('.wrap-axis');
    var example = $(document).find('.example');
    var canvas = document.getElementById('axis');
    var ctx = canvas.getContext('2d');
    var item1 = 0;
    var item2 = 0;
    var sumInput = $(document).find('#sum');
    var shiftCurve = 0;
    var heightCurve = 0;
    var countCurve = 0;

    function randomItem(min,max){
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
    function setItems() {
        item1 = randomItem(6,9);
        item2 = randomItem(11-item1,14-item1);
        $('.item1').text(item1);
        $('.item2').text(item2);
        sumInput.val("?");
        sumInput.prop("disabled",true);
        sumInput.prop("maxlength",getSum().toString().length);
    }
    function resetItems() {
        ctx.clearRect(0,0,875,400);
        $('#item1').remove();
        $('#item2').remove();
        shiftCurve = 0;
        heightCurve = 0;
        countCurve = 0;
        setItems();
        drawCurve(0,item1);
    }
    function drawCurve(startX,endX){
        var step = 39;

        var shiftX = 35;
        var shiftY = 335;

        var x0 = startX*step+shiftX;
        var y0 = shiftY;

        var x3 = endX*step+shiftX;
        var y3 = shiftY;

        var s = endX-startX;

        var x1 = shiftX+s*step/4 + shiftCurve;
        var y1 =  shiftY-s*step/4;

        var x2 = shiftX+s*3*step/4+shiftCurve;
        var y2 = shiftY-s*step/4;

        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.stroke();
        drawArrow(x2,y2,x3,y3);
        heightCurve = shiftY-s*step/4 -15;
        createItemInput("item"+(countCurve+1),s*step/2+shiftX + shiftCurve);
        shiftCurve = shiftCurve + s*step;
        ++countCurve;
    }
    function drawArrow(x1,y1,x2,y2){
        var size = 10;
        var shiftAngle = 160;
        var angle = 180*Math.atan2(y2-y1,x2-x1)/Math.PI;
        var x3 = x2 + Math.round(size * Math.cos((Math.PI * (angle + shiftAngle) / 180))) ;
        var y3 = y2 + Math.round(size * Math.sin((Math.PI * (angle + shiftAngle) / 180)));
        var x4 = x2 + Math.round(size * Math.cos((Math.PI * (angle - shiftAngle) / 180)));
        var y4 = y2 + Math.round(size * Math.sin((Math.PI * (angle - shiftAngle) / 180)));
        ctx.beginPath();
        ctx.moveTo(x2,y2);
        ctx.lineTo(x3,y3);
       // ctx.strokeStyle="red";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2,y2);
        ctx.lineTo(x4,y4);
       // ctx.strokeStyle="red";
        ctx.stroke();
    }
    function createItemInput(name,s){
        var el = document.createElement('INPUT');
        $(el).attr({
            "class" : "input input_item input_"+name,
            "id" : name,
            "type" : "text",
            "name" : name,
            "maxlength" : $("."+name).text().length
        });
        $(el).css({
            "left" : s,
            "top" : heightCurve
        });
        wrapCanvas.append(el);
        $(el).focus();
        $(el).keypress(function (e) {
            if(e.keyCode === 8){
                return true;
            }
            if( e.keyCode === 13){
                inputItemHandler($(this));
            }
            if(e.keyCode < 48 || e.keyCode > 57 ){
                return false;
            }
        });
    }
    function inputSumHandler(input) {
        var value = input.val();
        var sum = getSum();
       // var sum = parseInt($('.item1').text())+parseInt($('.item2').text());
        if( sum == value){
            input.prop("disabled",true);
            input.removeClass('error_fc');
            setTimeout(function () {
                resetItems();
            },3000);
        }else {
            input.addClass('error_fc');
        }
    }
    function inputItemHandler(input) {
        var value = input.val();
        var name = input.attr("name");
        if($("."+name).text() == value){
            input.prop("disabled",true);
            input.removeClass('error_fc');
            $("."+name).removeClass('error_bg');
            if(input.attr("id")=="item1"){
                drawCurve(item1,item1+item2);
            }else{
                sumInput.val("");
                sumInput.prop("disabled",false);
                sumInput.focus();
            }
        }else{
            input.addClass('error_fc');
            $("."+name).addClass('error_bg');
        }
    }
    function getSum(){
        var sum = 0;
        $('.item').each(function () {
            sum = sum +  parseInt($(this).text());
        });
        return sum;
    }
    return{
        init:function () {
            setItems();
            drawCurve(0,item1);
            sumInput.keydown(function (e) {
                if(e.keyCode === 8){
                    return true;
                }
                if( e.keyCode === 13){
                    inputSumHandler($(this));
                }
                if(e.keyCode < 48 || e.keyCode > 57 ){
                    return false;
                }
            });
        }
    }
}());
$(document).ready(function () {
sumItems.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1bUl0ZW1zLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3VtSXRlbXMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdyYXBDYW52YXMgPSAkKGRvY3VtZW50KS5maW5kKCcud3JhcC1heGlzJyk7XHJcbiAgICB2YXIgZXhhbXBsZSA9ICQoZG9jdW1lbnQpLmZpbmQoJy5leGFtcGxlJyk7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpdGVtMSA9IDA7XHJcbiAgICB2YXIgaXRlbTIgPSAwO1xyXG4gICAgdmFyIHN1bUlucHV0ID0gJChkb2N1bWVudCkuZmluZCgnI3N1bScpO1xyXG4gICAgdmFyIHNoaWZ0Q3VydmUgPSAwO1xyXG4gICAgdmFyIGhlaWdodEN1cnZlID0gMDtcclxuICAgIHZhciBjb3VudEN1cnZlID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21JdGVtKG1pbixtYXgpe1xyXG4gICAgICAgIHZhciByYW5kID0gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKTtcclxuICAgICAgICByYW5kID0gTWF0aC5mbG9vcihyYW5kKTtcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEl0ZW1zKCkge1xyXG4gICAgICAgIGl0ZW0xID0gcmFuZG9tSXRlbSg2LDkpO1xyXG4gICAgICAgIGl0ZW0yID0gcmFuZG9tSXRlbSgxMS1pdGVtMSwxNC1pdGVtMSk7XHJcbiAgICAgICAgJCgnLml0ZW0xJykudGV4dChpdGVtMSk7XHJcbiAgICAgICAgJCgnLml0ZW0yJykudGV4dChpdGVtMik7XHJcbiAgICAgICAgc3VtSW5wdXQudmFsKFwiP1wiKTtcclxuICAgICAgICBzdW1JbnB1dC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgICAgICBzdW1JbnB1dC5wcm9wKFwibWF4bGVuZ3RoXCIsZ2V0U3VtKCkudG9TdHJpbmcoKS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVzZXRJdGVtcygpIHtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCw4NzUsNDAwKTtcclxuICAgICAgICAkKCcjaXRlbTEnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCcjaXRlbTInKS5yZW1vdmUoKTtcclxuICAgICAgICBzaGlmdEN1cnZlID0gMDtcclxuICAgICAgICBoZWlnaHRDdXJ2ZSA9IDA7XHJcbiAgICAgICAgY291bnRDdXJ2ZSA9IDA7XHJcbiAgICAgICAgc2V0SXRlbXMoKTtcclxuICAgICAgICBkcmF3Q3VydmUoMCxpdGVtMSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkcmF3Q3VydmUoc3RhcnRYLGVuZFgpe1xyXG4gICAgICAgIHZhciBzdGVwID0gMzk7XHJcblxyXG4gICAgICAgIHZhciBzaGlmdFggPSAzNTtcclxuICAgICAgICB2YXIgc2hpZnRZID0gMzM1O1xyXG5cclxuICAgICAgICB2YXIgeDAgPSBzdGFydFgqc3RlcCtzaGlmdFg7XHJcbiAgICAgICAgdmFyIHkwID0gc2hpZnRZO1xyXG5cclxuICAgICAgICB2YXIgeDMgPSBlbmRYKnN0ZXArc2hpZnRYO1xyXG4gICAgICAgIHZhciB5MyA9IHNoaWZ0WTtcclxuXHJcbiAgICAgICAgdmFyIHMgPSBlbmRYLXN0YXJ0WDtcclxuXHJcbiAgICAgICAgdmFyIHgxID0gc2hpZnRYK3Mqc3RlcC80ICsgc2hpZnRDdXJ2ZTtcclxuICAgICAgICB2YXIgeTEgPSAgc2hpZnRZLXMqc3RlcC80O1xyXG5cclxuICAgICAgICB2YXIgeDIgPSBzaGlmdFgrcyozKnN0ZXAvNCtzaGlmdEN1cnZlO1xyXG4gICAgICAgIHZhciB5MiA9IHNoaWZ0WS1zKnN0ZXAvNDtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeDAseTApO1xyXG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIGRyYXdBcnJvdyh4Mix5Mix4Myx5Myk7XHJcbiAgICAgICAgaGVpZ2h0Q3VydmUgPSBzaGlmdFktcypzdGVwLzQgLTE1O1xyXG4gICAgICAgIGNyZWF0ZUl0ZW1JbnB1dChcIml0ZW1cIisoY291bnRDdXJ2ZSsxKSxzKnN0ZXAvMitzaGlmdFggKyBzaGlmdEN1cnZlKTtcclxuICAgICAgICBzaGlmdEN1cnZlID0gc2hpZnRDdXJ2ZSArIHMqc3RlcDtcclxuICAgICAgICArK2NvdW50Q3VydmU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkcmF3QXJyb3coeDEseTEseDIseTIpe1xyXG4gICAgICAgIHZhciBzaXplID0gMTA7XHJcbiAgICAgICAgdmFyIHNoaWZ0QW5nbGUgPSAxNjA7XHJcbiAgICAgICAgdmFyIGFuZ2xlID0gMTgwKk1hdGguYXRhbjIoeTIteTEseDIteDEpL01hdGguUEk7XHJcbiAgICAgICAgdmFyIHgzID0geDIgKyBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLmNvcygoTWF0aC5QSSAqIChhbmdsZSArIHNoaWZ0QW5nbGUpIC8gMTgwKSkpIDtcclxuICAgICAgICB2YXIgeTMgPSB5MiArIE1hdGgucm91bmQoc2l6ZSAqIE1hdGguc2luKChNYXRoLlBJICogKGFuZ2xlICsgc2hpZnRBbmdsZSkgLyAxODApKSk7XHJcbiAgICAgICAgdmFyIHg0ID0geDIgKyBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLmNvcygoTWF0aC5QSSAqIChhbmdsZSAtIHNoaWZ0QW5nbGUpIC8gMTgwKSkpO1xyXG4gICAgICAgIHZhciB5NCA9IHkyICsgTWF0aC5yb3VuZChzaXplICogTWF0aC5zaW4oKE1hdGguUEkgKiAoYW5nbGUgLSBzaGlmdEFuZ2xlKSAvIDE4MCkpKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh4Mix5Mik7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4Myx5Myk7XHJcbiAgICAgICAvLyBjdHguc3Ryb2tlU3R5bGU9XCJyZWRcIjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeDIseTIpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeDQseTQpO1xyXG4gICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlPVwicmVkXCI7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbUlucHV0KG5hbWUscyl7XHJcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcclxuICAgICAgICAkKGVsKS5hdHRyKHtcclxuICAgICAgICAgICAgXCJjbGFzc1wiIDogXCJpbnB1dCBpbnB1dF9pdGVtIGlucHV0X1wiK25hbWUsXHJcbiAgICAgICAgICAgIFwiaWRcIiA6IG5hbWUsXHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiIDogbmFtZSxcclxuICAgICAgICAgICAgXCJtYXhsZW5ndGhcIiA6ICQoXCIuXCIrbmFtZSkudGV4dCgpLmxlbmd0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoZWwpLmNzcyh7XHJcbiAgICAgICAgICAgIFwibGVmdFwiIDogcyxcclxuICAgICAgICAgICAgXCJ0b3BcIiA6IGhlaWdodEN1cnZlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3JhcENhbnZhcy5hcHBlbmQoZWwpO1xyXG4gICAgICAgICQoZWwpLmZvY3VzKCk7XHJcbiAgICAgICAgJChlbCkua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSA4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCBlLmtleUNvZGUgPT09IDEzKXtcclxuICAgICAgICAgICAgICAgIGlucHV0SXRlbUhhbmRsZXIoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlIDwgNDggfHwgZS5rZXlDb2RlID4gNTcgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5wdXRTdW1IYW5kbGVyKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsKCk7XHJcbiAgICAgICAgdmFyIHN1bSA9IGdldFN1bSgpO1xyXG4gICAgICAgLy8gdmFyIHN1bSA9IHBhcnNlSW50KCQoJy5pdGVtMScpLnRleHQoKSkrcGFyc2VJbnQoJCgnLml0ZW0yJykudGV4dCgpKTtcclxuICAgICAgICBpZiggc3VtID09IHZhbHVlKXtcclxuICAgICAgICAgICAgaW5wdXQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfSwzMDAwKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlucHV0SXRlbUhhbmRsZXIoaW5wdXQpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9IGlucHV0LmF0dHIoXCJuYW1lXCIpO1xyXG4gICAgICAgIGlmKCQoXCIuXCIrbmFtZSkudGV4dCgpID09IHZhbHVlKXtcclxuICAgICAgICAgICAgaW5wdXQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgICAgICAkKFwiLlwiK25hbWUpLnJlbW92ZUNsYXNzKCdlcnJvcl9iZycpO1xyXG4gICAgICAgICAgICBpZihpbnB1dC5hdHRyKFwiaWRcIik9PVwiaXRlbTFcIil7XHJcbiAgICAgICAgICAgICAgICBkcmF3Q3VydmUoaXRlbTEsaXRlbTEraXRlbTIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LnByb3AoXCJkaXNhYmxlZFwiLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yX2ZjJyk7XHJcbiAgICAgICAgICAgICQoXCIuXCIrbmFtZSkuYWRkQ2xhc3MoJ2Vycm9yX2JnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0U3VtKCl7XHJcbiAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgJCgnLml0ZW0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc3VtID0gc3VtICsgIHBhcnNlSW50KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZXRJdGVtcygpO1xyXG4gICAgICAgICAgICBkcmF3Q3VydmUoMCxpdGVtMSk7XHJcbiAgICAgICAgICAgIHN1bUlucHV0LmtleWRvd24oZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gOCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiggZS5rZXlDb2RlID09PSAxMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRTdW1IYW5kbGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZS5rZXlDb2RlIDwgNDggfHwgZS5rZXlDb2RlID4gNTcgKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbnN1bUl0ZW1zLmluaXQoKTtcclxufSk7Il19
