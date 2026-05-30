const Angle = {
    30 : Math.PI/6,
    10 : Math.PI/18
}

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

class CustomImageData {
    constructor(img,widthFactor=1,heightFactor=1,xOffset=0,yOffset=0,flip=false){
        this.img =img;
        this.widthFactor = widthFactor;
        this.heightFactor = heightFactor;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.flip = flip;
    }
}
class Theme {
    constructor(borderColor, bodyColor, handsColor, secondHandColor, innerShadowColor, labelFont="600 28px Georgia", labelColor="white"){
        this.borderColor = borderColor;
        this.bodyColor = bodyColor;
        this.labelColor = labelColor;
        this.handsColor = handsColor;
        this.secondHandColor = secondHandColor;
        this.innerShadowColor = innerShadowColor;
        this.labelFont = labelFont
    }
}

const Themes = {
    SubmarinerDate16610SuperLuminova : new Theme(null,null,null,null,null)
};
class Style {
    constructor(caseRad,bezelRad,transitionRingRad,dialFaceRad){
        this.caseRad = caseRad;
        this.bazelRad = bezelRad;
        this.transitionRingRad = transitionRingRad;
        this.dialFaceRad = dialFaceRad;
    }
}

const Styles = {
    SubmarinerDate16610SuperLuminova : new Style(271,null,null,null)
};

const DesignType = {
    IMAGE : "IMAGE",
    CANVAS : "CANVAS",
}
const MotionType = {
    CONTINUOUS : "CONTINUOUS",
    DISCRETE : "DISCRETE"
}

const Designs = {
    SubmarinerDate16610SuperLuminova: {
        name: "Submariner Date 16610 SuperLuminova",
        designType : DesignType.IMAGE,
        bodyImg : loadImage("assets/body.png"),
        hourHandData : {
                img:loadImage("assets/hour.png"),
                motionType:MotionType.CONTINUOUS,
                xOffset: -0.1, //meaning the hand is attached to clock at middle
                yOffset : -0.5,
                widthFactor:0.11,
                heightFactor:1,
                flip : false,
            },
        minuteHandData: {
                img:loadImage("assets/minute.png"),
                motionType:MotionType.CONTINUOUS,
                xOffset: -0.08,
                yOffset : -0.5,
                widthFactor:0.15,
                heightFactor:1,
                flip : false,
            },
        secondHandData: {
                img:loadImage("assets/second.png"),
                motionType:MotionType.DISCRETE,
                xOffset: -0.3,
                yOffset : -0.5,
                widthFactor:0.21,
                heightFactor:1,
                flip : false,
            },
        knobData : {
            img : loadImage("assets/knob.png"),
            widthFactor: 0.036,
            xOffset: 2,
            yOffset : -2,
        },
        style : Styles.SubmarinerDate16610SuperLuminova,
        theme : Themes.SubmarinerDate16610SuperLuminova,
        
        customRender(ctx,clock){
        }
    }

};




class Hand {
    constructor(x,y,w,h,unitDegreeDisplacement,initialDeg,unitStepTime,color,initAccumulatorTime=0,motionType=MotionType.DISCRETE){
        this.unitDegreeDisplacement = unitDegreeDisplacement; // radian per unit step time
        this.currentDeg = initialDeg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.handColor = color;
        this.maxIndex = Math.PI*2/this.unitDegreeDisplacement;
        this.accumulator = initAccumulatorTime;
        this.unitStepTime = unitStepTime;
        this.currentIndex = this.currentDeg/this.unitDegreeDisplacement;
        this.motionType = motionType
    }
    update(dt){
        this.changed = false;
        this.accumulator += dt;
        while(this.accumulator>=this.unitStepTime){
            this.accumulator = this.accumulator-this.unitStepTime;
            this.currentIndex = (this.currentIndex+1) % this.maxIndex;
            this.currentDeg = this.unitDegreeDisplacement*this.currentIndex;
        }

        //Continuous motion behaviour
        if(this.motionType==MotionType.CONTINUOUS){
            //Calculating Interpolated angle for hand
            let accumulatedTime = this.accumulator%this.unitStepTime;
            let accumulatedAngle = (this.unitDegreeDisplacement/this.unitStepTime)*accumulatedTime;
            this.currentDeg = (this.unitDegreeDisplacement*this.currentIndex) + accumulatedAngle;
        }
        
    }
    render(ctx,imgData){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.currentDeg);
        if(imgData!=null){
            ctx.strokeStyle = "red";
            if(imgData.flip){
                ctx.drawImage(
                    imgData.img,
                    0+imgData.xOffset+(imgData.img.width * imgData.widthFactor),
                    0+imgData.yOffset,
                    -imgData.img.width * imgData.widthFactor,
                    imgData.img.height * imgData.heightFactor
                );
            }else{
                ctx.drawImage(
                    imgData.img,
                    0+imgData.xOffset,
                    0+imgData.yOffset,
                    imgData.img.width * imgData.widthFactor,
                    imgData.img.height * imgData.heightFactor
                );
            }
            
            // ctx.strokeRect(
            //     0+imgData.xOffset,
            //     0+imgData.yOffset,
            //     imgData.img.width * imgData.widthFactor,
            //     imgData.img.height * imgData.heightFactor
            // );
        }else{
            ctx.fillStyle = this.handColor;
            ctx.fillRect(0,-this.h/2,this.w,this.h);
        }
        ctx.restore();
    }
    setHandColour(color){
        this.handColor = color;
    }
}

