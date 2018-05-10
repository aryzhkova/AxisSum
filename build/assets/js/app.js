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
        var errorMsg ="";
        if (input.hasClass('input_sum')){
            if(!rv_sum.test(input.val())){
                error = 2;
                errorMsg  = "Нужно ввести двузначное число";
                input.addClass('error_bg');
            }else{
                input.removeClass('error_bg');
            }
        }
        if(input.hasClass('input_item')){
            if(!rv_item.test(input.val())){
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1bUl0ZW1zLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkxBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3VtSXRlbXMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdyYXBDYW52YXMgPSAkKGRvY3VtZW50KS5maW5kKCcud3JhcC1heGlzJyk7XHJcbiAgICB2YXIgZXhhbXBsZSA9ICQoZG9jdW1lbnQpLmZpbmQoJy5leGFtcGxlJyk7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXMnKTtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciBpdGVtMSA9IDA7XHJcbiAgICB2YXIgaXRlbTIgPSAwO1xyXG4gICAgdmFyIHN1bUlucHV0ID0gJChkb2N1bWVudCkuZmluZCgnI3N1bScpO1xyXG4gICAgdmFyIHNoaWZ0Q3VydmUgPSAwO1xyXG4gICAgdmFyIGhlaWdodEN1cnZlID0gMDtcclxuICAgIHZhciBjb3VudEN1cnZlID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb21JdGVtKG1pbixtYXgpe1xyXG4gICAgICAgIHZhciByYW5kID0gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKTtcclxuICAgICAgICByYW5kID0gTWF0aC5mbG9vcihyYW5kKTtcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEl0ZW1zKCkge1xyXG4gICAgICAgIGl0ZW0xID0gcmFuZG9tSXRlbSg2LDkpO1xyXG4gICAgICAgIGl0ZW0yID0gcmFuZG9tSXRlbSgxMS1pdGVtMSwxNC1pdGVtMSk7XHJcbiAgICAgICAgJCgnLml0ZW0xJykudGV4dChpdGVtMSk7XHJcbiAgICAgICAgJCgnLml0ZW0yJykudGV4dChpdGVtMik7XHJcbiAgICAgICAgc3VtSW5wdXQudmFsKFwiP1wiKTtcclxuICAgICAgICBzdW1JbnB1dC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0SXRlbXMoKSB7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsODc1LDQwMCk7XHJcbiAgICAgICAgJCgnI2l0ZW0xJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnI2l0ZW0yJykucmVtb3ZlKCk7XHJcbiAgICAgICAgc2hpZnRDdXJ2ZSA9IDA7XHJcbiAgICAgICAgaGVpZ2h0Q3VydmUgPSAwO1xyXG4gICAgICAgIGNvdW50Q3VydmUgPSAwO1xyXG4gICAgICAgIHNldEl0ZW1zKCk7XHJcbiAgICAgICAgZHJhd0N1cnZlKDAsaXRlbTEpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZHJhd0N1cnZlKHN0YXJ0WCxlbmRYKXtcclxuICAgICAgICB2YXIgc3RlcCA9IDM5O1xyXG5cclxuICAgICAgICB2YXIgc2hpZnRYID0gMzU7XHJcbiAgICAgICAgdmFyIHNoaWZ0WSA9IDMzNTtcclxuXHJcbiAgICAgICAgdmFyIHgwID0gc3RhcnRYKnN0ZXArc2hpZnRYO1xyXG4gICAgICAgIHZhciB5MCA9IHNoaWZ0WTtcclxuXHJcbiAgICAgICAgdmFyIHgzID0gZW5kWCpzdGVwK3NoaWZ0WDtcclxuICAgICAgICB2YXIgeTMgPSBzaGlmdFk7XHJcblxyXG4gICAgICAgIHZhciBzID0gZW5kWC1zdGFydFg7XHJcblxyXG4gICAgICAgIHZhciB4MSA9IHNoaWZ0WCtzKnN0ZXAvNCArIHNoaWZ0Q3VydmU7XHJcbiAgICAgICAgdmFyIHkxID0gIHNoaWZ0WS1zKnN0ZXAvNDtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gc2hpZnRYK3MqMypzdGVwLzQrc2hpZnRDdXJ2ZTtcclxuICAgICAgICB2YXIgeTIgPSBzaGlmdFktcypzdGVwLzQ7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHgwLHkwKTtcclxuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKTtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gMztcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICBkcmF3QXJyb3coeDIseTIseDMseTMpO1xyXG4gICAgICAgIGhlaWdodEN1cnZlID0gc2hpZnRZLXMqc3RlcC80IC0xNTtcclxuICAgICAgICBjcmVhdGVJdGVtSW5wdXQoXCJpdGVtXCIrKGNvdW50Q3VydmUrMSkscypzdGVwLzIrc2hpZnRYICsgc2hpZnRDdXJ2ZSk7XHJcbiAgICAgICAgc2hpZnRDdXJ2ZSA9IHNoaWZ0Q3VydmUgKyBzKnN0ZXA7XHJcbiAgICAgICAgKytjb3VudEN1cnZlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZHJhd0Fycm93KHgxLHkxLHgyLHkyKXtcclxuICAgICAgICB2YXIgc2l6ZSA9IDEwO1xyXG4gICAgICAgIHZhciBzaGlmdEFuZ2xlID0gMTYwO1xyXG4gICAgICAgIHZhciBhbmdsZSA9IDE4MCpNYXRoLmF0YW4yKHkyLXkxLHgyLXgxKS9NYXRoLlBJO1xyXG4gICAgICAgIHZhciB4MyA9IHgyICsgTWF0aC5yb3VuZChzaXplICogTWF0aC5jb3MoKE1hdGguUEkgKiAoYW5nbGUgKyBzaGlmdEFuZ2xlKSAvIDE4MCkpKSA7XHJcbiAgICAgICAgdmFyIHkzID0geTIgKyBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLnNpbigoTWF0aC5QSSAqIChhbmdsZSArIHNoaWZ0QW5nbGUpIC8gMTgwKSkpO1xyXG4gICAgICAgIHZhciB4NCA9IHgyICsgTWF0aC5yb3VuZChzaXplICogTWF0aC5jb3MoKE1hdGguUEkgKiAoYW5nbGUgLSBzaGlmdEFuZ2xlKSAvIDE4MCkpKTtcclxuICAgICAgICB2YXIgeTQgPSB5MiArIE1hdGgucm91bmQoc2l6ZSAqIE1hdGguc2luKChNYXRoLlBJICogKGFuZ2xlIC0gc2hpZnRBbmdsZSkgLyAxODApKSk7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeDIseTIpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeDMseTMpO1xyXG4gICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlPVwicmVkXCI7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHgyLHkyKTtcclxuICAgICAgICBjdHgubGluZVRvKHg0LHk0KTtcclxuICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZT1cInJlZFwiO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW1JbnB1dChuYW1lLHMpe1xyXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJyk7XHJcbiAgICAgICAgJChlbCkuYXR0cih7XHJcbiAgICAgICAgICAgIFwiY2xhc3NcIiA6IFwiaW5wdXQgaW5wdXRfaXRlbSBpbnB1dF9cIituYW1lLFxyXG4gICAgICAgICAgICBcImlkXCIgOiBuYW1lLFxyXG4gICAgICAgICAgICBcInR5cGVcIiA6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICBcIm5hbWVcIiA6IG5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKGVsKS5jc3Moe1xyXG4gICAgICAgICAgICBcImxlZnRcIiA6IHMsXHJcbiAgICAgICAgICAgIFwidG9wXCIgOiBoZWlnaHRDdXJ2ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdyYXBDYW52YXMuYXBwZW5kKGVsKTtcclxuICAgICAgICAkKGVsKS5mb2N1cygpO1xyXG4gICAgICAgICQoZWwpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHZhbGlkYXRlKCQodGhpcykpKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEl0ZW1IYW5kbGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbnB1dFN1bUhhbmRsZXIoaW5wdXQpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWwoKTtcclxuICAgICAgICB2YXIgc3VtID0gcGFyc2VJbnQoJCgnLml0ZW0xJykudGV4dCgpKStwYXJzZUludCgkKCcuaXRlbTInKS50ZXh0KCkpO1xyXG4gICAgICAgIGlmKCBzdW0gPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICBpbnB1dC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yX2ZjJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB9LDMwMDApO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yX2ZjJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5wdXRJdGVtSGFuZGxlcihpbnB1dCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbCgpO1xyXG4gICAgICAgIHZhciBuYW1lID0gaW5wdXQuYXR0cihcIm5hbWVcIik7XHJcbiAgICAgICAgaWYoJChcIi5cIituYW1lKS50ZXh0KCkgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICBpbnB1dC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yX2ZjJyk7XHJcbiAgICAgICAgICAgICQoXCIuXCIrbmFtZSkucmVtb3ZlQ2xhc3MoJ2Vycm9yX2JnJyk7XHJcbiAgICAgICAgICAgIGlmKGlucHV0LmF0dHIoXCJpZFwiKT09XCJpdGVtMVwiKXtcclxuICAgICAgICAgICAgICAgIGRyYXdDdXJ2ZShpdGVtMSxpdGVtMStpdGVtMik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3VtSW5wdXQudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgc3VtSW5wdXQucHJvcChcImRpc2FibGVkXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgc3VtSW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3JfZmMnKTtcclxuICAgICAgICAgICAgJChcIi5cIituYW1lKS5hZGRDbGFzcygnZXJyb3JfYmcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShpbnB1dCl7XHJcbiAgICAgICAgdmFyIGVycm9yID0gMDtcclxuICAgICAgICB2YXIgcnZfaXRlbSA9IC9eWzAtOV0kLztcclxuICAgICAgICB2YXIgcnZfc3VtID0gL15bMC05XXsyfSQvO1xyXG4gICAgICAgIHZhciBlcnJvck1zZyA9XCJcIjtcclxuICAgICAgICBpZiAoaW5wdXQuaGFzQ2xhc3MoJ2lucHV0X3N1bScpKXtcclxuICAgICAgICAgICAgaWYoIXJ2X3N1bS50ZXN0KGlucHV0LnZhbCgpKSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvciA9IDI7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyAgPSBcItCd0YPQttC90L4g0LLQstC10YHRgtC4INC00LLRg9C30L3QsNGH0L3QvtC1INGH0LjRgdC70L5cIjtcclxuICAgICAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcl9iZycpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcl9iZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0Lmhhc0NsYXNzKCdpbnB1dF9pdGVtJykpe1xyXG4gICAgICAgICAgICBpZighcnZfaXRlbS50ZXN0KGlucHV0LnZhbCgpKSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvciA9IDE7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi0J3Rg9C20L3QviDQstCy0LXRgdGC0Lgg0L7QtNC90L7Qt9C90LDRh9C90L7QtSDRh9C40YHQu9C+XCI7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3JfYmcnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3JfYmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuc3RhdHVzJykuaHRtbChlcnJvck1zZyk7XHJcbiAgICAgICAgaWYgKGVycm9yID09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGRyYXdDdXJ2ZSgwLGl0ZW0xKTtcclxuICAgICAgICAgICAgc3VtSW5wdXQua2V5ZG93bihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWxpZGF0ZSgkKHRoaXMpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U3VtSGFuZGxlcigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbnN1bUl0ZW1zLmluaXQoKTtcclxufSk7Il19
