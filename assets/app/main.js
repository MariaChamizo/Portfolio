//Hola Iciar, me he tenido q ayudar un poco de la IA especialmente para empezar
// te lo digo x si ves algo raro, llegaba un punto que me atascaba y necesitaba ayuda
//perdón :( (quería que me quedara algo muy chuli)
document.addEventListener("DOMContentLoaded", () => {
    //json
    fetch('../assets/app/proyectos.json')
        .then(res => res.json())
        .then(datos => {
            console.log("funciona ole ole:", datos);
        });

    const logoSVG = document.querySelector("#logo-animado");
    const menuItems = document.querySelectorAll("header nav ul li");
    const silabas = document.querySelectorAll(".silaba");
    const infoBlocks = document.querySelectorAll(".capa1-info > div");
    
    const footerMarquee = document.querySelector('.footer-marquee');
    const marqueeContenido = document.querySelector('.marquee-contenido');
    
    //Animación Footer
        if (footerMarquee && marqueeContenido) {
            for (let i = 0; i < 8; i++) {
                const clon = marqueeContenido.cloneNode(true);
                footerMarquee.appendChild(clon);
            }
        }

        if (footerMarquee && marqueeContenido) {
            const clon = marqueeContenido.cloneNode(true);
            footerMarquee.appendChild(clon);
        }

    const cursor = document.querySelector('.cursor-superchuli');

     //Cursor superchuli
    if (cursor) {
        const ilustraciones = [
            '../assets/img/mouse/FLOR1.svg',
            '../assets/img/mouse/FLOR2.svg',
            '../assets/img/mouse/FLOR3.svg',
            '../assets/img/mouse/FLOR4.svg',
            '../assets/img/mouse/FLOR5.svg',
            '../assets/img/mouse/FLOR6.svg',
        ];
        
        let fotogramaActual = 0;

        function actualizarFotograma(ruta) { //esta parte de las ilustraciones no me salía asi que le pedí ayuda a la IA
            cursor.style.webkitMaskImage = `url('${ruta}')`;
            cursor.style.maskImage = `url('${ruta}')`;
        }

        actualizarFotograma(ilustraciones[0]);

        setInterval(() => {
            fotogramaActual = (fotogramaActual + 1) % ilustraciones.length;
            actualizarFotograma(ilustraciones[fotogramaActual]);
        }, 500);

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, 
                ease: "power2.out"
            });
        });
        const elementosClicables = document.querySelectorAll('a, button, .silaba, header nav ul li');

        elementosClicables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1.25, duration: 0.3, ease: "power2.out" });
            });
        });
    }
    //Letras que se mueven (gsap)
    gsap.set("header", { position: "relative", zIndex: 9999 });

    function activarClicsSilabas() { //esta parte fue un cuadro hasta que salió

        const home      = document.querySelector(".home");
        const silabaAMA = document.querySelector("#silaba-ama");
        const silabaPO  = document.querySelector("#silaba-po");
        const silabaLA  = document.querySelector("#silaba-la");
        const infoAMA   = document.querySelector(".info-sobremi-AMA");
        const infoPO    = document.querySelector(".info-roles-PO");
        const infoLA    = document.querySelector(".info-lugar-LA");

        const getHomeH = () => home.getBoundingClientRect().height;
        const estado = { ama: false, po: false, la: false };

        gsap.set([infoAMA, infoPO, infoLA], { opacity: 0, pointerEvents: "none" });

        function subirSilaba(el) {
            const homeH = getHomeH();
            gsap.killTweensOf(el);
            gsap.to(el, {
                y: -homeH * 0.5,
                color: "#FF0068",
                duration: 0.4,
                ease: "power3.inOut"
            });
        }

        function bajarSilaba(el) {
            gsap.killTweensOf(el);
            gsap.to(el, {
                y: 0,
                color: "#232323",
                duration: 0.4,
                ease: "power3.inOut"
            });
        }

        function mostrarInfo(el) {
            gsap.killTweensOf(el);
            gsap.to(el, {
                opacity: 1,
                duration: 0.4,
                delay: 0.3,
                pointerEvents: "auto",
                ease: "power2.out"
            });
        }

        function ocultarInfo(el) {
            gsap.killTweensOf(el);
            gsap.to(el, {
                opacity: 0,
                duration: 0.25,
                pointerEvents: "none",
                ease: "power2.in"
            });
        }

        function colorearPO(activo) {
            gsap.killTweensOf(silabaPO);
            gsap.to(silabaPO, {
                color: activo ? "#FF0068" : "#232323",
                duration: 0.3
            });
        }

        function mostrarInfoPO() {
            const items = infoPO.querySelectorAll("li");
            gsap.killTweensOf(infoPO);
            gsap.killTweensOf(items);
            gsap.set(infoPO, { opacity: 1, pointerEvents: "auto" });
            gsap.set(items, { opacity: 0, y: 30 });
            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: { each: 0.12, from: "end" },
                ease: "back.out(1.7)",
                delay: 0.3
            });
        }

        let demoTL = gsap.timeline({ delay: 0.5 });

        function resetCompleto() {
            gsap.killTweensOf([silabaAMA, silabaPO, silabaLA, infoAMA, infoPO, infoLA]);
            gsap.set([silabaAMA, silabaLA], { y: 0, color: "#232323" });
            gsap.set(silabaPO, { color: "#232323" });
            gsap.set([infoAMA, infoPO, infoLA], { opacity: 0, pointerEvents: "none" });
            const items = infoPO.querySelectorAll("li");
            gsap.set(items, { opacity: 0, y: 30 });
            estado.ama = false;
            estado.po  = false;
            estado.la  = false;
        }

        function matarDemo() {
            if (demoTL) {
                demoTL.kill();
                demoTL = null;
                resetCompleto();
            }
        }

        demoTL
            .add(() => subirSilaba(silabaAMA))
            .add(() => mostrarInfo(infoAMA), "+=0.1")
            .add(() => { colorearPO(true); mostrarInfoPO(); }, "+=0.8")
            .add(() => subirSilaba(silabaLA), "+=0.8")
            .add(() => mostrarInfo(infoLA), "+=0.1")
            .add(() => {}, "+=1.5")
            .add(() => { ocultarInfo(infoLA); bajarSilaba(silabaLA); })
            .add(() => { ocultarInfo(infoPO); colorearPO(false); }, "+=0.6")
            .add(() => { ocultarInfo(infoAMA); bajarSilaba(silabaAMA); }, "+=0.6");

        silabaAMA.addEventListener("click", () => {
            matarDemo();
            if (estado.ama) {
                ocultarInfo(infoAMA);
                bajarSilaba(silabaAMA);
                estado.ama = false;
            } else {
                subirSilaba(silabaAMA);
                mostrarInfo(infoAMA);
                estado.ama = true;
            }
        });

        silabaPO.addEventListener("click", () => {
            matarDemo();
            if (estado.po) {
                ocultarInfo(infoPO);
                colorearPO(false);
                estado.po = false;
            } else {
                mostrarInfoPO();
                colorearPO(true);
                estado.po = true;
            }
        });

        silabaLA.addEventListener("click", () => {
            matarDemo();
            if (estado.la) {
                ocultarInfo(infoLA);
                bajarSilaba(silabaLA);
                estado.la = false;
            } else {
                subirSilaba(silabaLA);
                mostrarInfo(infoLA);
                estado.la = true;
            }
        });
    }

    //Las transiciones de páginas (barba)
   barba.init({
    transitions: [
        {
            once(data) {
                if (!logoSVG) return;

                gsap.set("#pantalla-carga-inicio", {
                    position: "fixed", top: 0, left: 0,
                    width: "100vw", height: "100vh",
                    backgroundColor: "#FDFDFD",
                    zIndex: 9000, display: "block", y: "0%"
                });

                gsap.set(logoSVG, { clearProps: "all" });
                const rect = logoSVG.getBoundingClientRect();
                const width = rect.width || 50; 
                const height = rect.height || 50;
                const centerX = (window.innerWidth / 2) - (rect.left + width / 2);
                const centerY = (window.innerHeight / 2) - (rect.top + height / 2);

                gsap.set(logoSVG, { x: centerX, y: centerY, scale: 0, transformOrigin: "center center" });
                gsap.set(menuItems, { scale: 0, opacity: 0 });
                gsap.set(infoBlocks, { opacity: 0, y: 30, pointerEvents: "none" });

                const tl = gsap.timeline();
                
                return tl
                    .to(logoSVG, { scale: 4, duration: 0.8, ease: "back.out(1.5)" })
                    .to(logoSVG, { duration: 0.5 }) 
                    .to(logoSVG, { x: 0, y: 0, scale: 1, duration: 1.2, ease: "power3.inOut" })
                    .to(menuItems, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.6")
                    .to("#pantalla-carga-inicio", { y: "-100%", duration: 1, ease: "power3.inOut" }, "-=0.8")
                    .fromTo(silabas, { y: 100, opacity: 0 }, { 
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        stagger: 0.15, 
                        ease: "power4.out", 
                        onComplete: activarClicsSilabas
                    }, "-=0.5");
            }
        },
        {
       name: 'cortina-rosa', //ESTA NO ME FUNCIONA, dejo el código pero en la web he decidido que salga inicio otra vez  

            beforeLeave() {
                const cortina = document.querySelector('.cortina-transicion');
                gsap.set(cortina, { y: '100%' });
                return gsap.to(cortina, {
                    y: '0%',
                    duration: 0.7,
                    ease: 'power3.inOut'
                });
            },

            afterEnter() {
                const cortina = document.querySelector('.cortina-transicion');
                return gsap.to(cortina, {
                    y: '-100%',
                    duration: 0.7,
                    ease: 'power3.inOut'
                });
            }
        }
    ],

    views: [
        {
            namespace: 'inicio',
            afterEnter() {
                activarClicsSilabas();
            }
        }
    ]
 });

 //PROYECTOS
 fetch('../assets/app/proyectos.json')
        .then(res => res.json())
        .then(datos => {
            const galeria = document.querySelector('#galeria-proyectos');
            
            if (galeria) { 
                datos.proyectos.forEach(proyecto => {
                    galeria.innerHTML += `
                        <div class="proyecto">
                            <div class="info-proyecto">
                                <p>${proyecto.año}</p>
                                <h4>${proyecto.titulo}</h4>
                            </div>
                            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
                        </div>
                    `;
                });
            }
        });


// SOBRE MI
    fetch('../assets/app/ilustraciones.json')
    .then(res => res.json())
    .then(datos => {
        const galeria = document.querySelector('#ilustraciones');
        if (galeria) {
            datos.ilustraciones.forEach(ilustracion => {  // ← era datos.proyectos
                galeria.innerHTML += `
                    <div class="cosa">
                        <img src="${ilustracion.imagen}" alt="${ilustracion.nombre}">
                        <p>${ilustracion.nombre}</p>
                    </div>
                `; 
            });
        }
    });
});


