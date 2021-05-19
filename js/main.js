/** @type {HTMLFrameElement} */
window.onload = function(){
    var mainScene = document.querySelector(".mainScene");
    var scenen1 = document.querySelector(".scene1");
    var scenen2 = document.querySelector(".scene2");
    var scenen3 = document.querySelector(".scene3");
    var door1 = document.querySelector("#door1");
    var door2 = document.querySelector("#door2");
    var yanhuabackground = document.querySelector(".scene2DivYanHuaBackGround");
    var plane = document.querySelector(".scene1PlaneImg");
    var qiqiu1 = document.querySelector(".scene1QiQiu1Img");
    var qiqiu2 = document.querySelector(".scene1QiQiu2Img");
    var qiqiu3 = document.querySelector(".scene1QiQiu3Img");
    var qiqiu4 = document.querySelector(".scene1QiQiu4Img");
    var qiqiu5 = document.querySelector(".scene1QiQiu5Img");
    var train = document.querySelector(".scene1DivGaotie");
    var yanhuahuomiao = document.querySelector(".scene1YanhuaHuomiaoImg");
    var yanhuaxuebituChild = document.querySelector(".YanHuaXueBiTuImg");
    var daCiBa = document.querySelector(".scene2DaCiBaImg");
    var chuiyan = document.querySelector(".scene2ChuiYanImg");
    var child = document.querySelector(".scene2ChildRunImg");
    var childParent = document.querySelector(".scene2DivChildRun");
    var bengbengmubu = document.querySelector(".scene3BengBengMuBuImg");
    

    var w,h;
    var startX,endX,speedDrag = 0;
    var isM= 1;
    var top,right,M10Top,y;
    var time1,time2;

    w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight; 

    init();
    getState();
    setInterval(() => {
        speedDrag = 3;
        move();
    }, 5);
    function init(){
        
        scenen2.style.transformOrigin = "0% 50%";
        scenen2.style.transform = "matrix(" + 1.5 + ",0,0," + 1.5 + "," + 0 + "," + 0 +")";
        scenen2.style.left = scenen1.clientWidth - w + "px";
        scenen3.style.left = scenen1.clientWidth + scenen2.clientWidth + "px";
        mainScene.style.width = (scenen1.clientWidth + scenen2.clientWidth + scenen3.clientWidth - w) + "px";
    }
    function getMovingScale(){
        return getState(mainScene,"clientRect").right / mainScene.clientWidth;
    }
    var getMovingScaleDate;
    window.onresize = function(){
        init();
    }


    mainScene.addEventListener("mousedown",function(ev){
        startX = ev.x;
        window.onmousemove =function(ev){
            mouseMove(ev);
        }
        // mainScene.addEventListener("mousemove",mouseMove,false);
        ev.preventDefault && ev.preventDefault();
        ev.stopPropagation();
        window.onmouseup = function(){
            window.onmousemove = window.onmouseup = " ";
        }
    },false);
    
    
    // mainScene.addEventListener("mouseup",function(ev){
    //     // mainScene.removeEventListener("mousemove",mouseMove,false);
    //     document.onmousemove = "";
    //     ev.preventDefault && ev.preventDefault();
    //     ev.stopPropagation();
    // },false);
    
    function ControlMoveScale(object){
        this.object = object;
        var scalex = 0,scaley = 0,translatex = 0,translatey = 0;
        this.controlMoveScale = function(scaleX,scaleY,translateX,translateY){
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.translateX = translateX;
            this.translateY = translateY;
            if(this.scaleX != -1)
                scalex = speedDrag * 0.01 * this.scaleX;
            if(this.scaleY != -1)
                scaley = speedDrag * 0.01 * this.scaleY;
            if(this.translateX != -1)
                translatex = this.object.getBoundingClientRect().left - speedDrag * this.translateX;
            if(this.translateY != -1)
                translatey = this.object.getBoundingClientRect().top - speedDrag * this.translateY;
            this.object.style.transform = "matrix(" + (getState(this.object,"scaleX")+scalex) + ",0,0," + (getState(this.object,"scaleX")+scaley) + "," + translatex + "," + translatey +")";
        }
    }
    function XueBi(object,startI,endI,count,isBoll){
        this.object = object;
        this.startI = startI;
        this.endI = endI;
        this.count = count;
        this.i = 0;
        this.isBoll = isBoll;
        var x = 0,xx = 0;
        this.xuebi = function(){
            x += speedDrag;
            if(x >= 100){
                x = 0;
                this.i += 1;
                if(this.i > this.endI) 
                    this.i = this.endI - 1;  
                if(isBoll){
                    if(this.i == this.endI - 1)
                        this.i = 0;
                }             
            }
            if(x <= -100){
                this.i--;
                if(this.i < 0) 
                    this.i = 0;
                x = 0;
                if(isBoll){
                    if(this.i == 0)
                        this.i = this.endI - 1;
                } 
            }
            if(this.i < this.endI){
                xx = (this.i + this.startI - 1)/this.count*100 ;
                this.object.style.transform = "translateX(" + -xx + "%)";
            }
            if(!isBoll){
                if(this.i == this.startI - 1)
                    return "Start";
                else if(this.i == this.endI - 1)
                    return "End";
                else
                    return "Null";
            }
            
        }
    }
    function XueBiAuto(object,startI,endI,count){
        this.object = object;
        this.startI = startI;
        this.endI = endI;
        this.count = count;
        this.i = 0;
        var x = 0,xx = 0;
        this.xueBiAuto = function(){
            x += 10;
            if(x >= 100){
                x = 0;
                this.i ++;
                if(this.i > this.endI) this.i = this.endI - 1;               
            }
            if(this.i < this.endI){
                xx = (this.i + this.startI - 1)/this.count*100 ;
                this.object.style.transform = "translateX(" + -xx + "%)";
            }
            if(this.i == this.endI - 1)
                this.i = 0;
        }
    }
    // var xueBiAuto = (function (){
    //     var x = 0,i = 0;
    //     return function(object,startI,endI,count){
            
    //     }
    // })();
    var daCiBaCMS = new XueBiAuto(daCiBa,1,7,7);
    var chuiYanCMS = new XueBiAuto(chuiyan,1,11,11);
    

    time1 =setInterval(() => {
        if(isM == 3 || isM == 4 || isM == 5)
            daCiBaCMS.xueBiAuto();
    }, 20);
    time2 = setInterval(() => {
        if(isM == 3 || isM == 4 || isM == 5)
            chuiYanCMS.xueBiAuto();
    }, 10);
    
    
    var mainSceneCMS = new ControlMoveScale(mainScene);
    var Scene1CMS = new ControlMoveScale(scenen1);
    var Scene2CMS = new ControlMoveScale(scenen2);
    var ChildMoveCMS = new ControlMoveScale(childParent);
    var Yanhua = new XueBi(yanhuaxuebituChild,1,19,19,false);
    var bengbengmubuCMS = new XueBi(bengbengmubu,1,7,7,false);
    var ChildCMS = new XueBi(child,1,12,14,true);
    var Child2CMS = new XueBi(child,12,13,14,false);
    
    // console.log(getState(mainScene,"scaleX"));
    // console.log(getState(mainScene,"translateX"));
    // console.log(getState(mainScene,"translateY"));
    // console.log(getState(mainScene,"clientRect").top);
    // console.log(getState(mainScene,"clientRect").bottom);
    // console.log(getState(mainScene,"clientRect").left);
    // console.log(getState(mainScene,"clientRect").right);
    function getState(object, string){
        if(string == "scaleX")
            return parseFloat(getComputedStyle(object , null)["transform"].substring(7).split(',')[0]);
        if(string == "scaleY")
            return parseFloat(getComputedStyle(object , null)["transform"].substring(7).split(',')[3]);
        if(string == "translateX")
            return parseFloat(getComputedStyle(object , null)["transform"].substring(7).split(',')[4]);
        if(string == "translateY")
            return parseFloat(getComputedStyle(object , null)["transform"].substring(7).split(',')[5]);
        if(string == "clientRect")
            return {
                top : object.getBoundingClientRect().top,
                bottom : object.getBoundingClientRect().bottom,
                left : object.getBoundingClientRect().left,
                right : object.getBoundingClientRect().right,
                height : object.getBoundingClientRect().height,
                width : object.getBoundingClientRect().width

            }
    }
    function isForward(){
        if(speedDrag > 0) return true;
        else return false;
    }
    var M1 = (function (){
        var x = 0, y = 0, x2 = 0, y2 = 0, q1X = 0, q1Y = 0, q2X = 0, q2Y = 0, q3X = 0, q3Y = 0, q4X = 0, q4Y = 0, q5X = 0, q5Y = 0;
        return function(){
            if(getState(scenen1,"clientRect").right >= w || !isForward()){//这次动作的条件
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (mainScene.getBoundingClientRect().left - speedDrag) + "," + 0 +")";
                x += speedDrag*1.5;
                y += speedDrag*0.2;
                x2 += speedDrag*0.2;
                y2 += speedDrag*0.25;
                q1X += speedDrag*1;q1Y += speedDrag*1;
                q2X += speedDrag*2;q2Y += speedDrag*2;
                q3X += speedDrag*1.5;q3Y += speedDrag*1.5;
                q4X += speedDrag*1.2;q4Y += speedDrag*1.2;
                q5X += speedDrag*0.8;q5Y += speedDrag*0.8;
                plane.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x + "," + -y +")";
                qiqiu1.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -q1X + "," + -q1Y +")";
                qiqiu2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -q2X + "," + -q2Y +")";
                qiqiu3.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -q3X + "," + -q3Y +")";
                qiqiu4.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -q4X + "," + -q4Y +")";
                qiqiu5.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -q5X + "," + -q5Y +")";
                if(getState(scenen1,"clientRect").left >= -getState(scenen1,"clientRect").width*0.16){//控制火车停止
                    train.style.transform = "matrix(" + (getState(train,"scaleX") + speedDrag * 0.001) + ",0,0," + (getState(train,"scaleX") + speedDrag * 0.001) + "," + x2 + "," + y2 +")";
                }
            }if(getState(mainScene,"translateX") > 0){//防止开始滑动过去
                x = 0; y = 0; x2 = 0; y2 = 0; q1X = 0; q1Y = 0; q2X = 0; q2Y = 0; q3X = 0; q3Y = 0; q4X = 0; q4Y = 0; q5X = 0; q5Y = 0;
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                plane.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                train.style.transform = "matrix(" + 0.5 + ",0,0," + 0.5 + "," + 0 + "," + 0 +")";
                qiqiu1.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                qiqiu2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                qiqiu3.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                qiqiu4.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                qiqiu5.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
            }if(isForward() && getState(scenen1,"clientRect").right <= w && getState(scenen1,"scaleX") <= 1){//下个动作的条件
                isM = 2;
            }
        }
    })();
    function M2(){
        console.log("2");
        var x = w - scenen1.clientWidth;
        if(getState(mainScene,"translateX") != x)
            mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x + "," + 0 +")";
        scenen1.style.transformOrigin = "100% 40%";
        if(getState(scenen1,"scaleX") <= 2.21  || !isForward())//这次动作的条件
            Scene1CMS.controlMoveScale(0.11,0.11,-1,-1);
        else{//下个动作的条件
            isM = 3;
        }
        if(!isForward() && getState(scenen1,"scaleX") <= 1){//回到上一个动作的条件
            scenen1.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
            mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x + "," + 0 +")";
            isM = 1;
        } 
    }
    var M3 = (function (){
        var x = 0;
        return function() {
            console.log("3");
            door1.style.transformOrigin = "100% 50%";
            door2.style.transformOrigin = "100% 50%";
            x += speedDrag * 0.1;
            if(x > 0 && x <= 85){//这次动作条件
                door1.style.transform = "rotateY(" + (-x) + "deg)";
                door2.style.transform = "rotateY(" + (-x) + "deg)";
            }
            if(getState(scenen2,"scaleX") <= 1 && isForward()){//下个动作
                // x3 = getState(scenen2,"clientRect").left;
                isM = 4;
            }
            if(x > 50 || !isForward()){
                scenen1.style.opacity = (1-(x-50)*0.05) + "";
                if(getState(scenen2,"scaleX") <= 1.5)
                    Scene2CMS.controlMoveScale(-0.11,-0.11,-1,-1);
                if(getState(scenen2,"scaleX") > 1.5)
                    scenen2.style.transform = "matrix(" + 1.5 + ",0,0," + 1.5 + "," + 0 + "," + 0 +")";
                scenen2.style.transformOrigin = "0% 50%";
            }
            if(x <= 0){//回到上一个动作
                scenen1.style.opacity = "1";
                door1.style.transform = "rotateY(0deg)";
                door2.style.transform = "rotateY(0deg)";
                scenen2.style.transform = "matrix(1.5, 0, 0, 1.5, 0, 0)";
                isM = 2;
            }
        }
    })();
    var M4 = (function (){
        return function () {
            console.log("4");
            mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (getState(mainScene,"translateX")) + "," + 0 +")";
            scenen2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
            scenen1.style.opacity = "0";
            mainSceneCMS.controlMoveScale(-1,-1,1,-1);//当前动作
            mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (getState(mainScene,"translateX")) + "," + 0 +")";
            if(getState(scenen2,"clientRect").left >= 0){//回到上一个动作
                // var x = w - scenen1.clientWidth;
                // mainScene.style.transform = "matrix(" + getState(mainScene,"scaleX") + ",0,0," + getState(mainScene,"scaleX") + "," + x + "," + 0 +")";
                isM = 3;
            }
            if(getState(scenen2,"clientRect").right <= scenen2.clientWidth *0.85){//下一个动作 getState(scenen2,"clientRect").width = scenen2.clientWidth
                isM = 5;
            }
        }
    })();
    var M5 = (function(){
        
        return function(){
            console.log("5");
            scenen2.style.transformOrigin = "50% 50%";
            if(getState(scenen2,"scaleX") < 6 || !isForward()){//当前动作
                Scene2CMS.controlMoveScale(0.5,0.5,-1,-1);//放大
                top = getState(mainScene,"clientRect").top;
            }
            if(!isForward() && getState(scenen2,"scaleX") <= 1){//回到上个动作
                scenen2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (getState(mainScene,"translateX")) + "," + 0 +")";
                isM = 4;
            }
            if(getState(scenen2,"scaleX") >= 6){//下个动作
                isM = 6;
            }
            
        }
    })();
    var M6 = (function (){
        var x = 0, y = 0;
        return function(){
            console.log("6");
            scenen2.style.transformOrigin = "50% 50%";
            if(getState(scenen2,"clientRect").bottom > h || !isForward()){//当前动作
                mainSceneCMS.controlMoveScale(-1,-1,0.6,1);//右下移动
                right = getState(mainScene,"clientRect").right;
                x += speedDrag; y += speedDrag;
                childParent.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (x*0.1) + "," + (y*0.16) +")";//右下移动
            }else {//下个动作
                isM = 7;
            }
            if(getState(mainScene,"clientRect").top >= top)//回到上个动作
                isM = 5;
            
        }
    })();
    var M7 = (function (){
        var x = 0;
        return function(){
            console.log("7");
            if(getState(scenen2,"clientRect").left > -getState(scenen2,"clientRect").width * 0.5 || !isForward()){//当前动作
                x = getState(childParent,"translateX") + speedDrag*0.15;
                childParent.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (x) + "," + (getState(childParent,"translateY")) +")";//右移
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (mainScene.getBoundingClientRect().left - speedDrag) + "," + getState(scenen2,"clientRect").top/2 +")";//右移
                scenen2.style.transformOrigin = "50% 50%";
            }
            else {//下个动作
                isM = 8;
            }
            if(getState(mainScene,"clientRect").right >= right)//回到上个动作
                isM = 6;
        }
    })();
    var M8 = (function (){ 
        var x = 0;
        return function(){
            if(getState(scenen2,"scaleX") > 1 || !isForward()){//当前动作
                x = getState(childParent,"translateX") + speedDrag*0.15;
                childParent.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (x) + "," + (getState(childParent,"translateY")) +")";//右移
                Scene2CMS.controlMoveScale(-0.6,-0.6,-1,-1);//缩小
                scenen2.style.transformOrigin = "50% 100%";
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + getState(mainScene,"translateX") + "," + 0 +")";//右移
            }
            else {//下个动作
                scenen2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                isM = 9;
            }
            if(getState(scenen2,"scaleX") >= 6 && !isForward())//回到上个动作
                isM = 7;
        }
    })();
    var M9 = (function (){ 
        return function(){
            if(getState(scenen2,"clientRect").left >= (-getState(scenen2,"clientRect").width + w) || !isForward())
                {
                    scenen2.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                    mainSceneCMS.controlMoveScale(-1,-1,1,0);//右移动
                }
            else{
                var x = scenen1.clientWidth + scenen2.clientWidth - 2 * w;
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -x + "," + 0 +")";
                yanhuabackground.style.width = w + "px";
                yanhuabackground.style.height = h + "px";
                yanhuabackground.children[0].src = "images/烟花背景.jpg";
                isM = 10;
            }
            if(getState(scenen2,"clientRect").left >= -getState(scenen2,"clientRect").width * 0.5 && !isForward())
                isM = 8;
        }
    })();
    var M10 = (function (){ 
        return function(){
            if(getState(scenen2,"scaleX") <= 4 || !isForward()){
                Scene2CMS.controlMoveScale(0.4,0.4,-1,-1);//放大
                scenen2.style.transformOrigin = "90% 60%";
            }
            else{
                scenen2.style.transform = "matrix(" + 4 + ",0,0," + 4 + "," + 0 + "," + 0 +")";
                M10Top = getState(scenen2,"clientRect").top;
                yanhuabackground.style.left = (- getState(mainScene,"clientRect").left) + "px";
                yanhuabackground.style.top = -h + "px";
                isM = 11;
            }
            if(getState(scenen2,"scaleX") <= 1 && !isForward())
                isM = 9;
        }
    })();
    var M11 = (function (){ 
        var y2 = 0;
        return function(){
            var x;
            y = getState(scenen3,"clientRect").top - h * 1.01;
            if(getState(yanhuabackground,"clientRect").top <= 0 || !isForward()){
                console.log("11");
                y2 += speedDrag*0.38;
                yanhuahuomiao.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + -y2 +")";
                yanhuahuomiao.style.opacity = "1";
                mainSceneCMS.controlMoveScale(-1,-1,0,-1.5);//上移动
                x = getState(mainScene,"clientRect").top;
                if(getState(scenen2,"clientRect").top <= 0){
                    yanhuabackground.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + -x +")";
                }
                y = getState(scenen3,"clientRect").top - h * 1.01;
            }
            else{
                yanhuahuomiao.style.opacity = "0";
                mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + getState(mainScene,"translateX") + "," + x +")";
                y = getState(scenen3,"clientRect").top - h*1.01;
                console.log(y);
                isM = 12;
            }
            if(getState(scenen2,"clientRect").top <= M10Top && !isForward()){
                yanhuahuomiao.style.opacity = "0";
                // scenen3.style.transform = "matrix(" + 4 + ",0,0," + 4 + "," + (getState(scenen3,"translateX")) + "," + (getState(scenen3,"translateY")) +")";
                scenen2.style.transform = "matrix(" + 4 + ",0,0," + 4 + "," + 0 + "," + (M10Top) +")";
                // scenen2.style.transform = "scale(4)";
                scenen3.style.opacity = "0";
                y = getState(scenen3,"clientRect").top - h*1.01;
                isM = 10;
            }
                
        }
    })();
    var M12 = (function (){ 
        return function(){
            console.log("12");
            if(Yanhua.xuebi() == "End" && isForward()){//下一个动作
                console.log("12-13");
                isM = 13;
            }
            if(Yanhua.xuebi() == "Null" || !isForward()){//当前动作
                console.log("12-12");
                Yanhua.xuebi();
            }
                
            if(Yanhua.xuebi() == "Start"  && !isForward()){//回到上一个动作
                console.log("12-11");
                isM = 11;
            }
        }
    })();
    var M13 = (function (){ 
        return function(){
            var x;
            console.log("13");
            if(getState(yanhuabackground,"clientRect").bottom >= 0 || !isForward()){
                scenen2.style.zIndex = "-1";
                scenen3.style.opacity = "1";
                scenen3.style.transformOrigin = "15% 0%";
                scenen3.style.transform = "matrix(" + 4 + ",0,0," + 4 + "," + -2*w + "," + (-y) +")";
                mainSceneCMS.controlMoveScale(-1,-1,0,1.5);//下移动
            }
            else{
                isM = 14;
            }
            if(getState(yanhuabackground,"clientRect").top >= 0 && !isForward()){
                // x = getState(mainScene,"clientRect").top;
                // yanhuabackground.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + -x +")";
                scenen3.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + 0 +")";
                scenen3.style.opacity = "0";
                scenen2.style.zIndex = "5";
                isM = 12;
            }
                
        }
    })();
    var M14 = (function (){ 
        return function(){
            console.log("14");
            if(getState(scenen3,"scaleX") >= 1 || !isForward()){
                // scenen3.style.display = "block";
                scenen3.style.transformOrigin = "15% 0%";
                scenen3.style.opacity = "1";
                scenen3.style.transform = "matrix(" + (getState(scenen3,"scaleX")+speedDrag * 0.01 * -0.7) + ",0,0," + (getState(scenen3,"scaleX")+speedDrag * 0.01 * -0.7) + "," + (getState(scenen3,"translateX")) + "," + (-y) +")";
                // Scene3CMS.controlMoveScale(-0.7,-0.7,0,0);//缩小
            }
            else{
                // x15 = getState(mainScene,"translateX") + getState(scenen3,"clientRect").width*0.15;
                // x15 =  mainScene.getBoundingClientRect().left + getState(scenen3,"clientRect").width*0.15;
                scenen3.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + getState(scenen3,"translateX") + "," + -y +")";
                isM = 15;
            }
            if(getState(scenen3,"scaleX") >= 4 && !isForward()){
                yanhuabackground.style.left = (- getState(mainScene,"clientRect").left) + "px";
                isM = 13;
            }
                
        }
    })();
    var M15 = (function (){ 
        return function(){
            bengbengmubu.parentNode.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (getState(bengbengmubu.parentNode,"clientRect").width) + "," + 0 +")";//左移
            // scenen3.style.transformOrigin = "100% 0%";
            if(getState(scenen3,"clientRect").right >= w || !isForward()){//这次动作的条件
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (mainScene.getBoundingClientRect().left - speedDrag) + "," + 0 +")";
                console.log("15");
                scenen3.style.transformOrigin = "100% 0%";
                // x15 =  mainScene.getBoundingClientRect().left + getState(scenen3,"clientRect").width*0.15;
                mainSceneCMS.controlMoveScale(-1,-1,1,0);//右移动
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (x15 - speedDrag) + "," +  getState(mainScene,"translateY") +")";
            }
            if(getState(scenen3,"clientRect").left >= 0){
                // x = getState(mainScene,"clientRect").top;
                // yanhuabackground.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + 0 + "," + -x +")";
                isM = 14;
            }
            if(isForward() && getState(scenen3,"clientRect").right <= w){//下个动作的条件
                // y15 = getState(mainScene,"translateY") + getState(scenen3,"clientRect").height*0.2;
                
                isM = 16;
            }   
        }
    })();
    var M16 = (function (){ 
        
        return function(){
            if(getState(scenen3,"scaleX") <= 2.21  || !isForward()){//这次动作的条件
                scenen3.style.transformOrigin = "100% 0%";
                scenen3.style.transform = "matrix(" + (getState(scenen3,"scaleX")+speedDrag * 0.01 * 0.11) + ",0,0," + (getState(scenen3,"scaleX")+speedDrag * 0.01 * 0.11) + "," + getState(scenen3,"translateX") + "," + getState(scenen3,"translateY") +")";
                
                // Scene3CMS.controlMoveScale(0.11,0.11,-1,-1);
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x15 + "," +  getState(mainScene,"translateY") +")";//右移
            }
            else{//下个动作的条件
                isM = 17;
            }
            if(!isForward() && getState(scenen3,"scaleX") <= 1){//回到上一个动作的条件
                // scenen3.style.transform = "matrix(" + 1.2 + ",0,0," + 1.2 + "," + getState(scenen3,"translateX") + "," + getState(scenen3,"translateY") +")";
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x + "," + 0 +")";
                isM = 15;
            }  
        }
    })();
    var M17 = (function (){ 
        
        return function(){
            console.log(getState(bengbengmubu.parentNode,"clientRect").right);
            if(getState(scenen3,"clientRect").right >= 0  || !isForward()){//这次动作的条件
                mainSceneCMS.controlMoveScale(-1,-1,1,0);//右移动
                bengbengmubuCMS.xuebi();
                if(getState(bengbengmubu.parentNode,"clientRect").right*0.95 >= getState(scenen3,"clientRect").right)
                    bengbengmubu.parentNode.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + (getState(bengbengmubu.parentNode,"translateX")+speedDrag)*0.9 + "," + 0 +")";//左移
                    if(getState(bengbengmubu.parentNode,"clientRect").right*0.95 < getState(scenen3,"clientRect").right)
                    bengbengmubu.parentNode.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + -(getState(bengbengmubu.parentNode,"translateX")+speedDrag)*0.9 + "," + 0 +")";//左移
                    // scenen3.style.transformOrigin = "100% 0%";
                // scenen3.style.transform = "matrix(" + (getState(scenen3,"scaleX")+speedDrag * 0.01 * 0.11) + ",0,0," + (getState(scenen3,"scaleX")+speedDrag * 0.01 * 0.11) + "," + getState(scenen3,"translateX") + "," + getState(scenen3,"translateY") +")";
                // Scene3CMS.controlMoveScale(0.11,0.11,-1,-1);
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x15 + "," +  getState(mainScene,"translateY") +")";//右移
            }
            else{//下个动作的条件
                isM = 18;
            }
            if(!isForward() && getState(scenen3,"clientRect").right >= w){//回到上一个动作的条件
                // scenen3.style.transform = "matrix(" + 1.2 + ",0,0," + 1.2 + "," + getState(scenen3,"translateX") + "," + getState(scenen3,"translateY") +")";
                // mainScene.style.transform = "matrix(" + 1 + ",0,0," + 1 + "," + x + "," + 0 +")";
                isM = 16;
            }  
        }
    })();
    function mouseMove(ev){
        endX = ev.x;
        speedDrag = startX - endX;
        getMovingScaleDate = (w - getState(mainScene,"clientRect").left) / mainScene.clientWidth;
        move();
        startX = ev.x;
        // ev.preventDefault && ev.preventDefault();
        // ev.stopPropagation();
    }
    function move(){
        if(isM == 1)
            M1();
        if(isM == 2)
            M2();
        if(isM == 3)
            M3();
        if(isM == 4)
            M4();
        if(isM == 5)
            M5();
        if(isM == 6)
            M6();
        if(isM == 7)
            M7();
        if(isM == 8)
            M8();
        if(isM == 9)
            M9();
        if(isM == 10)
            M10();
        if(isM == 11)
            M11();
        if(isM == 12)
            M12();
        if(isM == 13)
            M13();
        if(isM == 14)
            M14();
        if(isM == 15)
            M15();
        if(isM == 16)
            M16();
        if(isM == 17)
            M17();
        if(isM == 6 || isM == 7 || isM == 8){
            ChildCMS.xuebi();
        }
        if(isM == 9){
            Child2CMS.xuebi();
        }
    }
    
}