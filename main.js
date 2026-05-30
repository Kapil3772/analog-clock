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
    constructor(caseColor, bezelColor, transitionRingColor,dialFaceColor, secondHandColor, minuteHandColor, hourHandColor, labelFont="600 28px Georgia", labelColor="white"){
        this.caseColor = caseColor;
        this.bezelColor = bezelColor;
        this.labelColor = labelColor;
        this.dialFaceColor = dialFaceColor;
        this.secondHandColor = secondHandColor;
        this.minuteHandColor = minuteHandColor;
        this.hourHandColor = hourHandColor;
        this.transitionRingColor = transitionRingColor;
        this.labelFont = labelFont
    }
}

const Themes = {
    SubmarinerDate16610SuperLuminova : new Theme(null,null,null,null,null,null,null,null,null),

    GShockStealth : new Theme(
        "#16181B","#050607","#2A2F36","#050607",
        "#FF3B3B","#E6E7E8","#F5F5F5",
        "bold 26px Impact","#D9DADB"
    ),

    BellRossPilot : new Theme(
        "#5E646A","#0D0E10","#4F545A","#111214",
        "#D84A4A","#F0F0E8","#F7F7F2",
        "600 28px Trebuchet MS","#EAE7DF"
    ),

    RoyalOakSteel : new Theme(
        "#A5ADB5","#3C434B","#717882","#2A3036",
        "#FF5E57","#E8ECEF","#F8FAFC",
        "600 27px Helvetica","#E9EDF2"
    ),

    CartierDress : new Theme(
        "#D8C7A0","#B8A57D","#E7D9B6","#F5F1E8",
        "#2F5DAA","#232323","#111111",
        "600 29px Georgia","#222222"
    ),

    DeepOcean : new Theme(
        "#66717C","#041321","#0A2235","#07141F",
        "#00B8FF","#E5F8FF","#FFFFFF",
        "600 27px Segoe UI","#DDF6FF"
    ),

    NeonCyber : new Theme(
        "#141821","#080A0D","#1A2230","#0B0F14",
        "#FF2ED1","#72D8FF","#EAFBFF",
        "600 27px Segoe UI","#79F3FF"
    ),

    VintageBronze : new Theme(
        "#8C5A35","#3A2416","#7A4D2B","#2A1B12",
        "#D14A2A","#F5E7C9","#EEDCB5",
        "600 28px Garamond","#E7D6B2"
    )
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
    SubmarinerDate16610SuperLuminova : new Style(
        271,null,null,null
    ),

    GSHOCK_STEALTH : new Style(
        1.00*271,0.86*271,0.74*271,0.68*271
    ),

    BELL_ROSS_PILOT : new Style(
        1.00*271,0.95*271,0.86*271,0.80*271
    ),

    ROYAL_OAK : new Style(
        1.00*271,0.91*271,0.82*271,0.76*271
    ),

    CARTIER_DRESS : new Style(
        1.00*271,0.97*271,0.89*271,0.83*271
    ),

    DEEP_OCEAN : new Style(
        1.00*271,0.90*271,0.82*271,0.75*271
    ),

    NEON_CYBER : new Style(
        1.00*271,0.88*271,0.78*271,0.72*271
    ),

    VINTAGE_BRONZE : new Style(
        1.00*271,0.94*271,0.85*271,0.79*271
    )
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
    },
    GSHOCK_STEALTH : {
        name: "GShock Stealth",
        designType : DesignType.CANVAS,
        hourHandData : {
                motionType:MotionType.CONTINUOUS,
                xOffset: 0,
                yOffset : 0,
                widthFactor:0.11,
                heightFactor:1,
            },
        minuteHandData: {
                motionType:MotionType.CONTINUOUS,
                xOffset: 0,
                yOffset : 0,
            },
        secondHandData: {
                motionType:MotionType.DISCRETE,
                xOffset: -0.2,
                yOffset : 0,
                widthFactor:0.21,
                heightFactor:1,
            },
        knobData : {
            widthFactor: 0.036,
            xOffset: 0,
            yOffset : 0,
        },
        style : Styles.GSHOCK_STEALTH,
        theme : Themes.GShockStealth,

    },
    BELL_ROSS_PILOT : {
        name : "Bell & Ross Pilot",
        designType : DesignType.CANVAS,

        hourHandData : {
            motionType:MotionType.CONTINUOUS,
            xOffset:0,
            yOffset:0,
            widthFactor:0.12,
            heightFactor:0.56,
        },

        minuteHandData : {
            motionType:MotionType.CONTINUOUS,
            xOffset:0,
            yOffset:0,
            widthFactor:0.08,
            heightFactor:0.78,
        },

        secondHandData : {
            motionType:MotionType.DISCRETE,
            xOffset:0,
            yOffset:0,
            widthFactor:0.02,
            heightFactor:0.88,
        },

        knobData : {
            widthFactor:0.04,
            xOffset:0,
            yOffset:0,
        },

        style:Styles.BELL_ROSS_PILOT,
        theme:Themes.BellRossPilot
    },

    ROYAL_OAK : {
        name : "Royal Oak Steel",
        designType : DesignType.CANVAS,

        hourHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.10,
            heightFactor:0.50,
            xOffset:0,yOffset:0
        },

        minuteHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.06,
            heightFactor:0.76,
            xOffset:0,yOffset:0
        },

        secondHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.015,
            heightFactor:0.90,
            xOffset:0,yOffset:0
        },

        knobData : {
            widthFactor:0.038,
            xOffset:0,yOffset:0
        },

        style:Styles.ROYAL_OAK,
        theme:Themes.RoyalOakSteel
    },

    CARTIER_DRESS : {
        name : "Cartier Dress",
        designType : DesignType.CANVAS,

        hourHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.06,
            heightFactor:0.48,
            xOffset:0,yOffset:0
        },

        minuteHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.04,
            heightFactor:0.78,
            xOffset:0,yOffset:0
        },

        secondHandData : {
            motionType:MotionType.DISCRETE,
            widthFactor:0.012,
            heightFactor:0.90,
            xOffset:0,yOffset:0
        },

        knobData : {
            widthFactor:0.032,
            xOffset:0,yOffset:0
        },

        style:Styles.CARTIER_DRESS,
        theme:Themes.CartierDress
    },

    DEEP_OCEAN : {
        name : "Deep Ocean Diver",
        designType : DesignType.CANVAS,

        hourHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.11,
            heightFactor:0.54,
            xOffset:0,yOffset:0
        },

        minuteHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.07,
            heightFactor:0.80,
            xOffset:0,yOffset:0
        },

        secondHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.018,
            heightFactor:0.92,
            xOffset:0,yOffset:0
        },

        knobData : {
            widthFactor:0.04,
            xOffset:0,yOffset:0
        },

        style:Styles.DEEP_OCEAN,
        theme:Themes.DeepOcean
    },

    NEON_CYBER : {
        name : "Neon Cyber",
        designType : DesignType.CANVAS,

        hourHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.10,
            heightFactor:0.52,
            xOffset:0,yOffset:0
        },

        minuteHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.05,
            heightFactor:0.78,
            xOffset:0,yOffset:0
        },

        secondHandData : {
            motionType:MotionType.CONTINUOUS,
            widthFactor:0.015,
            heightFactor:0.95,
            xOffset:0,yOffset:0
        },

        knobData : {
            widthFactor:0.035,
            xOffset:0,yOffset:0
        },

        style:Styles.NEON_CYBER,
        theme:Themes.NeonCyber
    }

};

