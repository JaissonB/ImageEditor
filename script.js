var canvas1 = document.getElementById('canvas-img1');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('canvas-img2');
var ctx2 = canvas2.getContext('2d');
var canvasResult = document.getElementById('canvas-result');
var ctxR = canvasResult.getContext('2d');
var canvas3 = document.getElementById('canvas-img3');
var ctx3 = canvas3.getContext('2d');
var canvasEq = document.getElementById('canvas-imgEq');
var ctxEq = canvasEq.getContext('2d');
canvasResult.width = 400;
canvasResult.height = 400;
canvasEq.width = 400;
canvasEq.height = 400;

//Eventos
document.getElementById('upload-file1').addEventListener('click', function() {
    document.getElementById('input-file1').click();
})

document.getElementById('upload-file2').addEventListener('click', function() {
    document.getElementById('input-file2').click();
})

document.getElementById('upload-file3').addEventListener('click', function() {
    document.getElementById('input-file3').click();
})

document.getElementById('download').addEventListener('click', function() {
    const a = document.createElement('a');
    a.download = 'ImageEditor.png';
    a.href = canvasResult.toDataURL();
    a.click();
})

document.getElementById('downloadEq').addEventListener('click', function() {
    const a = document.createElement('a');
    a.download = 'ImageEditor.png';
    a.href = canvasEq.toDataURL();
    a.click();
})

function constructMatrix(image, width, height) {
    console.log(image.data)
    var line = [];
    var matrix = [];
    for(var i = 0; i < image.data.length; i++) {
        line.push(image.data[i]);
        if (line.length === width*4) {
            matrix.push(line);
            line = [];
        }
    }
    return matrix;
}

// function constructMatrix(image, width, height) {
//     var lineGray = [];
//     var matrixGray = [];
//     var lineR = [];
//     var matrixR = [];
//     var lineG = [];
//     var matrixG = [];
//     var lineB = [];
//     var matrixB = [];

//     for(var i = 0; i < image.data.length; i+=4) {
//         lineR.push(image.data[i])//R
//         lineG.push(image.data[i+1])//G
//         lineB.push(image.data[i+2])//B
//         if(lineR.length + lineG.length + lineB.length === width * 3) {
//             matrixR.push(lineR);
//             lineR = [];
//             matrixG.push(lineG);
//             lineG = [];
//             matrixB.push(lineB);
//             lineB = [];
//         }
//     }

//     for(var i = 0; i < height; i++) {
//         for(var j = 0; j < width; j++) {
//             lineGray.push((matrixR[i][j] + matrixG[i][j] + matrixB[i][j]) / 3);
//         }
//         matrixGray.push(lineGray);
//         lineGray = [];
//     }
//     return matrixGray;
// }

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
                    canvas1.width = 400;
                    canvas1.height = 400 * height / width;
                } else if (height > width) {
                    canvas1.height = 400;
                    canvas1.width = 400 * width / height;
                }
                ctx1.clearRect(0, 0, width, height);
                ctx1.drawImage(image, 0, 0, width, height, 0, 0, canvas1.width, canvas1.height);
            } else if (idx == 2) {
                if (width >= height) {
                    canvas2.width = 400;
                    canvas2.height = 400 * height / width;
                } else if (height > width) {
                    canvas2.height = 400;
                    canvas2.width = 400 * width / height;
                }
                ctx2.clearRect(0, 0, width, height);
                ctx2.drawImage(image, 0, 0, width, height, 0, 0, canvas2.width, canvas2.height);
            } else if (idx == 3) {
                if (width >= height) {
                    canvas3.width = 400;
                    canvas3.height = 400 * height / width;
                } else if (height > width) {
                    canvas3.height = 400;
                    canvas3.width = 400 * width / height;
                }
                ctx3.clearRect(0, 0, width, height);
                ctx3.drawImage(image, 0, 0, width, height, 0, 0, canvas3.width, canvas3.height);
                // var image3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
                // constructMatrix(image3, canvas3.width, canvas3.height)
                equalization();
            }
        }
    }
    readFile.readAsDataURL(file);
}

function returnVariables() {
    ctxR.clearRect(0, 0, 400, 400);
    var image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrix1 = image1.data;
    var image2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var matrix2 = image2.data;
    var imageR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var matrixR = imageR.data;
    return {
        'image1': image1,
        'matrix1': matrix1,
        'image2': image2,
        'matrix2': matrix2,
        'imageR': imageR,
        'matrixR': matrixR
    }
}