class Label {
    constructor(clock,label){
        this.clock = clock;
        this.label = label;
        this.outerPadding = 30; //px
        this.angle = this.label*Math.PI/6;
        this.x = this.clock.x + this.clock.radius*Math.cos(this.angle) -(this.outerPadding*Math.cos(this.angle));
        this.y = this.clock.y + this.clock.radius*Math.sin(this.angle) -(this.outerPadding*Math.sin(this.angle));
        
    }
    update(dt){

    }
    render(ctx){
        //temp code
        // ctx.fillStyle="red";
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,10,0,Math.PI*2);
        // ctx.fill();
        if(this.clock.currentDesign.theme.labelColor==null){
            ctx.fillStyle="black";
        }else{
            ctx.fillStyle = this.clock.currentDesign.theme.labelColor;
        }
        ctx.font = this.clock.currentDesign.theme.labelFont;
        let renderLabel = ((this.label + 2)%this.clock.noLabels) + 1;
        ctx.fillText(renderLabel,this.x-10,this.y+12.5);
    }
}

class Clock {
    constructor(radius,hrs,mins,secs,app){
        this.app = app;
        this.x = this.app.canvasWidth/2; //centerX
        this.y = this.app.canvasHeight/2; //centerY
        this.radius = radius;
        this.hrs = hrs;
        this.mins = mins;
        this.secs = secs;
        //Appearance
        this.currentDesign = this.app.defaultDesign;
        this.screwWidth = this.radius*0.05;
        this.screwHeight = this.screwWidth;

        this.noLabels = 12;
        this.labelingDegreeDiff =2*Math.PI / this.noLabels;
        this.startingLabel = 3;
        this.labels = [];
        for(let i=0; i<this.noLabels; i++){
            this.labels.push(new Label(this,(3+i)%this.noLabels));
        }

        let initialDeg = ((Math.PI/30)*this.secs) - Math.PI/2;
        let accumulatedTime = 0;
        this.secondHand = new Hand(this.x,this.y,
            this.radius,
            6,
            Angle[30]/5,
            initialDeg,
            1,
            this.currentDesign.theme.secondHandColor,
            accumulatedTime,
            this.currentDesign.secondHandData.motionType
        );

        initialDeg = ((Math.PI/30)*this.mins) - Math.PI/2;
        this.minuteHand = new Hand(this.x,this.y,
            this.radius*0.88,
            8,
            (Math.PI/(30)),
            initialDeg,60,
            this.currentDesign.theme.handsColor,
            this.secs,
            MotionType.CONTINUOUS
        );

        initialDeg = ((Math.PI/6)*this.hrs) - Math.PI/2;
        this.hourHand = new Hand(this.x,this.y,
            this.radius*0.5,
            10,
            (Math.PI/6),
            initialDeg,
            (60*60),
            this.currentDesign.theme.handsColor,
            this.mins*60,MotionType.CONTINUOUS
        );
    }
    update(dt){
        this.secondHand.update(dt);
        this.minuteHand.update(dt);
        this.hourHand.update(dt);
    }
    render(ctx){
        if(this.currentDesign.designType==DesignType.CANVAS){
            //outer body rendering
            ctx.fillStyle = this.currentTheme.borderColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius+18,0,Math.PI*2);
            ctx.fill();
            //Shadow rendering
            ctx.fillStyle = this.currentTheme.innerShadowColor;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius+7,0,Math.PI*2);
            ctx.fill();
            //inner Body
            ctx.fillStyle = this.currentTheme.bodyColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
            ctx.fill();