class Hand {
    constructor(clock,x,y,w,h,unitDegreeDisplacement,initialDeg,unitStepTime,color,initAccumulatorTime=0,motionType=MotionType.DISCRETE){
        this.clock = clock;
        this.unitDegreeDisplacement = unitDegreeDisplacement; // radian per unit step time
        this.currentDeg = initialDeg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xOffset = 0;
        this.yOffset = 0;
        this.handColor = color;
        this.maxIndex = Math.PI*2/this.unitDegreeDisplacement;
        this.accumulator = initAccumulatorTime;
        this.unitStepTime = unitStepTime;
        this.currentIndex = this.currentDeg/this.unitDegreeDisplacement;
        this.motionType = motionType;
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
            // Debug rect
            // ctx.strokeRect(
            //     0+imgData.xOffset,
            //     0+imgData.yOffset,
            //     imgData.img.width * imgData.widthFactor,
            //     imgData.img.height * imgData.heightFactor
            // );
        }else{
            ctx.fillStyle = this.handColor;
            ctx.fillRect(0 + (this.xOffset *this.w),-this.h/2 + (this.yOffset * this.h),this.w,this.h);
        }
        ctx.restore();
    }
    setHandColour(color){
        this.handColor = color;
    }
    setOffsets(x,y){
        this.xOffset = x;
        this.yOffset = y;
    }
}

