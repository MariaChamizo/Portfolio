// Hola Iciar, hay partes del js en las que he usado ia.
// Al haber escogido barba.js las cosas funcionaban raro, asi que aunque siguiera
// los tutoriales de gsap o de hacer cursores y carruseles, no funcionaban.
//
// Como se me buguea barba con el json por culpa de github
// (en la vuelta de proyectos individuales a proyectos generales)
// se lo mandé a la IA para que me ayudara a arreglarlo.

document.addEventListener("DOMContentLoaded", () => {

    const logoSVG = document.querySelector("#logo-animado");
    const menuItems = document.querySelectorAll("header nav ul li");
    const silabas = document.querySelectorAll(".silaba");
    const infoBlocks = document.querySelectorAll(".capa1-info > div");

    const footerMarquee = document.querySelector(".footer-marquee");
    const marqueeContenido = document.querySelector(".marquee-contenido");

    const rutaBase = "assets/";

    // =========================================================
    // ANIMACIÓN FOOTER
    // =========================================================

    if (footerMarquee && marqueeContenido) {
        for (let i = 0; i < 8; i++) {
            footerMarquee.appendChild(marqueeContenido.cloneNode(true));
        }
    }


    // =========================================================
    // CURSOR SUPERCHULI
    // =========================================================

    const cursor = document.querySelector(".cursor-superchuli");

    function actualizarFotogramaGlobal(ruta) {
        if (!cursor) return;

        cursor.style.webkitMaskImage = `url('${ruta}')`;
        cursor.style.maskImage = `url('${ruta}')`;
    }

    if (cursor) {

        const florFrames = [
            `${rutaBase}img/mouse/FLOR1.svg`,
            `${rutaBase}img/mouse/FLOR2.svg`,
            `${rutaBase}img/mouse/FLOR3.svg`,
            `${rutaBase}img/mouse/FLOR4.svg`,
            `${rutaBase}img/mouse/FLOR5.svg`,
            `${rutaBase}img/mouse/FLOR6.svg`
        ];

        let fotogramaActual = 0;

        actualizarFotogramaGlobal(florFrames[0]);

        setInterval(() => {
            fotogramaActual =
                (fotogramaActual + 1) % florFrames.length;

            actualizarFotogramaGlobal(florFrames[fotogramaActual]);
        }, 500);


        window.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });


        document
            .querySelectorAll("a, button, .silaba, header nav ul li")
            .forEach(el => {

                el.addEventListener("mouseenter", () => {
                    gsap.to(cursor, {
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(2)"
                    });
                });

                el.addEventListener("mouseleave", () => {
                    gsap.to(cursor, {
                        scale: 1.25,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

            });
    }


    // =========================================================
    // HEADER
    // =========================================================

    gsap.set("header", {
        position: "relative",
        zIndex: 9999
    });


    // =========================================================
    // MENÚ MOBILE
    // =========================================================

    const logoBtn = document.querySelector(".logo");
    const menuOverlay = document.getElementById("menuMobile");
    const headerEl = document.querySelector("header");

    if (logoBtn && menuOverlay && headerEl) {

        logoBtn.addEventListener("click", () => {

            const isOpen =
                menuOverlay.classList.toggle("is-open");

            headerEl.classList.toggle(
                "menu-abierto",
                isOpen
            );

        });


        menuOverlay
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuOverlay.classList.remove("is-open");
                    headerEl.classList.remove("menu-abierto");

                });

            });
    }


    // =========================================================
    // SÍLABAS INTERACTIVAS
    // =========================================================

    function activarClicsSilabas() {

        const home = document.querySelector(".home");

        const silabaAMA =
            document.querySelector("#silaba-ama");

        const silabaPO =
            document.querySelector("#silaba-po");

        const silabaLA =
            document.querySelector("#silaba-la");

        const infoAMA =
            document.querySelector(".info-sobremi-AMA");

        const infoPO =
            document.querySelector(".info-roles-PO");

        const infoLA =
            document.querySelector(".info-lugar-LA");


        if (
            !silabaAMA ||
            !silabaPO ||
            !silabaLA ||
            !home
        ) {
            return;
        }


        const getHomeH = () =>
            home.getBoundingClientRect().height;


        const estado = {
            ama: false,
            po: false,
            la: false
        };


        gsap.set(
            [infoAMA, infoPO, infoLA],
            {
                opacity: 0,
                pointerEvents: "none"
            }
        );


        function subirSilaba(el) {

            gsap.killTweensOf(el);

            gsap.to(el, {
                y: -getHomeH() * 0.45,
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

            if (!el) return;

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

            if (!el) return;

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
                color: activo
                    ? "#FF0068"
                    : "#232323",
                duration: 0.3
            });

        }


        function mostrarInfoPO() {

            if (!infoPO) return;

            const items =
                infoPO.querySelectorAll("li");

            gsap.killTweensOf(infoPO);
            gsap.killTweensOf(items);

            gsap.set(infoPO, {
                opacity: 1,
                pointerEvents: "auto"
            });

            gsap.set(items, {
                opacity: 0,
                y: 30
            });

            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: {
                    each: 0.12,
                    from: "end"
                },
                ease: "back.out(1.7)",
                delay: 0.3
            });

        }


        let demoTL =
            gsap.timeline({
                delay: 0.5
            });


        function resetCompleto() {

            gsap.killTweensOf([
                silabaAMA,
                silabaPO,
                silabaLA,
                infoAMA,
                infoPO,
                infoLA
            ]);

            gsap.set(
                [silabaAMA, silabaLA],
                {
                    y: 0,
                    color: "#232323"
                }
            );

            gsap.set(silabaPO, {
                color: "#232323"
            });

            gsap.set(
                [infoAMA, infoPO, infoLA],
                {
                    opacity: 0,
                    pointerEvents: "none"
                }
            );

            if (infoPO) {

                gsap.set(
                    infoPO.querySelectorAll("li"),
                    {
                        opacity: 0,
                        y: 30
                    }
                );

            }

            estado.ama = false;
            estado.po = false;
            estado.la = false;

        }


        function matarDemo() {

            if (demoTL) {

                demoTL.kill();
                demoTL = null;

                resetCompleto();

            }

        }


        demoTL
            .add(() =>
                subirSilaba(silabaAMA)
            )
            .add(
                () => mostrarInfo(infoAMA),
                "+=0.1"
            )
            .add(
                () => {
                    colorearPO(true);
                    mostrarInfoPO();
                },
                "+=0.8"
            )
            .add(
                () => subirSilaba(silabaLA),
                "+=0.8"
            )
            .add(
                () => mostrarInfo(infoLA),
                "+=0.1"
            )
            .add(
                () => {},
                "+=1.5"
            )
            .add(
                () => {
                    ocultarInfo(infoLA);
                    bajarSilaba(silabaLA);
                }
            )
            .add(
                () => {
                    ocultarInfo(infoPO);
                    colorearPO(false);
                },
                "+=0.6"
            )
            .add(
                () => {
                    ocultarInfo(infoAMA);
                    bajarSilaba(silabaAMA);
                },
                "+=0.6"
            );


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


    // =========================================================
    // SOBRE MÍ
    // =========================================================

    function lanzarAnimacionesSobreMi() {

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            },
            delay: 1
        });


        tl.fromTo(
            ".miimagen-sobremi",
            {
                x: "-100%",
                opacity: 0
            },
            {
                x: "0%",
                opacity: 1,
                duration: 1,
                ease: "power4.out"
            }
        )


        .fromTo(
            ".presentacion .p-bold",
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5
            },
            "-=0.4"
        )


        .fromTo(
            ".presentacion h2",
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.4)"
            },
            "-=0.2"
        )


        .fromTo(
            ".estudios",
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5
            },
            "-=0.3"
        )


        .fromTo(
            ".informacion button",
            {
                opacity: 0,
                y: 10
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4
            },
            "-=0.2"
        )


        .fromTo(
            ".manifiesto",
            {
                opacity: 0,
                x: -20
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out"
            },
            "-=0.5"
        )


        .fromTo(
            ".a-que-me-dedico",
            {
                opacity: 0,
                x: 20
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out"
            },
            "-=0.6"
        )


        .fromTo(
            ".cosas-que-me-gustan > p",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 0.5
            },
            "-=0.2"
        )


        .fromTo(
            ".cosa",
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: {
                    each: 0.1
                },
                ease: "back.out(1.8)"
            },
            "-=0.2"
        );


        const cvBtn =
            document.querySelector(".informacion button");


        if (cvBtn) {

            cvBtn.addEventListener("mousemove", (e) => {

                const rect =
                    cvBtn.getBoundingClientRect();

                gsap.to(cvBtn, {
                    x:
                        (e.clientX -
                            (rect.left + rect.width / 2)) *
                        0.2,

                    y:
                        (e.clientY -
                            (rect.top + rect.height / 2)) *
                        0.2,

                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            cvBtn.addEventListener("mouseleave", () => {

                gsap.to(cvBtn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)"
                });

            });

        }


        document
            .querySelectorAll(".cosa img")
            .forEach(img => {

                if (!img.parentElement) return;

                img.parentElement.addEventListener(
                    "mouseenter",
                    () => {

                        gsap.to(img, {
                            y: -8,
                            rotation: 6,
                            duration: 0.4,
                            ease: "back.out(2)"
                        });

                    }
                );


                img.parentElement.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(img, {
                            y: 0,
                            rotation: 0,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.4)"
                        });

                    }
                );

            });

    }


    // =========================================================
    // CONTACTO
    // =========================================================

    function lanzarAnimacionesContacto(
        contenedor = document
    ) {

        const q =
            gsap.utils.selector(contenedor);


        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            },
            delay: 2
        });


        tl.fromTo(
            q(".textos-contacto"),
            {
                x: "-100%",
                autoAlpha: 0
            },
            {
                x: "0%",
                autoAlpha: 1,
                duration: 1,
                ease: "power4.out"
            }
        )


        .fromTo(
            q(".textos-contacto h2"),
            {
                autoAlpha: 0,
                y: 30
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.4)"
            },
            "-=0.4"
        )


        .fromTo(
            q(".textos-contacto h3"),
            {
                autoAlpha: 0,
                y: 15
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.5
            },
            "-=0.2"
        )


        .fromTo(
            q(".redes-contacto a"),
            {
                autoAlpha: 0,
                y: 10
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: {
                    each: 0.15
                }
            },
            "-=0.2"
        )


        .fromTo(
            q(".partederecha h5"),
            {
                autoAlpha: 0,
                x: 20
            },
            {
                autoAlpha: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            },
            "-=0.5"
        )


        .fromTo(
            q(".partederecha p"),
            {
                autoAlpha: 0,
                y: 12
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.5
            },
            "-=0.3"
        )


        .fromTo(
            q(".formContent"),
            {
                autoAlpha: 0,
                y: 25
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: {
                    each: 0.12
                },
                ease: "back.out(1.8)"
            },
            "-=0.2"
        )


        .fromTo(
            q(".partederecha button"),
            {
                autoAlpha: 0,
                y: 10
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.4
            },
            "-=0.1"
        );

    }


    // =========================================================
    // DETALLE DE PROYECTO
    // =========================================================

    function cargarDetalleProyecto() {

        const params =
            new URLSearchParams(window.location.search);

        const proyectoId =
            params.get("id");


        if (!proyectoId) return;


        fetch(`${rutaBase}app/infoproyectos.json`)
            .then(res => {

                if (!res.ok) {
                    throw new Error(
                        `Error cargando infoproyectos.json: ${res.status}`
                    );
                }

                return res.json();

            })


            .then(data => {

                const listaProyectos =
                    data.infoproyectos || [];


                const indexActual =
                    listaProyectos.findIndex(
                        item => item.id === proyectoId
                    );


                const p =
                    listaProyectos[indexActual];


                if (!p) {
                    console.error(
                        "No se encontró el proyecto:",
                        proyectoId
                    );
                    return;
                }


                const tituloEl =
                    document.getElementById(
                        "proyecto-titulo"
                    );

                const añoEl =
                    document.getElementById(
                        "proyecto-año"
                    );

                const descripcionEl =
                    document.getElementById(
                        "proyecto-descripcion"
                    );

                const enlaceEl =
                    document.getElementById(
                        "proyecto-enlace"
                    );

                const etiquetasEl =
                    document.getElementById(
                        "proyecto-etiquetas"
                    );

                const imagenesEl =
                    document.getElementById(
                        "proyecto-imagenes"
                    );


                if (tituloEl) {
                    tituloEl.innerText = p.titulo;
                }


                if (añoEl) {
                    añoEl.innerText = p.año;
                }


                if (descripcionEl) {
                    descripcionEl.innerText =
                        p.descripcion;
                }


                // -------------------------------------------------
                // ENLACE EXTERNO (opcional, solo si el proyecto lo tiene)
                // -------------------------------------------------

                if (enlaceEl) {

                    if (p.enlace && p.enlace.url) {

                        enlaceEl.href = p.enlace.url;

                        enlaceEl.innerText =
                            p.enlace.texto || p.enlace.url;

                        enlaceEl.style.display = "inline-block";

                    } else {

                        enlaceEl.style.display = "none";

                        enlaceEl.removeAttribute("href");

                    }

                }


                // -------------------------------------------------
                // ETIQUETAS
                // -------------------------------------------------

                if (etiquetasEl) {

                    const etiquetas =
                        Array.isArray(p.etiquetas)
                            ? p.etiquetas
                            : [];

                    etiquetasEl.innerHTML =
                        etiquetas
                            .map(tag =>
                                `<span>${String(tag).toUpperCase()}</span>`
                            )
                            .join("");

                }


                // -------------------------------------------------
                // IMÁGENES Y VÍDEOS
                // -------------------------------------------------

                if (imagenesEl) {

                    /*
                     * Si existe "media" en el JSON:
                     *
                     * [
                     *   {
                     *      tipo: "imagen",
                     *      src: "..."
                     *   },
                     *   {
                     *      tipo: "video",
                     *      src: "..."
                     *   }
                     * ]
                     *
                     * usamos ese orden.
                     *
                     * Si no existe "media", usamos el formato antiguo
                     * de imagenes + videos.
                     */

                    const lista =
                        Array.isArray(p.media)
                            ? p.media
                            : [
                                ...(Array.isArray(p.videos)
                                    ? p.videos.map(src => ({
                                        tipo: "video",
                                        src: src
                                    }))
                                    : []),

                                ...(Array.isArray(p.imagenes)
                                    ? p.imagenes.map(src => ({
                                        tipo: "imagen",
                                        src: src
                                    }))
                                    : [])
                            ];


                    /*
                     * Limpiamos completamente el contenedor
                     * antes de volver a pintar el contenido.
                     */

                    imagenesEl.innerHTML = "";


                    lista.forEach((item, index) => {

                        if (!item || !item.src) {
                            return;
                        }


                        /*
                         * Cada imagen/vídeo tiene su propia caja.
                         *
                         * Esto es importante porque el vídeo NO debe
                         * definir el tamaño del contenedor según sus
                         * dimensiones originales.
                         */

                        const mediaWrapper =
                            document.createElement("div");

                        mediaWrapper.className =
                            "proyecto-media";


                        // -------------------------------------------------
                        // VÍDEO
                        // -------------------------------------------------

                        if (item.tipo === "video") {

                            const video =
                                document.createElement("video");


                            video.src = item.src;

                            video.autoplay = true;
                            video.muted = true;
                            video.loop = true;
                            video.playsInline = true;

                            video.setAttribute(
                                "autoplay",
                                ""
                            );

                            video.setAttribute(
                                "muted",
                                ""
                            );

                            video.setAttribute(
                                "loop",
                                ""
                            );

                            video.setAttribute(
                                "playsinline",
                                ""
                            );


                            /*
                             * Estas propiedades se aplican también
                             * desde JS para evitar que el navegador
                             * use el tamaño natural del vídeo.
                             */

                            video.style.width = "100%";
                            video.style.height = "100%";
                            video.style.display = "block";
                            video.style.objectFit = "cover";
                            video.style.aspectRatio = "4 / 3";


                            mediaWrapper.appendChild(video);

                            imagenesEl.appendChild(
                                mediaWrapper
                            );


                            /*
                             * Intentamos reproducirlo después de
                             * insertarlo en el DOM.
                             */

                            video.play().catch(() => {});


                        // -------------------------------------------------
                        // IMAGEN
                        // -------------------------------------------------

                        } else {

                            const img =
                                document.createElement("img");


                            img.src = item.src;

                            img.alt =
                                p.titulo || "";


                            img.style.width = "100%";
                            img.style.height = "100%";
                            img.style.display = "block";
                            img.style.objectFit = "cover";
                            img.style.aspectRatio = "4 / 3";


                            mediaWrapper.appendChild(img);

                            imagenesEl.appendChild(
                                mediaWrapper
                            );

                        }

                    });


                    /*
                     * Forzamos que cada wrapper tenga la misma relación
                     * de aspecto independientemente de si contiene
                     * una imagen o un vídeo.
                     */

                    imagenesEl
                        .querySelectorAll(".proyecto-media")
                        .forEach(wrapper => {

                            wrapper.style.width = "100%";
                            wrapper.style.aspectRatio = "4 / 3";
                            wrapper.style.overflow = "hidden";
                            wrapper.style.position = "relative";

                        });

                }


                // -------------------------------------------------
                // ANIMACIÓN INFO
                // -------------------------------------------------

                const infoCol =
                    document.querySelector(
                        ".info-col"
                    );


                if (infoCol) {

                    gsap.fromTo(
                        infoCol,
                        {
                            opacity: 0,
                            x: 30
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        }
                    );

                }

            })


            .catch(err => {
                console.error(
                    "Error cargando el proyecto:",
                    err
                );
            });

    }


    // =========================================================
    // TEXTOS MOBILE DE PROYECTOS
    // =========================================================

    function animarTextosMobile() {

        if (window.innerWidth > 768) {
            return;
        }


        const galeria =
            document.querySelector(
                "#galeria-proyectos"
            );


        const proyectos =
            document.querySelectorAll(
                "#galeria-proyectos a"
            );


        if (
            !galeria ||
            proyectos.length === 0
        ) {
            return;
        }


        function actualizarProyectoActivo() {

            if (galeria.scrollLeft <= 10) {

                proyectos.forEach(
                    (proyecto, index) => {

                        const info =
                            proyecto.querySelector(
                                ".info-proyecto"
                            );


                        if (info) {

                            if (index === 0) {
                                info.classList.add(
                                    "activa"
                                );
                            } else {
                                info.classList.remove(
                                    "activa"
                                );
                            }

                        }

                    }
                );

                return;
            }


            let distanciaMinima =
                Infinity;

            let indiceActivo = -1;


            const centroContenedor =
                galeria.getBoundingClientRect().left +
                galeria.offsetWidth / 2;


            proyectos.forEach(
                (proyecto, index) => {

                    const rect =
                        proyecto.getBoundingClientRect();


                    const centroItem =
                        rect.left +
                        rect.width / 2;


                    const distancia =
                        Math.abs(
                            centroContenedor -
                            centroItem
                        );


                    if (
                        distancia <
                        distanciaMinima
                    ) {

                        distanciaMinima =
                            distancia;

                        indiceActivo =
                            index;

                    }

                }
            );


            proyectos.forEach(
                (proyecto, index) => {

                    const info =
                        proyecto.querySelector(
                            ".info-proyecto"
                        );


                    if (info) {

                        if (
                            index ===
                            indiceActivo
                        ) {

                            info.classList.add(
                                "activa"
                            );

                        } else {

                            info.classList.remove(
                                "activa"
                            );

                        }

                    }

                }
            );

        }


        galeria.removeEventListener(
            "scroll",
            actualizarProyectoActivo
        );


        galeria.addEventListener(
            "scroll",
            actualizarProyectoActivo
        );


        actualizarProyectoActivo();

    }


    // =========================================================
    // GALERÍA DE PROYECTOS
    // =========================================================

    function cargarGaleriaProyectos() {

        const galeria =
            document.querySelector(
                "#galeria-proyectos"
            );


        if (!galeria) return;


        fetch(`${rutaBase}app/proyectos.json`)
            .then(res => {

                if (!res.ok) {
                    throw new Error(
                        `Error cargando proyectos.json: ${res.status}`
                    );
                }

                return res.json();

            })


            .then(datos => {

                galeria.innerHTML = "";


                const proyectos =
                    datos.proyectos || [];


                proyectos.forEach(proyecto => {

                    galeria.innerHTML += `

                        <a
                            href="${proyecto.url}"
                            class="enlace-proyecto"
                        >

                            <div class="proyecto">

                                <div class="info-proyecto">

                                    <p>
                                        ${proyecto.año}
                                    </p>

                                    <h4>
                                        ${proyecto.titulo}
                                    </h4>

                                </div>

                                <img
                                    src="${proyecto.imagen}"
                                    alt="${proyecto.titulo}"
                                >

                            </div>

                        </a>

                    `;

                });


                animarTextosMobile();

            })


            .catch(err => {

                console.error(
                    "Error cargando proyectos:",
                    err
                );

            });

    }


    // =========================================================
    // ILUSTRACIONES SOBRE MÍ
    // =========================================================

    function cargarIlustraciones() {

        const galeria =
            document.querySelector(
                "#ilustraciones"
            );


        if (!galeria) return;


        fetch(`${rutaBase}app/ilustraciones.json`)
            .then(res => {

                if (!res.ok) {
                    throw new Error(
                        `Error cargando ilustraciones.json: ${res.status}`
                    );
                }

                return res.json();

            })


            .then(datos => {

                galeria.innerHTML = "";


                const ilustraciones =
                    datos.ilustraciones || [];


                ilustraciones.forEach(
                    ilustracion => {

                        galeria.innerHTML += `

                            <div class="cosa">

                                <img
                                    src="${ilustracion.imagen}"
                                    alt="${ilustracion.nombre}"
                                >

                                <p>
                                    ${ilustracion.nombre}
                                </p>

                            </div>

                        `;

                    }
                );


                lanzarAnimacionesSobreMi();

            })


            .catch(err => {

                console.error(
                    "Error cargando ilustraciones:",
                    err
                );

            });

    }


    // =========================================================
    // BARBA
    // =========================================================

    barba.init({

        cacheIgnore: true,

        preventRunning: true,

        prevent: ({ el }) => {

            return el.closest("header") !== null;

        },


        transitions: [

            {

                once(data) {

                    const ns =
                        data.next.namespace;


                    /*
                     * Si entramos directamente a un proyecto,
                     * cargamos sus datos.
                     */

                    if (
                        ns ===
                        "detalle-proyecto"
                    ) {

                        cargarDetalleProyecto();

                        gsap.to(
                            "#pantalla-carga-inicio",
                            {
                                y: "-100%",
                                duration: 0.5,
                                ease: "power3.inOut"
                            }
                        );

                        return;
                    }


                    if (!logoSVG) {
                        return;
                    }


                    gsap.set(
                        "#pantalla-carga-inicio",
                        {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height:
                                window.innerHeight +
                                "px",
                            backgroundColor:
                                "#FDFDFD",
                            zIndex: 9000,
                            display: "block",
                            y: "0%"
                        }
                    );


                    gsap.set(
                        logoSVG,
                        {
                            clearProps: "all"
                        }
                    );


                    const contenedorLogo =
                        document.querySelector(
                            ".logo"
                        ) || logoSVG;


                    const rect =
                        contenedorLogo.getBoundingClientRect();


                    const centerX =
                        window.innerWidth / 2 -
                        (
                            rect.left +
                            (rect.width || 50) / 2
                        );


                    const centerY =
                        window.innerHeight / 2 -
                        (
                            rect.top +
                            (rect.height || 50) / 2
                        );


                    const esMovil =
                        window.innerWidth <= 390;


                    const escalaMaxima =
                        esMovil
                            ? 2.5
                            : 4;


                    gsap.set(
                        logoSVG,
                        {
                            x: centerX,
                            y: centerY,
                            scale: 0,
                            transformOrigin:
                                "center center"
                        }
                    );


                    gsap.set(
                        menuItems,
                        {
                            scale: 0,
                            opacity: 0
                        }
                    );


                    gsap.set(
                        infoBlocks,
                        {
                            opacity: 0,
                            y: 30,
                            pointerEvents: "none"
                        }
                    );


                    const tl =
                        gsap.timeline();


                    return tl

                        .to(
                            logoSVG,
                            {
                                scale: escalaMaxima,
                                duration: 0.8,
                                ease: "back.out(1.5)"
                            }
                        )

                        .to(
                            logoSVG,
                            {
                                duration: 0.5
                            }
                        )

                        .to(
                            logoSVG,
                            {
                                x: 0,
                                y: 0,
                                scale: 1,
                                duration: 1.2,
                                ease: "power3.inOut"
                            }
                        )

                        .to(
                            menuItems,
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.5,
                                stagger: 0.15,
                                ease: "back.out(1.7)"
                            },
                            "-=0.6"
                        )

                        .to(
                            "#pantalla-carga-inicio",
                            {
                                y: "-100%",
                                duration: 1,
                                ease: "power3.inOut"
                            },
                            "-=0.8"
                        )

                        .fromTo(
                            silabas,
                            {
                                y: 100,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 1,
                                stagger: 0.15,
                                ease: "power4.out",
                                onComplete:
                                    activarClicsSilabas
                            },
                            "-=0.5"
                        );

                },


                leave(data) {

                    return gsap.to(
                        data.current.container,
                        {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.in"
                        }
                    );

                },


                enter(data) {

                    return gsap.fromTo(
                        data.next.container,
                        {
                            opacity: 0
                        },
                        {
                            opacity: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        }
                    );

                }

            }

        ],


        // =====================================================
        // VISTAS BARBA
        // =====================================================

        views: [

            // -------------------------------------------------
            // INICIO
            // -------------------------------------------------

            {

                namespace: "inicio",

                beforeEnter() {

                    document.body.classList.remove(
                        "con-scroll"
                    );

                    document.documentElement.classList.remove(
                        "con-scroll"
                    );

                },

                afterEnter() {

                    activarClicsSilabas();

                }

            },


            // -------------------------------------------------
            // PROYECTOS
            // -------------------------------------------------

            {

                namespace: "proyectos",

                beforeEnter() {

                    document.body.classList.add(
                        "con-scroll"
                    );

                    document.documentElement.classList.add(
                        "con-scroll"
                    );

                },

                afterEnter() {

                    cargarGaleriaProyectos();

                }

            },


            // -------------------------------------------------
            // SOBRE MÍ
            // -------------------------------------------------

            {

                namespace: "sobremi",

                beforeEnter() {

                    document.body.classList.add(
                        "con-scroll"
                    );

                    document.documentElement.classList.add(
                        "con-scroll"
                    );

                },

                afterEnter() {

                    document.body.classList.add(
                        "con-scroll"
                    );

                    document.documentElement.classList.add(
                        "con-scroll"
                    );

                    cargarIlustraciones();

                }

            },


            // -------------------------------------------------
            // DETALLE PROYECTO
            // -------------------------------------------------

            {

                namespace: "detalle-proyecto",

                beforeEnter() {

                    document.body.classList.add(
                        "con-scroll"
                    );

                    document.documentElement.classList.add(
                        "con-scroll"
                    );

                },


                beforeLeave() {

                    document.body.classList.remove(
                        "con-scroll"
                    );

                    document.documentElement.classList.remove(
                        "con-scroll"
                    );

                },


                afterEnter() {

                    cargarDetalleProyecto();

                }

            }

        ]

    });


    // =========================================================
    // LLAMADAS INICIALES
    // =========================================================

    if (
        document.querySelector(
            "#galeria-proyectos"
        )
    ) {

        cargarGaleriaProyectos();

    }


    if (
        document.querySelector(
            ".sobre-mi"
        )
    ) {

        cargarIlustraciones();

    }


    if (
        document.querySelector(
            ".textos-contacto"
        )
    ) {

        lanzarAnimacionesContacto();

    }


    // =========================================================
    // TYPEIT
    // =========================================================

    const elementoTypeIt =
        document.querySelector("#element");


    if (elementoTypeIt && typeof TypeIt !== "undefined") {

        new TypeIt("#element", {

            lifeLike: false,

            speed: 0,

            startDelay: 5000

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

    }

});