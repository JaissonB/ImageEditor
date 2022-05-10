var canvas1 = document.getElementById('canvas-img1');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('canvas-img2');
var ctx2 = canvas2.getContext('2d');
var canvasResult = document.getElementById('canvas-result');
var ctxR = canvasResult.getContext('2d');
canvasResult.width = 500;
canvasResult.height = 500;

function openFile(idx) {
    var file = document.getElementById('input-file' + idx).files[0];
    var readFile = new FileReader();

    readFile.onload = function() {
        var x = readFile.result;
        var image = new Image();
        
        document.getElementById('img-loaded' + idx).src = x;
        image.src = document.getElementById('img-loaded' + idx).src;
        
        image.onload = function() {
            const { width, height } = image;
            if (idx == 1) {
                if (width >= height) {
                    canvas1.width = 500;
                    canvas1.height = 500 * height / width;
                } else if (height > width) {
                    canvas1.height = 500;
                    canvas1.width = 500 * width / height;
                }
                ctx1.clearRect(0, 0, width, height);
                ctx1.drawImage(image, 0, 0, width, height, 0, 0, canvas1.width, canvas1.height);
            } else if (idx == 2) {
                if (width >= height) {
                    canvas2.width = 500;
                    canvas2.height = 500 * height / width;
                } else if (height > width) {
                    canvas2.height = 500;
                    canvas2.width = 500 * width / height;
                }
                ctx2.clearRect(0, 0, width, height);
                ctx2.drawImage(image, 0, 0, width, height, 0, 0, canvas2.width, canvas2.height);
            }
        }
        // console.log(x)
    }
    readFile.readAsDataURL(file);
}

function somar() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] += matrix2[i];//R
        matrixR[i+1] += matrix2[i+1];//G
        matrixR[i+2] += matrix2[i+2];//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}

function subtrair() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;
    console.log(matrixR)

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] -= matrix2[i];//R
        matrixR[i+1] -= matrix2[i+1];//G
        matrixR[i+2] -= matrix2[i+2];//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    
    ctxR.putImageData(imageR, 0, 0);
}

function multiplicar() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;
    console.log(matrixR)

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] *= matrix2[i];//R
        matrixR[i+1] *= matrix2[i+1];//G
        matrixR[i+2] *= matrix2[i+2];//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    
    ctxR.putImageData(imageR, 0, 0);
}

function dividir() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;
    console.log(matrixR)

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] /= matrix2[i];//R
        matrixR[i+1] /= matrix2[i+1];//G
        matrixR[i+2] /= matrix2[i+2];//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    
    ctxR.putImageData(imageR, 0, 0);
}

function media() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] = (matrixR[i] + matrix2[i]) * 0.5;//R
        matrixR[i+1] = (matrixR[i+1] + matrix2[i+1]) * 0.5;//G
        matrixR[i+2] = (matrixR[i+2] + matrix2[i+2]) * 0.5;//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}

function blending() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;
    var txMix = 0.8;

    for(i = 0; i < matrixR.length; i+=4) {
        matrixR[i] = txMix * matrixR[i] + (1 - txMix) * matrix2[i];//R
        matrixR[i+1] = txMix * matrixR[i+1] + (1 - txMix) * matrix2[i+1];//G
        matrixR[i+2] = txMix * matrixR[i+2] + (1 - txMix) * matrix2[i+2];//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}

function and() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;

    for(i = 0; i < matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = matrix2[i+j] >= 128 ? 255 : 0;
            matrixR[i+j] = bin1 && bin2;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}

function or() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;

    for(i = 0; i < matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = matrix2[i+j] >= 128 ? 255 : 0;
            matrixR[i+j] = bin1 || bin2;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}

function xor() {
    ctxR.clearRect(0, 0, 500, 500);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;

    for(i = 0; i < matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = matrix2[i+j] >= 128 ? 255 : 0;
            matrixR[i+j] = (bin1 || bin2) && !(bin1 && bin2) ? 255 : 0;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;

    ctxR.putImageData(imageR, 0, 0);
}