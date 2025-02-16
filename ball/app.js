// link space variable with canvas element
const canvas = document.getElementById("space");
const space = canvas.getContext("2d");

// returns a particle object with xy coord and 0 xy velocities
function createParticle(x, y) {
    return { x: x, y: y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10 }; // Random velocity
}

// Collision detection with the ring
function collisionDetection(particle) {
    const centerX = 600;
    const centerY = 600;
    const outerRadius = 200; // Outer boundary
    const innerRadius = 180; // Inner hole

    // Distance from the center
    const dx = particle.x - centerX;
    const dy = particle.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If ball hits outer ring, bounce back
    if (distance > outerRadius - 50) {
        const angle = Math.atan2(dy, dx);
        const normalX = Math.cos(angle);
        const normalY = Math.sin(angle);

        // Reflect velocity
        const dotProduct = particle.vx * normalX + particle.vy * normalY;
        particle.vx -= 2 * dotProduct * normalX;
        particle.vy -= 2 * dotProduct * normalY;
    }

    // If ball enters the hole, bounce back
    if (distance < innerRadius + 50) {
        const angle = Math.atan2(dy, dx);
        const normalX = Math.cos(angle);
        const normalY = Math.sin(angle);

        // Reflect velocity
        const dotProduct = particle.vx * normalX + particle.vy * normalY;
        particle.vx -= 2 * dotProduct * normalX;
        particle.vy -= 2 * dotProduct * normalY;
    }
}

// Start with a particle inside the ring
const particle = createParticle(600, 700); // Spawns the ball lower in the ring


// Recursive function that keeps updating the animation
function render() {
    // Update physics
    collisionDetection(particle);

    // Update particle position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Clear canvas
    space.clearRect(0, 0, 1200, 1200);

    // Draw background
    space.fillStyle = "gray";
    space.fillRect(0, 0, 1200, 1200);

    // Draw outer circle (the ring)
    space.fillStyle = "green"; // Color of the ring
    space.beginPath();
    space.arc(600, 600, 200, 0, Math.PI * 2);
    space.fill();

    // Draw inner circle (hole)
    space.fillStyle = "gray"; // Match background to make a hole
    space.beginPath();
    space.arc(600, 600, 180, 0, Math.PI * 2);
    space.fill();

    // Draw the bouncing ball
    space.fillStyle = "red";
    space.beginPath();
    space.arc(particle.x, particle.y, 50, 0, Math.PI * 2);
    space.fill();

    requestAnimationFrame(render);
}

render();