            //labels rendering
            this.renderLabels(ctx);
            this.renderHands(ctx,null);
            //Screw rendering
            ctx.fillStyle=this.currentTheme.borderColor;
            ctx.fillRect(this.x - this.screwWidth/2,this.y - this.screwHeight/2,this.screwWidth,this.screwHeight);
            ctx.strokeStyle=this.currentTheme.bodyColor;
            ctx.strokeRect(this.x - this.screwWidth/2,this.y - this.screwHeight/2,this.screwWidth,this.screwHeight);
        }else{
            const bodyImg = this.currentDesign.bodyImg;
            let imgW = this.currentDesign.style.caseRad * 2;
            let imgH = this.currentDesign.style.caseRad * 2;
            let imgX = (this.app.canvas.width - imgW)/2;
            let imgY = (this.app.canvas.height - imgH)/2;

            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(Math.PI*2/180);
            ctx.drawImage(bodyImg,-imgW/2,-imgH/2,imgW,imgH);
            ctx.restore();

            // ctx.fillStyle = "rgba(0,0,255,0.5)";
            // ctx.beginPath();
            // ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
            // ctx.fill();
            // ctx.strokeStyle = "blue";
            // ctx.strokeRect(imgX,imgY,imgW,imgH);

            const secondHandImg = this.currentDesign.secondHandData.img;
            let sizeFactor = this.currentDesign.secondHandData.widthFactor;
            imgW = secondHandImg.width*sizeFactor;
            imgH = secondHandImg.height*sizeFactor;
            let handXOffset = imgW*this.currentDesign.secondHandData.xOffset;
            let handYOffset = imgH*this.currentDesign.secondHandData.yOffset;

            this.secondHand.render(ctx,new CustomImageData(
                secondHandImg,
                sizeFactor,
                sizeFactor,
                handXOffset,
                handYOffset,
                this.currentDesign.secondHandData.flip)
            );
            const minuteHandImg = this.currentDesign.minuteHandData.img;
            sizeFactor = this.currentDesign.minuteHandData.widthFactor;
            imgW = minuteHandImg.width*sizeFactor;
            imgH = minuteHandImg.height*sizeFactor;
            handXOffset = imgW*this.currentDesign.minuteHandData.xOffset;
            handYOffset = imgH*this.currentDesign.minuteHandData.yOffset;
            this.minuteHand.render(ctx,new CustomImageData(
                minuteHandImg,
                sizeFactor,
                sizeFactor,
                handXOffset,
                handYOffset,
                this.currentDesign.minuteHandData.flip)
            );
            const hourHandImg = this.currentDesign.hourHandData.img;
            sizeFactor = this.currentDesign.hourHandData.widthFactor;
            imgW = hourHandImg.width*sizeFactor;
            imgH = hourHandImg.height*sizeFactor;
            handXOffset = imgW*this.currentDesign.hourHandData.xOffset;
            handYOffset = imgH*this.currentDesign.hourHandData.yOffset;
            this.hourHand.render(ctx,new CustomImageData(
                hourHandImg,
                sizeFactor,
                sizeFactor,
                handXOffset,
                handYOffset,
                this.currentDesign.hourHandData.flip)
            );
            const knobImg = this.currentDesign.knobData.img;
            sizeFactor = this.currentDesign.knobData.widthFactor;
            imgW = knobImg.width*sizeFactor;
            imgH = knobImg.height*sizeFactor;
            imgX = (this.x - imgW/2) + this.currentDesign.knobData.xOffset;
            imgY = (this.x - imgH/2) + this.currentDesign.knobData.yOffset;
            ctx.drawImage(knobImg,imgX,imgY,imgW,imgH);
        }
        
    }
    renderLabels(ctx){
        for(const label of this.labels){
            label.render(ctx);
        }
    }
    renderHands(ctx,imgData){
        this.minuteHand.render(ctx,null);
        this.hourHand.render(ctx,null);
    }
}

class ClockApp {
    constructor(){
        this.canvasWidth = 600;
        this.canvasHeight = 600;
        this.init();
    }
    init(){
        this.canvas = document.getElementById("Clock");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        const now = new Date();
        this.defaultDesign = Designs.SubmarinerDate16610SuperLuminova;
        this.clock = new Clock(this.defaultDesign.style.caseRad,now.getHours(),now.getMinutes(),now.getSeconds(),this);
        this.prevMs = performance.now();
        this.loop();
    }
    loop(){
        this.nowMs = performance.now();
        this.deltaTime = (this.nowMs - this.prevMs) / 1000; //to convert in seconds
        this.prevMs = this.nowMs;
        this.update(this.deltaTime);

        this.render(this.ctx);
        requestAnimationFrame(() => this.loop());
    }
    update(dt){
        this.clock.update(dt);
    }
    render(ctx){
        ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        //ctx.fillStyle = "rgb(197, 188, 188)";
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

        this.clock.render(ctx);
    }
}

const clockApp = new ClockApp();