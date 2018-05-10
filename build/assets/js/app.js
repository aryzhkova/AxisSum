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
            "name" : name
        });
        $(el).css({
            "left" : s,
            "top" : heightCurve
        });
        wrapCanvas.append(el);
        $(el).focus();
        $(el).keydown(function (e) {
            if (e.keyCode === 13) {
                if(validate($(this))){
                    inputItemHandler($(this));
                }
            }
        });
    }
    function inputSumHandler(input) {
        var value = input.val();
        var sum = parseInt($('.item1').text())+parseInt($('.item2').text());
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
    function validate(input){
        var error = 0;
        var rv_item = /^[0-9]$/;
        var rv_sum = /^[0-9]{2}$/;
        var value = input.val().trim();
        input.val(value);
        var errorMsg ="";
        if (input.hasClass('input_sum')){
            if(!rv_sum.test(value)){
                error = 2;
                errorMsg  = "Нужно ввести двузначное число";
                input.addClass('error_bg');
            }else{
                input.removeClass('error_bg');
            }
        }
        if(input.hasClass('input_item')){
            if(!rv_item.test(value)){
                error = 1;
                errorMsg = "Нужно ввести однозначное число";
                input.addClass('error_bg');
            }else{
                input.removeClass('error_bg');
            }
        }
        $('.status').html(errorMsg);
        if (error == 0){
            return true
        }else{
            return false
        }
    }
    return{
        init:function () {
            setItems();
            drawCurve(0,item1);
            sumInput.keydown(function (e) {
                if (e.keyCode === 13) {
                    if(validate($(this))){
                        inputSumHandler($(this));
                    }
                }
            });
        }
    }
}());
$(document).ready(function () {
sumItems.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1bUl0ZW1zLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pMQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHN1bUl0ZW1zID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3cmFwQ2FudmFzID0gJChkb2N1bWVudCkuZmluZCgnLndyYXAtYXhpcycpO1xyXG4gICAgdmFyIGV4YW1wbGUgPSAkKGRvY3VtZW50KS5maW5kKCcuZXhhbXBsZScpO1xyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzJyk7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgaXRlbTEgPSAwO1xyXG4gICAgdmFyIGl0ZW0yID0gMDtcclxuICAgIHZhciBzdW1JbnB1dCA9ICQoZG9jdW1lbnQpLmZpbmQoJyNzdW0nKTtcclxuICAgIHZhciBzaGlmdEN1cnZlID0gMDtcclxuICAgIHZhciBoZWlnaHRDdXJ2ZSA9IDA7XHJcbiAgICB2YXIgY291bnRDdXJ2ZSA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZG9tSXRlbShtaW4sbWF4KXtcclxuICAgICAgICB2YXIgcmFuZCA9IG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbik7XHJcbiAgICAgICAgcmFuZCA9IE1hdGguZmxvb3IocmFuZCk7XHJcbiAgICAgICAgcmV0dXJuIHJhbmQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRJdGVtcygpIHtcclxuICAgICAgICBpdGVtMSA9IHJhbmRvbUl0ZW0oNiw5KTtcclxuICAgICAgICBpdGVtMiA9IHJhbmRvbUl0ZW0oMTEtaXRlbTEsMTQtaXRlbTEpO1xyXG4gICAgICAgICQoJy5pdGVtMScpLnRleHQoaXRlbTEpO1xyXG4gICAgICAgICQoJy5pdGVtMicpLnRleHQoaXRlbTIpO1xyXG4gICAgICAgIHN1bUlucHV0LnZhbChcIj9cIik7XHJcbiAgICAgICAgc3VtSW5wdXQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldEl0ZW1zKCkge1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLDg3NSw0MDApO1xyXG4gICAgICAgICQoJyNpdGVtMScpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJyNpdGVtMicpLnJlbW92ZSgpO1xyXG4gICAgICAgIHNoaWZ0Q3VydmUgPSAwO1xyXG4gICAgICAgIGhlaWdodEN1cnZlID0gMDtcclxuICAgICAgICBjb3VudEN1cnZlID0gMDtcclxuICAgICAgICBzZXRJdGVtcygpO1xyXG4gICAgICAgIGRyYXdDdXJ2ZSgwLGl0ZW0xKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRyYXdDdXJ2ZShzdGFydFgsZW5kWCl7XHJcbiAgICAgICAgdmFyIHN0ZXAgPSAzOTtcclxuXHJcbiAgICAgICAgdmFyIHNoaWZ0WCA9IDM1O1xyXG4gICAgICAgIHZhciBzaGlmdFkgPSAzMzU7XHJcblxyXG4gICAgICAgIHZhciB4MCA9IHN0YXJ0WCpzdGVwK3NoaWZ0WDtcclxuICAgICAgICB2YXIgeTAgPSBzaGlmdFk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGVuZFgqc3RlcCtzaGlmdFg7XHJcbiAgICAgICAgdmFyIHkzID0gc2hpZnRZO1xyXG5cclxuICAgICAgICB2YXIgcyA9IGVuZFgtc3RhcnRYO1xyXG5cclxuICAgICAgICB2YXIgeDEgPSBzaGlmdFgrcypzdGVwLzQgKyBzaGlmdEN1cnZlO1xyXG4gICAgICAgIHZhciB5MSA9ICBzaGlmdFktcypzdGVwLzQ7XHJcblxyXG4gICAgICAgIHZhciB4MiA9IHNoaWZ0WCtzKjMqc3RlcC80K3NoaWZ0Q3VydmU7XHJcbiAgICAgICAgdmFyIHkyID0gc2hpZnRZLXMqc3RlcC80O1xyXG5cclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh4MCx5MCk7XHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8oeDEsIHkxLCB4MiwgeTIsIHgzLCB5Myk7XHJcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgZHJhd0Fycm93KHgyLHkyLHgzLHkzKTtcclxuICAgICAgICBoZWlnaHRDdXJ2ZSA9IHNoaWZ0WS1zKnN0ZXAvNCAtMTU7XHJcbiAgICAgICAgY3JlYXRlSXRlbUlucHV0KFwiaXRlbVwiKyhjb3VudEN1cnZlKzEpLHMqc3RlcC8yK3NoaWZ0WCArIHNoaWZ0Q3VydmUpO1xyXG4gICAgICAgIHNoaWZ0Q3VydmUgPSBzaGlmdEN1cnZlICsgcypzdGVwO1xyXG4gICAgICAgICsrY291bnRDdXJ2ZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRyYXdBcnJvdyh4MSx5MSx4Mix5Mil7XHJcbiAgICAgICAgdmFyIHNpemUgPSAxMDtcclxuICAgICAgICB2YXIgc2hpZnRBbmdsZSA9IDE2MDtcclxuICAgICAgICB2YXIgYW5nbGUgPSAxODAqTWF0aC5hdGFuMih5Mi15MSx4Mi14MSkvTWF0aC5QSTtcclxuICAgICAgICB2YXIgeDMgPSB4MiArIE1hdGgucm91bmQoc2l6ZSAqIE1hdGguY29zKChNYXRoLlBJICogKGFuZ2xlICsgc2hpZnRBbmdsZSkgLyAxODApKSkgO1xyXG4gICAgICAgIHZhciB5MyA9IHkyICsgTWF0aC5yb3VuZChzaXplICogTWF0aC5zaW4oKE1hdGguUEkgKiAoYW5nbGUgKyBzaGlmdEFuZ2xlKSAvIDE4MCkpKTtcclxuICAgICAgICB2YXIgeDQgPSB4MiArIE1hdGgucm91bmQoc2l6ZSAqIE1hdGguY29zKChNYXRoLlBJICogKGFuZ2xlIC0gc2hpZnRBbmdsZSkgLyAxODApKSk7XHJcbiAgICAgICAgdmFyIHk0ID0geTIgKyBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLnNpbigoTWF0aC5QSSAqIChhbmdsZSAtIHNoaWZ0QW5nbGUpIC8gMTgwKSkpO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHgyLHkyKTtcclxuICAgICAgICBjdHgubGluZVRvKHgzLHkzKTtcclxuICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZT1cInJlZFwiO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh4Mix5Mik7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4NCx5NCk7XHJcbiAgICAgICAvLyBjdHguc3Ryb2tlU3R5bGU9XCJyZWRcIjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtSW5wdXQobmFtZSxzKXtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTlBVVCcpO1xyXG4gICAgICAgICQoZWwpLmF0dHIoe1xyXG4gICAgICAgICAgICBcImNsYXNzXCIgOiBcImlucHV0IGlucHV0X2l0ZW0gaW5wdXRfXCIrbmFtZSxcclxuICAgICAgICAgICAgXCJpZFwiIDogbmFtZSxcclxuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInRleHRcIixcclxuICAgICAgICAgICAgXCJuYW1lXCIgOiBuYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChlbCkuY3NzKHtcclxuICAgICAgICAgICAgXCJsZWZ0XCIgOiBzLFxyXG4gICAgICAgICAgICBcInRvcFwiIDogaGVpZ2h0Q3VydmVcclxuICAgICAgICB9KTtcclxuICAgICAgICB3cmFwQ2FudmFzLmFwcGVuZChlbCk7XHJcbiAgICAgICAgJChlbCkuZm9jdXMoKTtcclxuICAgICAgICAkKGVsKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICBpZih2YWxpZGF0ZSgkKHRoaXMpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRJdGVtSGFuZGxlcigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5wdXRTdW1IYW5kbGVyKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaW5wdXQudmFsKCk7XHJcbiAgICAgICAgdmFyIHN1bSA9IHBhcnNlSW50KCQoJy5pdGVtMScpLnRleHQoKSkrcGFyc2VJbnQoJCgnLml0ZW0yJykudGV4dCgpKTtcclxuICAgICAgICBpZiggc3VtID09IHZhbHVlKXtcclxuICAgICAgICAgICAgaW5wdXQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfSwzMDAwKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlucHV0SXRlbUhhbmRsZXIoaW5wdXQpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuICAgICAgICB2YXIgbmFtZSA9IGlucHV0LmF0dHIoXCJuYW1lXCIpO1xyXG4gICAgICAgIGlmKCQoXCIuXCIrbmFtZSkudGV4dCgpID09IHZhbHVlKXtcclxuICAgICAgICAgICAgaW5wdXQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcl9mYycpO1xyXG4gICAgICAgICAgICAkKFwiLlwiK25hbWUpLnJlbW92ZUNsYXNzKCdlcnJvcl9iZycpO1xyXG4gICAgICAgICAgICBpZihpbnB1dC5hdHRyKFwiaWRcIik9PVwiaXRlbTFcIil7XHJcbiAgICAgICAgICAgICAgICBkcmF3Q3VydmUoaXRlbTEsaXRlbTEraXRlbTIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LnByb3AoXCJkaXNhYmxlZFwiLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHN1bUlucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yX2ZjJyk7XHJcbiAgICAgICAgICAgICQoXCIuXCIrbmFtZSkuYWRkQ2xhc3MoJ2Vycm9yX2JnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUoaW5wdXQpe1xyXG4gICAgICAgIHZhciBlcnJvciA9IDA7XHJcbiAgICAgICAgdmFyIHJ2X2l0ZW0gPSAvXlswLTldJC87XHJcbiAgICAgICAgdmFyIHJ2X3N1bSA9IC9eWzAtOV17Mn0kLztcclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWwoKS50cmltKCk7XHJcbiAgICAgICAgaW5wdXQudmFsKHZhbHVlKTtcclxuICAgICAgICB2YXIgZXJyb3JNc2cgPVwiXCI7XHJcbiAgICAgICAgaWYgKGlucHV0Lmhhc0NsYXNzKCdpbnB1dF9zdW0nKSl7XHJcbiAgICAgICAgICAgIGlmKCFydl9zdW0udGVzdCh2YWx1ZSkpe1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSAyO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgID0gXCLQndGD0LbQvdC+INCy0LLQtdGB0YLQuCDQtNCy0YPQt9C90LDRh9C90L7QtSDRh9C40YHQu9C+XCI7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3JfYmcnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3JfYmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnB1dC5oYXNDbGFzcygnaW5wdXRfaXRlbScpKXtcclxuICAgICAgICAgICAgaWYoIXJ2X2l0ZW0udGVzdCh2YWx1ZSkpe1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSAxO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBcItCd0YPQttC90L4g0LLQstC10YHRgtC4INC+0LTQvdC+0LfQvdCw0YfQvdC+0LUg0YfQuNGB0LvQvlwiO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yX2JnJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yX2JnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLnN0YXR1cycpLmh0bWwoZXJyb3JNc2cpO1xyXG4gICAgICAgIGlmIChlcnJvciA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZXRJdGVtcygpO1xyXG4gICAgICAgICAgICBkcmF3Q3VydmUoMCxpdGVtMSk7XHJcbiAgICAgICAgICAgIHN1bUlucHV0LmtleWRvd24oZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsaWRhdGUoJCh0aGlzKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFN1bUhhbmRsZXIoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5zdW1JdGVtcy5pbml0KCk7XHJcbn0pOyJdfQ==
