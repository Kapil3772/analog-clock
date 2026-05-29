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

const Themes = {
    BLACK_ICE : new Theme(
        "rgba(210,230,255,0.22)","rgba(8,12,18,0.92)","#F3FAFF","#FFFFFF","#72D8FF","rgba(0,0,0,0.82)","600 28px Segoe UI"),
    TITANIUM : new Theme(
        "rgba(200,205,215,0.30)","rgba(26,30,36,0.94)","#EDF2F7","#FAFAFA","#8BA3B8","rgba(0,0,0,0.75)","600 27px Helvetica"),
    GOLDEN_HOUR : new Theme(
        "rgba(255,210,120,0.32)","rgba(28,18,12,0.92)","#FFE8B6","#FFF7E8","#F9B233","rgba(0,0,0,0.70)","600 28px Georgia"),
    CRIMSON_NIGHT : new Theme(
        "rgba(255,120,120,0.26)","rgba(20,8,10,0.94)","#FFE3E3","#FFF5F5","#FF4D6D","rgba(0,0,0,0.82)","600 28px Georgia"),
    ARCTIC_GLASS : new Theme(
        "rgba(220,240,255,0.22)","rgba(18,28,40,0.55)","#F5FBFF","#FFFFFF","#8AD7FF","rgba(0,0,0,0.40)","600 27px Segoe UI"),
    DEEP_OCEAN : new Theme(
        "rgba(80,170,255,0.28)","rgba(6,22,38,0.94)","#DDF5FF","#F8FDFF","#00B4FF","rgba(0,0,0,0.78)","600 27px Segoe UI"),
    VIOLET_DREAM : new Theme(
        "rgba(200,150,255,0.28)","rgba(18,10,28,0.94)","#F6EAFF","#FFF8FF","#C77DFF","rgba(0,0,0,0.78)","600 28px Segoe UI"),
    EMBER : new Theme(
        "rgba(255,170,120,0.24)","rgba(24,10,6,0.95)","#FFE7D9","#FFF7F0","#FF7A45","rgba(0,0,0,0.82)","600 28px Trebuchet MS"),
    MOONLIGHT : new Theme(
        "rgba(255,255,255,0.18)","rgba(18,18,24,0.88)","#F5F7FA","#FFFFFF","#A5B4FC","rgba(0,0,0,0.72)","600 27px Helvetica"),
    ROYAL : new Theme(
        "rgba(150,120,255,0.30)","rgba(10,10,25,0.94)","#EFE8FF","#FFFFFF","#7C5CFF","rgba(0,0,0,0.82)","600 28px Georgia")
};
class Hand {
    constructor(x,y,w,h,degreeDisplacementUnit,initialDeg,unitStepTime,color,initAccumulatorTime=0){
        this.displacementUnit = degreeDisplacementUnit; //radian
        this.currentDeg = initialDeg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.handColor = color;
        this.maxIndex = Math.PI*2/this.displacementUnit;
        this.accumulator = initAccumulatorTime;
        this.unitStepTime = unitStepTime;
        this.currentIndex = this.currentDeg/this.displacementUnit;
    }
    update(dt){
        this.changed = false;
        this.accumulator += dt;
        if(this.accumulator>=this.unitStepTime){
            this.accumulator-=this.unitStepTime;
            this.currentIndex = (this.currentIndex+1) % this.maxIndex;
            this.currentDeg = this.displacementUnit*this.currentIndex;
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
        this.currentTheme = Themes.VIOLET_DREAM;
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
        this.secondHand = new Hand(this.x,this.y,this.radius*0.88,6,(Math.PI/(6*5)),initialDeg,1,this.currentTheme.secondHandColor,accumulatedTime);
        initialDeg = ((Math.PI/30)*this.mins) - Math.PI/2;
        this.minuteHand = new Hand(this.x,this.y,this.radius*0.88,8,(Math.PI/(30)),initialDeg,60,this.currentTheme.handsColor,this.secs);
        initialDeg = ((Math.PI/6)*this.hrs) - Math.PI/2;
        this.hourHand = new Hand(this.x,this.y,this.radius*0.5,10,(Math.PI/6),initialDeg,(60*60),this.currentTheme.handsColor,this.mins*60);
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