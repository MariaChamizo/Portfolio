document.addEventListener("DOMContentLoaded", () => {

    const logoSVG = document.querySelector("#logo-animado");
    const menuItems = document.querySelectorAll("header nav ul li");
    const silabas = document.querySelectorAll(".silaba");
    const infoBlocks = document.querySelectorAll(".capa1-info > div");

    const footerMarquee = document.querySelector('.footer-marquee');
    const marqueeContenido = document.querySelector('.marquee-contenido');

    const enSubcarpeta = window.location.pathname.includes('/proyectos/');
    const rutaBase = enSubcarpeta ? '../../' : '../';
    

    // Animación Footer
    if (footerMarquee && marqueeContenido) {
        for (let i = 0; i < 8; i++) {
            footerMarquee.appendChild(marqueeContenido.cloneNode(true));
        }
    }

    // Cursor superchuli
    const cursor = document.querySelector('.cursor-superchuli');

    function actualizarFotogramaGlobal(ruta) {
        if (!cursor) return;
        cursor.style.webkitMaskImage = `url('${ruta}')`;
        cursor.style.maskImage = `url('${ruta}')`;
    }

    if (cursor) {
        const florFrames = [
            `${rutaBase}assets/img/mouse/FLOR1.svg`,
            `${rutaBase}assets/img/mouse/FLOR2.svg`,
            `${rutaBase}assets/img/mouse/FLOR3.svg`,
            `${rutaBase}assets/img/mouse/FLOR4.svg`,
            `${rutaBase}assets/img/mouse/FLOR5.svg`,
            `${rutaBase}assets/img/mouse/FLOR6.svg`,
        ];
        let fotogramaActual = 0;

        actualizarFotogramaGlobal(florFrames[0]);
        setInterval(() => {
            fotogramaActual = (fotogramaActual + 1) % florFrames.length;
            actualizarFotogramaGlobal(florFrames[fotogramaActual]);
        }, 500);

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        });

        document.querySelectorAll('a, button, .silaba, header nav ul li').forEach(el => {
            el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "back.out(2)" }));
            el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1.25, duration: 0.3, ease: "power2.out" }));
        });
    }

    gsap.set("header", { position: "relative", zIndex: 9999 });

    // SÍLABAS INTERACTIVAS (inicio)
    function activarClicsSilabas() {
        const home      = document.querySelector(".home");
        const silabaAMA = document.querySelector("#silaba-ama");
        const silabaPO  = document.querySelector("#silaba-po");
        const silabaLA  = document.querySelector("#silaba-la");
        const infoAMA   = document.querySelector(".info-sobremi-AMA");
        const infoPO    = document.querySelector(".info-roles-PO");
        const infoLA    = document.querySelector(".info-lugar-LA");

        if (!silabaAMA || !silabaPO || !silabaLA) return;

        const getHomeH = () => home.getBoundingClientRect().height;
        const estado = { ama: false, po: false, la: false };

        gsap.set([infoAMA, infoPO, infoLA], { opacity: 0, pointerEvents: "none" });

        function subirSilaba(el) {
            gsap.killTweensOf(el);
            gsap.to(el, { y: -getHomeH() * 0.45, color: "#FF0068", duration: 0.4, ease: "power3.inOut" });
        }
        function bajarSilaba(el) {
            gsap.killTweensOf(el);
            gsap.to(el, { y: 0, color: "#232323", duration: 0.4, ease: "power3.inOut" });
        }
        function mostrarInfo(el) {
            gsap.killTweensOf(el);
            gsap.to(el, { opacity: 1, duration: 0.4, delay: 0.3, pointerEvents: "auto", ease: "power2.out" });
        }
        function ocultarInfo(el) {
            gsap.killTweensOf(el);
            gsap.to(el, { opacity: 0, duration: 0.25, pointerEvents: "none", ease: "power2.in" });
        }
        function colorearPO(activo) {
            gsap.killTweensOf(silabaPO);
            gsap.to(silabaPO, { color: activo ? "#FF0068" : "#232323", duration: 0.3 });
        }
        function mostrarInfoPO() {
            const items = infoPO.querySelectorAll("li");
            gsap.killTweensOf(infoPO);
            gsap.killTweensOf(items);
            gsap.set(infoPO, { opacity: 1, pointerEvents: "auto" });
            gsap.set(items, { opacity: 0, y: 30 });
            gsap.to(items, { opacity: 1, y: 0, duration: 0.4, stagger: { each: 0.12, from: "end" }, ease: "back.out(1.7)", delay: 0.3 });
        }

        let demoTL = gsap.timeline({ delay: 0.5 });

        function resetCompleto() {
            gsap.killTweensOf([silabaAMA, silabaPO, silabaLA, infoAMA, infoPO, infoLA]);
            gsap.set([silabaAMA, silabaLA], { y: 0, color: "#232323" });
            gsap.set(silabaPO, { color: "#232323" });
            gsap.set([infoAMA, infoPO, infoLA], { opacity: 0, pointerEvents: "none" });
            gsap.set(infoPO.querySelectorAll("li"), { opacity: 0, y: 30 });
            estado.ama = false; estado.po = false; estado.la = false;
        }
        function matarDemo() {
            if (demoTL) { demoTL.kill(); demoTL = null; resetCompleto(); }
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
            if (estado.ama) { ocultarInfo(infoAMA); bajarSilaba(silabaAMA); estado.ama = false; }
            else { subirSilaba(silabaAMA); mostrarInfo(infoAMA); estado.ama = true; }
        });
        silabaPO.addEventListener("click", () => {
            matarDemo();
            if (estado.po) { ocultarInfo(infoPO); colorearPO(false); estado.po = false; }
            else { mostrarInfoPO(); colorearPO(true); estado.po = true; }
        });
        silabaLA.addEventListener("click", () => {
            matarDemo();
            if (estado.la) { ocultarInfo(infoLA); bajarSilaba(silabaLA); estado.la = false; }
            else { subirSilaba(silabaLA); mostrarInfo(infoLA); estado.la = true; }
        });
    }

    // SOBRE MÍ (animaciones con gsap)
    function lanzarAnimacionesSobreMi() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1});
        
        tl.fromTo('.miimagen-sobremi',
            { x: '-100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
        )
        .fromTo('.presentacion .p-bold',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 }, '-=0.4'
        )
        .fromTo('.presentacion h2',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.2'
        )
        .fromTo('.estudios',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5 }, '-=0.3'
        )
        .fromTo('.informacion button',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4 }, '-=0.2'
        )
        .fromTo('.manifiesto',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5'
        )
        .fromTo('.a-que-me-dedico',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.6'
        )
        .fromTo('.cosas-que-me-gustan > p',
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }, '-=0.2'
        )
        .fromTo('.cosa',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, stagger: { each: 0.1 }, ease: 'back.out(1.8)' }, '-=0.2'
        );

        // Intento botón magnético del CV
        const cvBtn = document.querySelector('.informacion button');
        if (cvBtn) {
            cvBtn.addEventListener('mousemove', (e) => {
                const rect = cvBtn.getBoundingClientRect();
                gsap.to(cvBtn, {
                    x: (e.clientX - (rect.left + rect.width / 2)) * 0.2,
                    y: (e.clientY - (rect.top + rect.height / 2)) * 0.2,
                    duration: 0.3, ease: 'power2.out'
                });
            });
            cvBtn.addEventListener('mouseleave', () => {
                gsap.to(cvBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            });
        }

        // Intento de que floten cosas
        document.querySelectorAll('.cosa img').forEach(img => {
            img.parentElement.addEventListener('mouseenter', () => {
                gsap.to(img, { y: -8, rotation: 6, duration: 0.4, ease: 'back.out(2)' });
            });
            img.parentElement.addEventListener('mouseleave', () => {
                gsap.to(img, { y: 0, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    function lanzarAnimacionesContacto(contenedor = document) {
        const q = gsap.utils.selector(contenedor);
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2 });

        tl.fromTo(q('.textos-contacto'),
            { x: '-100%', autoAlpha: 0 },
            { x: '0%', autoAlpha: 1, duration: 1, ease: 'power4.out' }
        )
        .fromTo(q('.textos-contacto h2'),
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4'
        )
        .fromTo(q('.textos-contacto h3'),
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.2'
        )
        .fromTo(q('.redes-contacto a'),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: { each: 0.15 } }, '-=0.2'
        )
        .fromTo(q('.partederecha h5'),
            { autoAlpha: 0, x: 20 },
            { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5'
        )
        .fromTo(q('.partederecha p'),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3'
        )
        .fromTo(q('.formContent'),
            { autoAlpha: 0, y: 25 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: { each: 0.12 }, ease: 'back.out(1.8)' }, '-=0.2'
        )
        .fromTo(q('.partederecha button'),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.4 }, '-=0.1'
        );
    }

    // proyectos individualmente -> esto me ha ayudado mucho la IA xq no era capaz
    //Falta alguna info y fotos en el json que rellenaré más adelante. Aún no tengo los mockups :D
    function cargarDetalleProyecto() {
        const params = new URLSearchParams(window.location.search);
        const proyectoId = params.get('id');

        if (!proyectoId) return;

        const ahoraEnSubcarpeta = window.location.pathname.includes('/proyectos/');
        const rutaActual = ahoraEnSubcarpeta ? '../../' : '../';

        fetch(`${rutaActual}assets/app/infoproyectos.json`)
            .then(res => res.json())
            .then(data => {
                const p = data.infoproyectos.find(item => item.id === proyectoId);
                if (!p) return;

                const tituloEl      = document.getElementById('proyecto-titulo');
                const añoEl         = document.getElementById('proyecto-año');
                const descripcionEl = document.getElementById('proyecto-descripcion');
                const etiquetasEl   = document.getElementById('proyecto-etiquetas');
                const imagenesEl    = document.getElementById('proyecto-imagenes');

                if (tituloEl)      tituloEl.innerText      = p.titulo;
                if (añoEl)         añoEl.innerText         = p.año;
                if (descripcionEl) descripcionEl.innerText = p.descripcion;

                if (etiquetasEl) {
                    etiquetasEl.innerHTML = p.etiquetas
                        .map(tag => `<span>${tag.toUpperCase()}</span>`)
                        .join(' ');
                }

                if (imagenesEl) {
                    imagenesEl.innerHTML = p.imagenes
                        .map(src => `<img src="${src}" alt="${p.titulo}">`)
                        .join('');
                }

                gsap.fromTo(".info-col", 
                    { opacity: 0, x: 30 }, 
                    { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", clearProps: "all" }
                );
            })
            .catch(err => console.error(err));
    }

    // BARBA (esta librería es lo peor)
    //si ves cosas raras es xq el gsap con barba se hace un lio que flipas
    //bueno y con todo, hasta con las rutas (odio esta librería)

    barba.init({
        preventRunning: true,
        prevent: ({ el }) => el.closest('header') !== null,

        transitions: [
            {
                once(data) {
                    const ns = data.next.namespace;
                    if (ns === 'detalle-proyecto') {
                        cargarDetalleProyecto();
                        gsap.to("#pantalla-carga-inicio", { y: "-100%", duration: 0.5, ease: "power3.inOut" });
                        return;
                    }

                    if (!logoSVG) return;

                    // Usamos window.innerHeight porque 100vh en móvil da problemas con la barra de direcciones
                    gsap.set("#pantalla-carga-inicio", {
                        position: "fixed", top: 0, left: 0,
                        width: "100vw", height: window.innerHeight + "px",
                        backgroundColor: "#FDFDFD",
                        zIndex: 9000, display: "block", y: "0%"
                    });

                    gsap.set(logoSVG, { clearProps: "all" });
                    
                    // TRUCO: Medimos el contenedor padre (.logo) en vez del SVG para no dar fallo en móvil
                    const contenedorLogo = document.querySelector('.logo') || logoSVG;
                    const rect = contenedorLogo.getBoundingClientRect();
                    
                    const centerX = (window.innerWidth / 2) - (rect.left + (rect.width || 50) / 2);
                    const centerY = (window.innerHeight / 2) - (rect.top + (rect.height || 50) / 2);

                    // Si estamos en móvil, escalamos un poco menos para que no rompa la pantalla
                    const esMovil = window.innerWidth <= 480;
                    const escalaMaxima = esMovil ? 2.5 : 4;

                    gsap.set(logoSVG, { x: centerX, y: centerY, scale: 0, transformOrigin: "center center" });
                    gsap.set(menuItems, { scale: 0, opacity: 0 });
                    gsap.set(infoBlocks, { opacity: 0, y: 30, pointerEvents: "none" });

                    const tl = gsap.timeline();
                    return tl
                        .to(logoSVG, { scale: escalaMaxima, duration: 0.8, ease: "back.out(1.5)" })
                        .to(logoSVG, { duration: 0.5 })
                        .to(logoSVG, { x: 0, y: 0, scale: 1, duration: 1.2, ease: "power3.inOut" })
                        .to(menuItems, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.6")
                        .to("#pantalla-carga-inicio", { y: "-100%", duration: 1, ease: "power3.inOut" }, "-=0.8")
                        .fromTo(silabas, { y: 100, opacity: 0 }, {
                            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out",
                            onComplete: activarClicsSilabas
                        }, "-=0.5");
                },

                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0, duration: 0.3, ease: "power2.in"
                    });
                },
                enter(data) {
                    return gsap.fromTo(data.next.container, 
                        { opacity: 0 }, 
                        { opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "all" }
                    );
                }
            }
        ],
// lo que puede hacer scroll y lo que no -> esto al final no lo he usado pero me ha dado miedo borrarlo :D
//Esto estaba pensado para Barba, al parecer da muchos problemas con esto en el mobile 
//Si te lo estoy diciendo que Barba solo da problemas (LO ODIO)
        views: [
            {
                namespace: 'inicio',
                beforeEnter() {
                    document.body.classList.remove('con-scroll');
                },
                afterEnter() {
                    activarClicsSilabas();
                }
            },
            {
                namespace: 'sobremi',
                beforeEnter() {
                    document.body.classList.add('con-scroll');
                     document.documentElement.classList.add('con-scroll'); 
                },
                afterEnter() {
                    document.body.classList.add('con-scroll');
                    document.documentElement.classList.add('con-scroll');
                    fetch(`${rutaBase}assets/app/ilustraciones.json`)
                        .then(res => res.json())
                        .then(datos => {
                            const galeria = document.querySelector('#ilustraciones');
                            if (galeria) {
                                galeria.innerHTML = '';
                                datos.ilustraciones.forEach(ilustracion => {
                                    galeria.innerHTML += `
                                        <div class="cosa">
                                            <img src="${ilustracion.imagen}" alt="${ilustracion.nombre}">
                                            <p>${ilustracion.nombre}</p>
                                        </div>
                                    `;
                                });
                            }
                            lanzarAnimacionesSobreMi();
                        });
                }
            },
            {
                namespace: 'detalle-proyecto',
                beforeEnter() {
                    document.body.classList.add('con-scroll');
                },
                beforeLeave() {
                    document.body.classList.remove('con-scroll');
                },
                afterEnter() {
                    cargarDetalleProyecto();
                }
            }
        ]
    });

    // PROYECTOS (JSON)
    fetch(`${rutaBase}assets/app/proyectos.json`)
        .then(res => res.json())
        .then(datos => {
            const galeria = document.querySelector('#galeria-proyectos');
            if (galeria) {
                galeria.innerHTML = ''; 
                datos.proyectos.forEach(proyecto => {
                    galeria.innerHTML += `
                        <a href="${proyecto.url}" class="enlace-proyecto">
                            <div class="proyecto">
                                <div class="info-proyecto">
                                    <p>${proyecto.año}</p>
                                    <h4>${proyecto.titulo}</h4>
                                </div>
                                <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
                            </div>
                        </a>
                    `;
                });
            }
        });

    //ILUSTRACIONES SOBRE MI (JSON)
    if (document.querySelector('.sobre-mi')) { //aqui me ha tenido que ayudar la ia xq no le apetecía hacerme la animación
        fetch(`${rutaBase}assets/app/ilustraciones.json`)
            .then(res => res.json())
            .then(datos => {
                const galeria = document.querySelector('#ilustraciones');
                if (galeria) {
                    galeria.innerHTML = '';
                    datos.ilustraciones.forEach(ilustracion => {
                        galeria.innerHTML += `
                            <div class="cosa">
                                <img src="${ilustracion.imagen}" alt="${ilustracion.nombre}">
                                <p>${ilustracion.nombre}</p>
                            </div>
                        `;
                    });
                }
                lanzarAnimacionesSobreMi();
            });
    }

    if (document.querySelector('.textos-contacto')) {
        lanzarAnimacionesContacto();
    }

    //cosas que se escriben
    new TypeIt("#element", { 
        lifeLike: false, 
        speed: 0,
        startDelay: 5000,
    })
    .type("(")
    .pause(236)
    .type("A")
    .pause(200)
    .type("M")
    .pause(100)
    .type("A")
    .pause(506)
    .type("-")
    .pause(235)
    .type("P")
    .pause(117)
    .type("O")
    .pause(339)
    .type("-")
    .pause(306)
    .type("L")
    .pause(86)
    .type("A")
    .pause(350)
    .type(")")
    .go();
});