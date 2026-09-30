/* =========================================================
ECO RANGERS PROJECT PAGE
========================================================= */

/* =========================================================
PARTICLE BACKGROUND
========================================================= */

const particleCanvas =
document.getElementById("particle-background");

if (particleCanvas) {

const ctx =
    particleCanvas.getContext("2d");


let particles = [];


const particleCount = 65;

const connectionDistance = 150;


/* =====================================================
   RESIZE CANVAS
   ===================================================== */

function resizeCanvas() {

    particleCanvas.width =
        window.innerWidth;

    particleCanvas.height =
        window.innerHeight;

}


/* =====================================================
   CREATE PARTICLES
   ===================================================== */

function createParticles() {

    particles = [];


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                particleCanvas.width,

            y:
                Math.random() *
                particleCanvas.height,

            vx:
                (Math.random() - 0.5)
                * 0.25,

            vy:
                (Math.random() - 0.5)
                * 0.25,

            size:
                Math.random() *
                1.5
                + 0.5

        });

    }

}


/* =====================================================
   DRAW PARTICLES
   ===================================================== */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        particleCanvas.width,
        particleCanvas.height
    );


    /* =================================================
       MOVE PARTICLES
       ================================================= */

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            /* Wrap horizontally */

            if (
                particle.x < 0
            ) {

                particle.x =
                    particleCanvas.width;

            }


            if (
                particle.x >
                particleCanvas.width
            ) {

                particle.x = 0;

            }


            /* Wrap vertically */

            if (
                particle.y < 0
            ) {

                particle.y =
                    particleCanvas.height;

            }


            if (
                particle.y >
                particleCanvas.height
            ) {

                particle.y = 0;

            }

        }
    );


    /* =================================================
       DRAW CONNECTIONS
       ================================================= */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const a =
                particles[i];

            const b =
                particles[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                connectionDistance
            ) {

                const opacity =
                    1 -
                    (
                        distance /
                        connectionDistance
                    );


                ctx.beginPath();


                ctx.moveTo(
                    a.x,
                    a.y
                );


                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(
                        77,
                        141,
                        255,
                        ${opacity * 0.12}
                    )`;


                ctx.lineWidth = 1;


                ctx.stroke();

            }

        }

    }


    /* =================================================
       DRAW PARTICLES
       ================================================= */

    particles.forEach(
        particle => {

            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(53, 214, 195, 0.4)";


            ctx.fill();

        }
    );


    requestAnimationFrame(
        drawParticles
    );

}


/* =====================================================
   INITIALIZE
   ===================================================== */

resizeCanvas();

createParticles();

drawParticles();


/* =====================================================
   RESIZE
   ===================================================== */

window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();

    }
);


}