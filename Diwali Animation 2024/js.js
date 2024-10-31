const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let rocketArray = [];
let sparklesArray = [];

function Rockets() {
    
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = window.innerHeight;

    this.color = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`;
    this.size = Math.floor(Math.random() * 5 + 5);
    this.speedY = Math.random() * 5 + 5;
    this.crackRocketY = Math.floor(window.innerHeight - ((Math.random() * window.innerHeight) + 100))

    this.update = ()=>{
        this.y -= this.speedY;
    }

    this.draw = ()=>{
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}


function Sparkles(x,y,color) {
    
    this.x = x;
    this.y = y;

    this.color = color;
    this.size = Math.floor(Math.random() * 3 + 6);
    this.speedY = Math.random() * 2 - 2;
    this.speedX = Math.round((Math.random() - 0.5) * 10);
    this.velocity = Math.random() / 5;


    this.update = ()=>{
        if (this.size > .2) {
            this.size -= .1
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += this.velocity;
    }

    this.draw = ()=>{
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

function renderRockets() {
    for (let i = 0; i < rocketArray.length; i++) {
        rocketArray[i].draw(); 
        rocketArray[i].update(); 
        if (rocketArray[i].y <= rocketArray[i].crackRocketY) {
            for (let index = 0; index < 20; index++) {
                sparklesArray.push(new Sparkles(rocketArray[i].x,rocketArray[i].y,rocketArray[i].color))
            }
            rocketArray.splice(i, 1);
            i--;
        }
    }
}

function renderSparkles() {
    for (let i = 0; i < sparklesArray.length; i++) {
        sparklesArray[i].draw(); 
        sparklesArray[i].update(); 
        if (sparklesArray[i].size <= .2) {
            sparklesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    context.fillStyle = `rgba(24,28,31,.2)`;
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = `white`
    renderRockets();
    renderSparkles();
    requestAnimationFrame(animate);
}


animate()


setInterval(()=>{
    for (let i = 0; i < 4; i++) {
        rocketArray.push(new Rockets());
    }
},600)