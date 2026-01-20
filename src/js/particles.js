/* ---- particles.js config ---- */

// The particles animation will attach itself to any HTML element with id="particles-js"
//here will be a <div id="particles-js"></div> in the banner.html file
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80, //number of particles
            "density": {
                "enable": true, //density of particles based on size of the canvas
                "value_area": 800 
            }
        },
        "color": {
            "value": "#009688" //color of particles
        },
        "shape": {
            "type": "circle", 
            "stroke": {
                "width": 1, 
                "color": "#86cec7"
            },
            "polygon": {
                "nb_sides": 5 //if shape is polygon, number of sides
            },
            "image": {
                "src": "img/github.svg", //if shape is image, path to image
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false, //opacity of particles is not random
            "anim": {
                "enable": false,
                "speed": 1, 
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#009688", //color of lines between particles
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": { //mouse interactivity settings
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true //it ensures the particles animation looks clean and sharp on all modern devices
});


