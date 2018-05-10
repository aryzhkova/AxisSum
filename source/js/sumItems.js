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