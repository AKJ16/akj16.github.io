
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".page");

    if (!page) return;


    /* =========================================================
       PAGE LOAD
       ========================================================= */

    window.scrollTo(0, 0);

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);


    /* =========================================================
       INTRO ANIMATION
       ========================================================= */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            page.classList.add("intro-started");

            /*
             * Shorter intro duration so the page feels
             * responsive rather than slow.
             */

            setTimeout(() => {
                page.classList.remove("intro-started");
            }, 1500);

        });

    });


    /* =========================================================
       RESET NAVIGATION STATE
       ========================================================= */

    function resetAnchorState() {

        page.classList.remove("anchor-navigation");

        document
            .querySelectorAll(".anchor-reveal")
            .forEach(section => {
                section.classList.remove("anchor-reveal");
            });

    }


    /* =========================================================
       NORMAL SCROLL REVEAL
       ========================================================= */

    function handleScroll() {

        const scrollY = window.scrollY;

        /*
         * When we're back at the top, completely reset the
         * special anchor-navigation state.
         */

        if (scrollY < 100) {
            resetAnchorState();
        }


        /*
         * Existing scroll reveal.
         */

        if (scrollY > window.innerHeight * 0.40) {

            page.classList.add("reveal-started");

        } else {

            page.classList.remove("reveal-started");

        }

    }


    /* =========================================================
       ANCHOR NAVIGATION
       ========================================================= */

    document.querySelectorAll(
        '.profile-navigation a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");
            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();


            /*
             * Determine whether we're coming from the top.
             */

            const isAtTop = window.scrollY < 100;


            /* =================================================
               NORMAL NAVIGATION
               ================================================= */

            if (!isAtTop) {

                resetAnchorState();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }


            /* =================================================
               TOP → SECTION REVEAL
               ================================================= */

            resetAnchorState();

            page.classList.add("anchor-navigation");
            page.classList.add("reveal-started");


            /*
             * Force a fresh animation every time.
             */

            void target.offsetWidth;


            requestAnimationFrame(() => {

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY;


                /*
                 * Smooth scroll to the section.
                 */

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });


                /*
                 * Start the animation after the scroll
                 * has begun.
                 *
                 * 500ms gives the scroll time to approach
                 * the target without feeling delayed.
                 */

                setTimeout(() => {

                    target.classList.add("anchor-reveal");

                }, 500);


                /*
                 * Clean up after the animation.
                 */

                setTimeout(() => {

                    page.classList.remove(
                        "anchor-navigation"
                    );

                }, 1300);

            });

        });

    });


    /* =========================================================
       SCROLL EVENT
       ========================================================= */

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();

});