function somar() {
    var vari = returnVariables();
    const valSoma = parseFloat(document.getElementById('input-somar').value);

    if (valSoma > 0) {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] += valSoma;//R
            vari.matrixR[i+1] += valSoma;//G
            vari.matrixR[i+2] += valSoma;//B
        }
        canvasResult.width = canvas1.width;
        canvasResult.height = canvas1.height;
    } else {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] += vari.matrix2[i];//R
            vari.matrixR[i+1] += vari.matrix2[i+1];//G
            vari.matrixR[i+2] += vari.matrix2[i+2];//B
        }
        canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
        canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    }

    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function subtrair() {
    var vari = returnVariables();
    const valSub = parseFloat(document.getElementById('input-subtrair').value);

    if(valSub > 0) {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] -= valSub;
            vari.matrixR[i+1] -= valSub;
            vari.matrixR[i+2] -= valSub;
        }
        canvasResult.width = canvas1.width;
        canvasResult.height = canvas1.height;
    } else {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] -= vari.matrix2[i];
            vari.matrixR[i+1] -= vari.matrix2[i+1];
            vari.matrixR[i+2] -= vari.matrix2[i+2];
        }
        canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
        canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    }

    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function multiplicar() {
    var vari = returnVariables();
    const valMult = parseFloat(document.getElementById('input-multiplicar').value);

    if(valMult > 0) {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] *= valMult;
            vari.matrixR[i+1] *= valMult;
            vari.matrixR[i+2] *= valMult;
        }
        canvasResult.width = canvas1.width;
        canvasResult.height = canvas1.height;
    } else {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] *= vari.matrix2[i];//R
            vari.matrixR[i+1] *= vari.matrix2[i+1];//G
            vari.matrixR[i+2] *= vari.matrix2[i+2];//B
        }
        canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
        canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    }

    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function dividir() {
    var vari = returnVariables();
    const valDiv = parseFloat(document.getElementById('input-dividir').value);

    if(valDiv > 0) {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] /= valDiv;
            vari.matrixR[i+1] /= valDiv;
            vari.matrixR[i+2] /= valDiv;
        }
        canvasResult.width = canvas1.width;
        canvasResult.height = canvas1.height;
    } else {
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] /= vari.matrix2[i];
            vari.matrixR[i+1] /= vari.matrix2[i+1];
            vari.matrixR[i+2] /= vari.matrix2[i+2];
        }
        canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
        canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    }

    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function media() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        vari.matrixR[i] = (vari.matrixR[i] + vari.matrix2[i]) * 0.5;//R
        vari.matrixR[i+1] = (vari.matrixR[i+1] + vari.matrix2[i+1]) * 0.5;//G
        vari.matrixR[i+2] = (vari.matrixR[i+2] + vari.matrix2[i+2]) * 0.5;//B
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function blending() {
    var vari = returnVariables();
    const valTaxaMix = parseFloat(document.getElementById('input-blending').value);

    if(valTaxaMix > -1) {
        removeError();
        for(i = 0; i < vari.matrixR.length; i+=4) {
            vari.matrixR[i] = valTaxaMix * vari.matrixR[i] + (1 - valTaxaMix) * vari.matrix2[i];//R
            vari.matrixR[i+1] = valTaxaMix * vari.matrixR[i+1] + (1 - valTaxaMix) * vari.matrix2[i+1];//G
            vari.matrixR[i+2] = valTaxaMix * vari.matrixR[i+2] + (1 - valTaxaMix) * vari.matrix2[i+2];//B
        }
        canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
        canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
        ctxR.putImageData(vari.imageR, 0, 0);
    } else {
        document.getElementById('input-blending').classList.add('input-error');
        document.querySelector('.span-error').style.display = 'block';
    }
}

function removeError() {
    document.querySelector('.canvas-container--result').style.width = '410px';
    document.getElementById('input-blending').classList.remove('input-error');
    document.querySelector('.span-error').style.display = 'none';
}

function and() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = vari.matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = vari.matrix2[i+j] >= 128 ? 255 : 0;
            vari.matrixR[i+j] = bin1 && bin2;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function or() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = vari.matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = vari.matrix2[i+j] >= 128 ? 255 : 0;
            vari.matrixR[i+j] = bin1 || bin2;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function xor() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bin1 = vari.matrix1[i+j] >= 128 ? 255 : 0;
            var bin2 = vari.matrix2[i+j] >= 128 ? 255 : 0;
            vari.matrixR[i+j] = (bin1 || bin2) && !(bin1 && bin2) ? 255 : 0;
        }
    }

    canvasResult.width = (canvas1.width >= canvas2.width) ? canvas2.width : canvas1.width;
    canvasResult.height = (canvas1.height >= canvas2.height) ? canvas2.height : canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function not1() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bit = 255 - vari.matrix1[i+j];
            vari.matrixR[i+j] = bit;
        }
    }

    canvasResult.width = canvas1.width;
    canvasResult.height = canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function not2() {
    var vari = returnVariables();
    vari.matrixR = vari.matrix2;
    vari.imageR = vari.image2;
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bit = 255 - vari.matrix2[i+j];
            vari.matrixR[i+j] = bit;
        }
    }

    canvasResult.width = canvas2.width;
    canvasResult.height = canvas2.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function rgbTo8Bit1() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        var bit = 0;
        for(j = 0; j < 3; j++) {
            bit += vari.matrix1[i+j];
        }
        vari.matrixR[i] = bit/3;
        vari.matrixR[i+1] = bit/3;
        vari.matrixR[i+2] = bit/3;
    }

    canvasResult.width = canvas1.width;
    canvasResult.height = canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function rgbTo8Bit2() {
    var vari = returnVariables();
    vari.matrixR = vari.matrix2;
    vari.imageR = vari.image2;
    for(i = 0; i < vari.matrixR.length; i+=4) {
        var bit = 0;
        for(j = 0; j < 3; j++) {
            bit += vari.matrix2[i+j];
        }
        vari.matrixR[i] = bit/3;
        vari.matrixR[i+1] = bit/3;
        vari.matrixR[i+2] = bit/3;
    }

    canvasResult.width = canvas2.width;
    canvasResult.height = canvas2.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function rgbTo1Bit1() {
    var vari = returnVariables();
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bit = 0;
            bit += vari.matrix1[i+j];
        }
        bit = bit >= 128 ? 255 : 0;
        vari.matrixR[i] = bit;
        vari.matrixR[i+1] = bit;
        vari.matrixR[i+2] = bit;
    }

    canvasResult.width = canvas1.width;
    canvasResult.height = canvas1.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function rgbTo1Bit2() {
    var vari = returnVariables();
    vari.matrixR = vari.matrix2;
    vari.imageR = vari.image2;
    for(i = 0; i < vari.matrixR.length; i+=4) {
        for(j = 0; j < 3; j++) {
            var bit = 0;
            bit += vari.matrix2[i+j];
        }
        bit = bit >= 128 ? 255 : 0;
        vari.matrixR[i] = bit;
        vari.matrixR[i+1] = bit;
        vari.matrixR[i+2] = bit;
    }

    canvasResult.width = canvas2.width;
    canvasResult.height = canvas2.height;
    ctxR.putImageData(vari.imageR, 0, 0);
    removeError();
}

