class Theme {
    constructor(borderColor, bodyColor, labelColor, handsColor, secondHandColor, innerShadowColor, labelFont){
        this.borderColor = borderColor;
        this.bodyColor = bodyColor;
        this.labelColor = labelColor;
        this.handsColor = handsColor;
        this.secondHandColor = secondHandColor;
        this.innerShadowColor = innerShadowColor;
        this.labelFont = labelFont
    }
}

const MotionType = {
    CONTINUOUS : "CONTINUOUS",
    DISCRETE : "DISCRETE"
}

const Themes = {
    ROLEX_CLASSIC : new Theme(
        "#C8A951","#111111","#E7D7A2","#F8F4E8","#D4AF37","rgba(0,0,0,0.75)","600 28px Georgia"),
    ROLEX_GREEN : new Theme(
        "#C8A951","#0E2B1F","#EADAA8","#FFF8E7","#D4AF37","rgba(0,0,0,0.78)","600 28px Georgia"),
    OMEGA_SPEEDMASTER : new Theme(
        "#A8ADB4","#121212","#E8EAED","#F8FAFC","#D63A3A","rgba(0,0,0,0.82)","600 27px Helvetica"),
    GSHOCK_STEALTH : new Theme(
        "#3D4148","#101214","#D6D8DB","#F5F5F5","#FF5C5C","rgba(0,0,0,0.88)","bold 26px Impact"),
    GSHOCK_MILITARY : new Theme(
        "#55624C","#1B1F18","#D7DCCF","#EEF2E8","#F0B429","rgba(0,0,0,0.85)","bold 26px Impact"),
    AP_ROYAL_OAK : new Theme(
        "#9EA7B3","#20242B","#F1F3F5","#FAFAFA","#7DA0C4","rgba(0,0,0,0.78)","600 27px Helvetica"),
    PATEK_NAVY : new Theme(
        "#D1B26A","#0B1833","#F2E7C8","#FFF8E8","#D6B15A","rgba(0,0,0,0.80)","600 28px Georgia"),
    SEIKO_DIVER : new Theme(
        "#D0D5DB","#0D1B2A","#EAF4FF","#F8FBFF","#3BA7FF","rgba(0,0,0,0.82)","600 27px Helvetica"),
    TAG_HEUER : new Theme(
        "#C7CCD3","#15181C","#F4F6F8","#FFFFFF","#E53935","rgba(0,0,0,0.80)","600 27px Helvetica"),
    RICHARD_MILLE : new Theme(
        "#858B93","#0B0D10","#E7EAEE","#FAFAFA","#FF7A00","rgba(0,0,0,0.88)","600 28px Segoe UI"),
    CARTIER_CLASSIC : new Theme(
        "#C8A45A","#F7F3EB","#3C3C3C","#1C1C1C","#2B5CAA","rgba(0,0,0,0.18)","600 28px Georgia"),
    PILOT_AVIATOR : new Theme(
        "#80858C","#0F1113","#F1F3F4","#FFFFFF","#FF9F1C","rgba(0,0,0,0.86)","600 27px Trebuchet MS"),
    BELL_ROSS_BEIGE : new Theme(
        "rgba(185,190,195,0.42)","rgba(221,209,181,0.96)","#2A2A2A","#111111","#7C1111","rgba(0,0,0,0.22)","600 27px Trebuchet MS")
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
    render(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.currentDeg);
        ctx.fillStyle = this.handColor;
        ctx.fillRect(-20,-this.h/2,this.w,this.h);
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
        ctx.fillStyle = this.clock.currentTheme.labelColor;
        ctx.font = this.clock.currentTheme.labelFont;
        let renderLabel = ((this.label + 2)%this.clock.noLabels) + 1;
        ctx.fillText(renderLabel,this.x-10,this.y+12.5);
    }
}

class Clock {
    constructor(radius,hrs,mins,secs,app){
        this.app = app;
        this.x = this.app.canvasWidth/2;
        this.y = this.app.canvasHeight/2;
        this.radius = radius;
        this.hrs = hrs;
        this.mins = mins;
        this.secs = secs;
        //Appearance
        this.currentTheme = Themes.BELL_ROSS_BEIGE;
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
        this.secondHand = new Hand(this.x,this.y,this.radius*0.88,6,(Math.PI/(6*5)),initialDeg,1,this.currentTheme.secondHandColor,accumulatedTime,MotionType.DISCRETE);

        initialDeg = ((Math.PI/30)*this.mins) - Math.PI/2;
        this.minuteHand = new Hand(this.x,this.y,this.radius*0.88,8,(Math.PI/(30)),initialDeg,60,this.currentTheme.handsColor,this.secs,MotionType.CONTINUOUS);

        initialDeg = ((Math.PI/6)*this.hrs) - Math.PI/2;
        this.hourHand = new Hand(this.x,this.y,this.radius*0.5,10,(Math.PI/6),initialDeg,(60*60),this.currentTheme.handsColor,this.mins*60,MotionType.CONTINUOUS);
    }
    update(dt){
        this.secondHand.update(dt);
        this.minuteHand.update(dt);
        this.hourHand.update(dt);
    }
    render(ctx){
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
        this.renderHands(ctx);
        //Screw rendering
        ctx.fillStyle=this.currentTheme.borderColor;
        ctx.fillRect(this.x - this.screwWidth/2,this.y - this.screwHeight/2,this.screwWidth,this.screwHeight);
        ctx.strokeStyle=this.currentTheme.bodyColor;
        ctx.strokeRect(this.x - this.screwWidth/2,this.y - this.screwHeight/2,this.screwWidth,this.screwHeight);
    }
    renderLabels(ctx){
        for(const label of this.labels){
            label.render(ctx);
        }
    }
    renderHands(ctx){
        this.secondHand.render(ctx);
        this.minuteHand.render(ctx);
        this.hourHand.render(ctx);

    }
}

class ClockApp {
    constructor(){
        this.canvasWidth = 500;
        this.canvasHeight = 500;
        this.init();
    }
    init(){
        this.canvas = document.getElementById("Clock");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        const now = new Date();
        this.clock = new Clock(200,now.getHours(),now.getMinutes(),now.getSeconds(),this);
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
        ctx.fillStyle = "rgb(197, 188, 188)";
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

        this.clock.render(ctx);
    }
}

const clockApp = new ClockApp();