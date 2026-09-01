/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 700);

});



/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;


window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left =
        mouseX + "px";

    cursor.style.top =
        mouseY + "px";

});


function animateCursor() {

    followerX +=
        (mouseX - followerX) * .12;

    followerY +=
        (mouseY - followerY) * .12;

    follower.style.left =
        followerX + "px";

    follower.style.top =
        followerY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();



/* =====================================================
   CURSOR HOVER
===================================================== */

function activateCursor() {

    document.body.classList.add(
        "cursor-active"
    );

}

function deactivateCursor() {

    document.body.classList.remove(
        "cursor-active"
    );

}


document
    .querySelectorAll("a, button, .gallery-item, .magnetic-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            activateCursor
        );

        element.addEventListener(
            "mouseleave",
            deactivateCursor
        );

    });



/* =====================================================
   MAGNETIC EFFECT
===================================================== */

document
    .querySelectorAll(".magnetic")
    .forEach(element => {

        element.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(
                        ${x * .18}px,
                        ${y * .18}px
                    )`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0,0)";

            }
        );

    });



/* =====================================================
   REVIEW 3D EFFECT
===================================================== */

document
    .querySelectorAll(".magnetic-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (e.clientX -
                        rect.left) /
                        rect.width - .5;

                const y =
                    (e.clientY -
                        rect.top) /
                        rect.height - .5;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${y * -5}deg)
                    rotateY(${x * 5}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(0)
                    rotateY(0)
                    translateY(0)
                    `;

            }
        );

    });



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal, .image-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12,
            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   NAVBAR + BACK TOP
===================================================== */

const navbar =
    document.querySelector(".navbar");

const backTop =
    document.querySelector(".back-top");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 80) {

            navbar.classList.add(
                "scrolled"
            );

            backTop.classList.add(
                "visible"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

            backTop.classList.remove(
                "visible"
            );

        }

    }
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.querySelector(".menu-btn");

const mobileMenu =
    document.querySelector(".mobile-menu");


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

        document.body.classList.toggle(
            "no-scroll"
        );

    }
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }
        );

    });



/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVideo =
    document.querySelector(".hero-video");

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        if (
            scroll <
            window.innerHeight
        ) {

            heroVideo.style.transform =
                `scale(1.04)
                 translateY(${scroll * .12}px)`;

            heroContent.style.transform =
                `translateY(${scroll * .18}px)`;

        }

    }
);



/* =====================================================
   CREATION SLIDER
===================================================== */

const creationSlides =
    document.querySelectorAll(
        ".creation-slide"
    );

const nextButton =
    document.querySelector(
        ".slider-btn.next"
    );

const prevButton =
    document.querySelector(
        ".slider-btn.prev"
    );

const currentSlide =
    document.querySelector(
        "#currentSlide"
    );

const sliderProgress =
    document.querySelector(
        "#sliderProgress"
    );


let currentIndex = 0;

const totalSlides =
    creationSlides.length;


function showSlide(index) {

    creationSlides.forEach(
        slide => {

            slide.classList.remove(
                "active"
            );

        }
    );


    creationSlides[index]
        .classList.add("active");


    currentSlide.textContent =
        String(index + 1)
            .padStart(2, "0");


    const progress =
        ((index + 1) /
            totalSlides) * 100;


    sliderProgress.style.width =
        progress + "%";

}


nextButton.addEventListener(
    "click",
    () => {

        currentIndex++;

        if (
            currentIndex >=
            totalSlides
        ) {

            currentIndex = 0;

        }

        showSlide(currentIndex);

    }
);


prevButton.addEventListener(
    "click",
    () => {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                totalSlides - 1;

        }

        showSlide(currentIndex);

    }
);



/* =====================================================
   TOUCH SWIPE
===================================================== */

const creationSlider =
    document.querySelector(
        ".creation-slider"
    );


let touchStartX = 0;
let touchEndX = 0;


creationSlider.addEventListener(
    "touchstart",
    (e) => {

        touchStartX =
            e.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


creationSlider.addEventListener(
    "touchend",
    (e) => {

        touchEndX =
            e.changedTouches[0]
                .screenX;

        const difference =
            touchStartX -
            touchEndX;


        if (
            Math.abs(difference) > 50
        ) {

            if (difference > 0) {

                nextButton.click();

            } else {

                prevButton.click();

            }

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   KEYBOARD SLIDER
===================================================== */

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "ArrowRight"
        ) {

            nextButton.click();

        }

        if (
            e.key === "ArrowLeft"
        ) {

            prevButton.click();

        }

    }
);



/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );

                }
            );


            if (!isOpen) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );

const lightbox =
    document.querySelector(
        ".lightbox"
    );

const lightboxImage =
    document.querySelector(
        ".lightbox img"
    );

const lightboxClose =
    document.querySelector(
        ".lightbox-close"
    );


galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const image =
                item.querySelector(
                    "img"
                );

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;

            lightbox.classList.add(
                "open"
            );

            document.body.classList.add(
                "no-scroll"
            );

        }
    );

});


function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    (e) => {

        if (
            e.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =====================================================
   BACK TO TOP
===================================================== */

backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);



/* =====================================================
   SMOOTH ANCHORS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(e) {

                const target =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });



/* =====================================================
   HERO VIDEO FALLBACK
===================================================== */

heroVideo.addEventListener(
    "error",
    () => {

        document.querySelector(
            ".hero"
        ).style.backgroundImage =
            "url('assets/about.jpeg')";

    }
);



/* =====================================================
   INITIAL SLIDE
===================================================== */

showSlide(0);