function mirrorImage() {
    removeError();
    
    const image = canvas1.toDataURL('image/png');
    var img = document.querySelector("#img-result");
    img.src = image;

    canvasResult.width = canvas1.height;
    canvasResult.height = canvas1.height;
    ctxR.scale(-1, 1);
    ctxR.translate(-canvasResult.width, 0);
    ctxR.drawImage(img, 0, 0, 400, 400);
}

function equalization() {
    var image3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
    var imageEq = ctx3.getImageData(0, 0, canvasEq.width, canvasEq.height);
    var matrizEq = imageEq.data;
    var arrayQuantityOccurrencesRed = [];
    var arrayQuantityOccurrencesGreen = [];
    var arrayQuantityOccurrencesBlue = [];
    var arrayCFDRed = [];
    var arrayCFDGreen = [];
    var arrayCFDBlue = [];

    for (var i = 0; i <= 255; i++) {
        arrayQuantityOccurrencesRed[i] = 0;
        arrayQuantityOccurrencesGreen[i] = 0;
        arrayQuantityOccurrencesBlue[i] = 0;
        arrayCFDRed[i] = 0;
        arrayCFDGreen[i] = 0;
        arrayCFDBlue[i] = 0;
    }

    for (var i = 0; i < matrizEq.length; i+=4) {
        arrayQuantityOccurrencesRed[matrizEq[i]] += 1;
        arrayQuantityOccurrencesGreen[matrizEq[i+1]] += 1;
        arrayQuantityOccurrencesBlue[matrizEq[i+2]] += 1;
    }

    arrayCFDRed[0] = arrayQuantityOccurrencesRed[0];
    arrayCFDGreen[0] = arrayQuantityOccurrencesGreen[0];
    arrayCFDBlue[0] = arrayQuantityOccurrencesBlue[0];
    for (var i = 1; i <= 255; i++) {
        arrayCFDRed[i] = arrayQuantityOccurrencesRed[i] + arrayCFDRed[i-1];
        arrayCFDGreen[i] = arrayQuantityOccurrencesGreen[i] + arrayCFDGreen[i-1];
        arrayCFDBlue[i] = arrayQuantityOccurrencesBlue[i] + arrayCFDBlue[i-1];
    }

    var minCFDRed = Math.min(...arrayCFDRed);
    var minCFDGreen = Math.min(...arrayCFDGreen);
    var minCFDBlue = Math.min(...arrayCFDBlue);

    for (var i = 0; i < matrizEq.length; i+=4) {
        matrizEq[i] = Math.floor(((arrayCFDRed[matrizEq[i]] - minCFDRed) / (canvas3.height*canvas3.width - minCFDRed)) * 256);
        matrizEq[i+1] = Math.floor(((arrayCFDGreen[matrizEq[i+1]] - minCFDGreen) / (canvas3.height*canvas3.width - minCFDGreen)) * 256);
        matrizEq[i+2] = Math.floor(((arrayCFDBlue[matrizEq[i+2]] - minCFDBlue) / (canvas3.height*canvas3.width - minCFDBlue)) * 256);
    }

    console.log(arrayQuantityOccurrencesRed)
    console.log(arrayQuantityOccurrencesGreen)
    console.log(arrayQuantityOccurrencesBlue)
    console.log(matrizEq[0])
    console.log(image3.data);
    console.log(imageEq.data);
    // var matrizEq = imageEq.data;
    ctxEq.putImageData(imageEq, 0, 0);
}