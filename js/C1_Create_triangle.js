var gl;
    var shaderProgram;
    var vertexBuffer;
    // ????????? ????????
    function initShaders() {
        // ???????? ???????
        var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
        var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
        //??????? ?????? ????????? ????????
        shaderProgram = gl.createProgram();
        // ??????????? ? ??? ???????
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        // ????????? ????????? ? ?????????? webgl
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("?? ?????? ?????????? ???????");
        }

        gl.useProgram(shaderProgram);
        // ????????? ???????? ?????????
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        // ?????? ????????? ??????? ??? ?????????????
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    }
    // ??????? ???????? ??????? ?? ???? ? id ????????? ? ????????? DOM
    function getShader(type,id) {
        var source = document.getElementById(id).innerHTML;
        // ??????? ?????? ?? ????
        var shader = gl.createShader(type);
        // ????????? ????????? ???????
        gl.shaderSource(shader, source);
        // ??????????? ??????
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("?????? ?????????? ???????: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    // ????????? ?????? ??????
    function initBuffers() {
        // ????????? ?????? ??????
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // ?????? ????????? ?????? ???????
        var triangleVertices = [
            0.0,  0.5,  0.0,
            -0.5, -0.5,  0.0,
            0.5, -0.5,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
        // ????????? ???-?? ?????
        vertexBuffer.itemSize = 3;
        vertexBuffer.numberOfItems = 3;
    }
    // ?????????
    function draw() {
        // ????????? ??????? ?????????
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

        gl.clear(gl.COLOR_BUFFER_BIT);

        // ?????????, ??? ?????? ??????? ????? ?? ??? ?????????? (x, y, z)
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        // ????????? ?????????? - ?????????????
        gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
    }

    window.onload=function(){
        // ???????? ??????? canvas
        var canvas = document.getElementById("canvas3D");
        try {
            // ??????? ???????? ???????? ??????????? ???????? WegGL
            // ???? ?? ?????????, ?????????? ? ?????????????????? ?????????
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {}

        // ???? ???????? ?? ??????? ????????, ??????? ?????????
        if (!gl) {
            alert("??? ??????? ?? ???????????? WebGL");
        }
        if(gl){
            // ????????? ???????? ??????? ?????????
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            // ????????? ????????
            initShaders();
            // ????????? ?????? ??????
            initBuffers();
            // ???????? ??? ? ??????-??????? ????
            gl.clearColor(1.0, 0.0, 0.0, 0.5);
            // ????????? ?????
            draw();
        }
    }