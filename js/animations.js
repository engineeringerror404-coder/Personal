document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';

    let canvasWidth = canvas.width = window.innerWidth;
    let canvasHeight = canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('touchmove', (event) => {
        if(event.touches.length > 0){
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
        }
    });
    
     window.addEventListener('touchend', (event) => {
        mouse.x = null;
        mouse.y = null;
    });


    window.addEventListener('resize', () => {
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = color;
            this.life = 1;
            this.opacity = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            if (this.life < 0) this.life = 0;
            this.opacity = this.life;
            if(this.size > 0.2) this.size -= 0.1;

        }
        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particlesArray = [];
    const colors = [
        '255, 107, 107', 
        '255, 209, 102', 
        '10, 187, 135',
        '239, 71, 111',
        '255, 209, 102',
        '6, 214, 160',
        '17, 138, 178'
    ];


    function handleParticles() {
        if (mouse.x !== null && mouse.y !== null) {
            const color = colors[Math.floor(Math.random() * colors.length)];
             for (let i = 0; i < 2; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y, color));
            }
        }

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].life <= 0) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();
});
