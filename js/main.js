"use strict";
/**
 * por qué no se r
 */
var mouse = { x: 0, y: 0 };
var mouseDown = false;
var canvas, ctx, paintElement;

$(window).resize(function () {
    console.log("resize");
    $("#paint").css({ "width": "100%", "height": "100%" });
});

$(() => {
    setDefaultValues();
    startPaint();
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
        switch (this.value) {
            case "Pencil":
                ctx.globalAlpha = 0.03;
                ctx.strokeStyle = $("#color").val();
                break;
            case "Pen":
                ctx.globalAlpha = 1;
                ctx.strokeStyle = $("#color").val();
                break;
            case "Rubber":
                console.log(canvas.style.backgroundColor);
                ctx.strokeStyle = "#ffffff";
                ctx.globalAlpha = 1;
                console.log(ctx.strokeStyle);
                break;
        }
    })

    $("#myCanvas, #menu").on("mousemove", function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        console.log(mouse.x, mouse.y);
    })

    $("#myCanvas").on("click", function () {
        ctx.moveTo(mouse.x, mouse.y);
        onPaint();
    })

    $("#showMenu").on("click", function () {
        $("#menu").toggleClass("hide");
    })
});

function saveCanvas() {
    console.log(canvas.toDataURL());
    $("#urlCanvas").val(canvas.toDataURL());
    var copyText = document.getElementById("urlCanvas");
    copyText.select();
    document.execCommand("copy");
    alert("The drawing has been saved\nURL copied to the clipboard")
}

function loadCanvas() {

}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onPaint() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function startPaint() {
    canvas = document.getElementById('myCanvas');
    console.log(canvas);
    ctx = canvas.getContext('2d');
    paintElement = document.getElementById('paint');

    canvas.width = parseInt(getComputedStyle(paintElement).getPropertyValue('width'));
    canvas.height = parseInt(getComputedStyle(paintElement).getPropertyValue('height'));

    canvas.style.cssText = "border: 1px solid black";

    document.addEventListener('mousedown', function () {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        document.addEventListener('mousemove', onPaint, false);
    }, false)

    document.addEventListener('mouseup', function () {
        console.log("Mouseup");
        document.removeEventListener('mousemove', onPaint, false);
    }, false);

    
    ctx.lineWidth = document.getElementById('lineWidth').value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('color').value;
    ctx.globalAlpha = 1;
}

function setDefaultValues() {
    $("#menu").addClass("hide");
    $("#lineWidth").val("2");
    $("#color").val("#FFFFF")
    $("#textInput").val($("#lineWidth").val());
    $("#menu-type .btn").removeClass('active');
    $("#pen").addClass("active")
}