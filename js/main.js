"use strict";
/**
 * por qué no se r
 */
var mouse = { x: 0, y: 0 };
var mouseDown = false;

$(window).resize(function () {
    console.log("resize");
    $("#paint").css({ "width": "100%", "height": "100%", "color": "blue" });
});

$(() => {

    startPaint();

});

function startPaint() {
    setDefaultValues();
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var paintElement = document.getElementById('paint');

    canvas.width = parseInt(getComputedStyle(paintElement).getPropertyValue('width'));
    canvas.height = parseInt(getComputedStyle(paintElement).getPropertyValue('height'));

    canvas.style.cssText = "border: 1px solid black";
    $("#myCanvas").on("mousemove", function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    })

    //Draw a dot
    $("#myCanvas").on("click", function () {
        ctx.moveTo(mouse.x, mouse.y);
        onPaint();
    })

    /*$("#myCanvas").on("mouseleave", function () {
        canvas.removeEventListener('mousemove', onPaint, false);
    });*/

    canvas.addEventListener('mousedown', function () {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint, false);
    }, false)

    document.addEventListener('mouseup', function () {
        console.log("Mouseup");
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    function onPaint() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };

    ctx.lineWidth = document.getElementById('lineWidth').value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('color').value;
    ctx.globalAlpha = 1;

    $("#color").on('change', function () {
        console.log($("#color").val());
        ctx.strokeStyle = $("#color").val();
    })

    $("#lineWidth").on('change', function () {
        console.log($("#lineWidth").val())
        ctx.lineWidth = $("#lineWidth").val();
        $("#textInput").val($("#lineWidth").val());
    })

    $("#textInput").on("change", function () {
        if ($("#textInput").val() > 0 && $("#textInput").val() <= 10) {
            $("#lineWidth").val($("#textInput").val());
            ctx.lineWidth = $("#lineWidth").val();
        } else {
            $("#textInput").val(ctx.lineWidth);
        }
    })

    $("#menu-type .btn").on("click", function () {
        console.log("type selected");
        $("#menu-type .btn").removeClass('active');
        $(this).toggleClass('active');
        if (this.value === "Pencil")
            ctx.globalAlpha = 0.03;
        else if (this.value === "Pen")
            ctx.globalAlpha = 1;
    })
}

function setDefaultValues() {
    $("#lineWidth").val("2");
    $("#color").val("#FFFFF")
    $("#textInput").val($("#lineWidth").val());
    $("#pen").addClass("active")
}