class Label {
    constructor(clock,label){
        this.clock = clock;
        this.label = label;
        this.outerPadding = 30; //px
        this.angle = this.label*Math.PI/6;
        this.x = this.clock.x + this.clock.currentDesign.style.dialFaceRad*Math.cos(this.angle) -(this.outerPadding*Math.cos(this.angle));
        this.y = this.clock.y + this.clock.currentDesign.style.dialFaceRad*Math.sin(this.angle) -(this.outerPadding*Math.sin(this.angle));
        
    }
    update(dt){

    }
    render(ctx){
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
        this.secondHand = new Hand(this,this.x,this.y,
            this.currentDesign.style.dialFaceRad,
            6,
            Angle[30]/5,
            initialDeg,
            1,
            this.currentDesign.theme.secondHandColor,
            accumulatedTime,
            this.currentDesign.secondHandData.motionType
        );

        initialDeg = ((Math.PI/30)*this.mins) - Math.PI/2;
        this.minuteHand = new Hand(this,this.x,this.y,
            this.currentDesign.style.dialFaceRad*0.88,
            8,
            (Math.PI/(30)),
            initialDeg,60,
            this.currentDesign.theme.handsColor,
            this.secs,
            MotionType.CONTINUOUS
        );

        initialDeg = ((Math.PI/6)*this.hrs) - Math.PI/2;
        this.hourHand = new Hand(this,this.x,this.y,
            this.currentDesign.style.dialFaceRad*0.5,
            10,
            (Math.PI/6),
            initialDeg,
            (60*60),
            this.currentDesign.theme.handsColor,
            this.mins*60,MotionType.CONTINUOUS
        );
        if(this.currentDesign.designType==DesignType.CANVAS){
            this.secondHand.setOffsets(this.currentDesign.secondHandData.xOffset,this.currentDesign.secondHandData.yOffset);
            this.hourHand.setOffsets(this.currentDesign.hourHandData.xOffset,this.currentDesign.hourHandData.yOffset);
            this.minuteHand.setOffsets(this.currentDesign.minuteHandData.xOffset,this.currentDesign.minuteHandData.yOffset);
        }
    }
    update(dt){
        this.secondHand.update(dt);
        this.minuteHand.update(dt);
        this.hourHand.update(dt);
    }
    render(ctx){
        if(this.currentDesign.designType==DesignType.CANVAS){
            //outer case rendering
            ctx.fillStyle = this.currentDesign.theme.caseColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.currentDesign.style.caseRad,0,Math.PI*2);
            ctx.fill();
            //bezel rendering
            ctx.fillStyle = this.currentDesign.theme.bezelColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.currentDesign.style.bezelRad,0,Math.PI*2);
            ctx.fill();
            //transition Ring rendering
            ctx.fillStyle = this.currentDesign.theme.transitionRingColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.currentDesign.style.transitionRingRad,0,Math.PI*2);
            ctx.fill();

            //dial face rendering
            ctx.fillStyle = this.currentDesign.theme.dialFaceColor;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.currentDesign.style.dialFaceRad,0,Math.PI*2);
            ctx.fill();
            //label rendering
            for(const label of this.labels){
                label.render(ctx);
            }
            //hands rendering
            this.secondHand.render(ctx,null);
            this.minuteHand.render(ctx,null);
            this.hourHand.render(ctx,null);
            //screw rendering
            ctx.fillStyle  = this.currentDesign.theme.transitionRingColor;
            ctx.beginPath();
            ctx.arc(this.x + this.currentDesign.knobData.xOffset,
                this.y + this.currentDesign.knobData.yOffset,
                this.radius*this.currentDesign.knobData.widthFactor,
                0,
                Math.PI*2
            );
            ctx.fill();
            
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
        this.defaultDesign = Designs.CARTIER_DRESS;
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