class Hand {
    constructor(x,y,w,h,degreeDisplacementUnit,initialDeg,unitStepTime){
        this.displacementUnit = degreeDisplacementUnit; //radian
        this.currentDeg = initialDeg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxIndex = Math.PI*2/this.displacementUnit;
        this.accumulator = 0;
        this.unitStepTime = unitStepTime;
        this.currentIndex = this.currentDeg/this.displacementUnit;
        this.handColor = "rgb(0,0,0)";
    }
    update(dt){
        this.accumulator+=dt;
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
        this.outerPadding = 20; //px
        this.angle = this.label*Math.PI/6;
        this.x = this.clock.x + this.clock.radius*Math.cos(this.angle) -(this.outerPadding*Math.cos(this.angle));
        this.y = this.clock.y + this.clock.radius*Math.sin(this.angle) -(this.outerPadding*Math.sin(this.angle));
        
    }
    update(dt){

    }
    render(ctx){
        //temp code
        ctx.fillStyle="red";
        ctx.beginPath();
        ctx.arc(this.x,this.y,10,0,Math.PI*2);
        ctx.fill();
    }
}

class Clock {
    constructor(radius,hrs=0,mins=0,secs=0,app){
        this.app = app;
        this.x = this.app.canvasWidth/2;
        this.y = this.app.canvasHeight/2;
        this.radius = radius;
        this.hrs = hrs;
        this.mins = mins;
        this.secs = secs;
        this.noLabels = 12;
        this.labelingDegreeDiff =2*Math.PI / this.noLabels;
        this.startingLabel = 3;
        this.labels = [];
        for(let i=0; i<this.noLabels; i++){
            this.labels.push(new Label(this,(3+i)%this.noLabels));
        }
        this.secondHand = new Hand(this.x,this.y,200,6,(Math.PI/(6*5)),0,1);
        this.minuteHand = new Hand(this.x,this.y,200,10,(Math.PI/(30)),0,60);
    }
    update(dt){
        this.secondHand.update(dt);
        this.minuteHand.update(dt);
    }
    render(ctx){
        //outer body rendering
        ctx.fillStyle = "rgb(197, 188, 188)";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        //labels rendering
        this.renderLabels(ctx);
        this.renderHands(ctx);
        ctx.fillStyle="black";
        ctx.fillRect(this.x-4,this.y-4,8,8);
    }
    renderLabels(ctx){
        for(const label of this.labels){
            label.render(ctx);
        }
    }
    renderHands(ctx){
        this.minuteHand.render(ctx);
        this.secondHand.render(ctx);
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
        this.clock = new Clock(200,0,0,0,this);
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
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

        this.clock.render(ctx);
    }
}

const clockApp = new ClockApp();