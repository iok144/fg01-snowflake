function drawSnowflake(iteration) {
    var canvas = document.getElementById("snowflake");
    var canvasHeight = parseInt(canvas.getAttribute("height"));
    var canvasWidth = parseInt(canvas.getAttribute("width"));

    var len;
    if(canvasHeight / canvasWidth <= (Math.sin(Math.PI / 3) * 4 / 3)) {
        len = canvasHeight * 3 / (4 * Math.sin(Math.PI / 3));
    } else {
        len = canvasWidth;
    }
    var x = 0;
    var y = len * Math.sin(Math.PI / 3);
    var angle = -60 * Math.PI / 180;

    var context = canvas.getContext("2d");
    
    canvas.width = canvas.width;//Очистка канваса

    context.lineWidth = "1";
    context.strokeStyle = "#0000FF";

    drawSide(iteration, x, y, angle, len, context);

    x = x + len * Math.cos(angle);
    y = y + len * Math.sin(angle);
    angle += 120 * Math.PI / 180;
    drawSide(iteration, x, y, angle, len, context);

    x = x + len * Math.cos(angle);
    y = y + len * Math.sin(angle);
    angle += 120 * Math.PI / 180;
    drawSide(iteration, x, y, angle, len, context);
}
/**
 * Рисует сторону снежинки Коха
 * 
 * @param {Number} iteration Количество итераций
 * @param {Number} x Абсцисса
 * @param {Number} y Ордината
 * @param {Number} angle Угол поворота
 * @param {Number} len Длина линии
 * @param {object} context HTML context
 */
function drawSide(iteration, x, y, angle, len, context) {
    if(iteration > 0) {
        drawSide(iteration - 1, x, y, angle, len/3, context);

        x = x + len / 3 * Math.cos(angle);
        y = y + len / 3 * Math.sin(angle);
        angle -= 60 * Math.PI / 180;
        drawSide(iteration - 1, x, y, angle, len/3, context);

        x = x + len / 3 * Math.cos(angle);
        y = y + len / 3 * Math.sin(angle);
        angle += 120 * Math.PI / 180;
        drawSide(iteration - 1, x, y, angle, len/3, context);

        x = x + len / 3 * Math.cos(angle);
        y = y + len / 3 * Math.sin(angle);
        angle -= 60 * Math.PI / 180;
        drawSide(iteration - 1, x, y, angle, len/3, context);
    }
    else {
        var finishX = x + len * Math.cos(angle);
        var finishY = y + len * Math.sin(angle);
        drawLine(x, y, finishX, finishY, context);
    }
}

function drawLine(x, y, finishX, finishY, context) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(finishX, finishY);
    context.stroke();
}

function run() {
    var iteration = document.getElementById("input").value;
    drawSnowflake(iteration);
}