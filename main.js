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
    CARTOON : new Theme(
        "#FFD93D","#6BCBFF","#FFFFFF","#2B2B2B","#FF4D4D","rgba(0,0,0,0.25)","bold 28px Fredoka"),
    LUXURY : new Theme(
        "#C89B3C","#0F0F0F","#E8D7A5","#F4F1EA","#D72638","rgba(0,0,0,0.65)","bold 26px Georgia"),
    MODERN : new Theme(
        "#6E7B8B","#161A20","#C9D6DF","#F1F5F9","#38BDF8","rgba(0,0,0,0.55)","600 26px Segoe UI"),
    OLD : new Theme(
        "#B87333","#1B1B1B","#D8C3A5","#F7F3EE","#FF6B35","rgba(0,0,0,0.7)","bold 30px Garamond"),
    REALISTIC : new Theme(
        "#9AA3AD","#F2F2F2","#1E1E1E","#111111","#D62828","rgba(0,0,0,0.18)","bold 26px Helvetica"),
    FUTURISTIC : new Theme(
        "#00E5FF","#0A0F1C","#7DF9FF","#EAFBFF","#FF2E88","rgba(0,0,0,0.65)","600 28px Orbitron"),
    MINIMAL : new Theme(
        "#D9D9D9","#FAFAFA","#2B2B2B","#111111","#FF3B30","rgba(0,0,0,0.10)","500 25px Helvetica"),
    MIDNIGHT : new Theme(
        "#4B5563","#111827","#E5E7EB","#F9FAFB","#60A5FA","rgba(0,0,0,0.75)","bold 27px Trebuchet MS"),
    WOOD : new Theme(
        "#7B4F2C","#E8DCC8","#3a2215","#2B1B0E","#A63D40","rgba(60,30,10,0.35)","bold 28px Palatino Linotype"),
    INDUSTRIAL : new Theme(
        "#5A5A5A","#2A2A2A","#D6D3D1","#E7E5E4","#F59E0B","rgba(0,0,0,0.7)","bold 26px Impact"),
    HOLOGRAM : new Theme(
        "#6EE7FF","#07131F","#67E8F9","#DFFAFF","#A855F7","rgba(0,0,0,0.6)","600 28px Orbitron")
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
        this.currentTheme = Themes.WOOD;
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
        this.secondHand = new Hand(this.x,this.y,this.radius*0.88,6,(Math.PI/(6*5)),initialDeg,1,this.currentTheme.secondHandColor,0);
        initialDeg = ((Math.PI/30)*this.mins) - Math.PI/2;
        this.minuteHand = new Hand(this.x,this.y,this.radius*0.88,8,(Math.PI/(30)),initialDeg,60,this.currentTheme.handsColor,this.secs);
        initialDeg = ((Math.PI/30)*this.hrs) - Math.PI/2;
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
        ctx.fillStyle = this.currentTheme.innerShadowColor;
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
        this.clock = new Clock(200,(now.getHours() + 1 )%12,now.getMinutes(),now.getSeconds(),this);
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