document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".page");

    if (!page) return;


    /* =========================================================
       SCROLL BEHAVIOR
       ========================================================= */

    function handleScroll() {

        const scrollY = window.scrollY;

        /*
         * Start the reveal after the user has scrolled
         * 40% of the viewport height.
         */

        if (scrollY > window.innerHeight * 0.40) {

            page.classList.add("reveal-started");

        } else {

            /*
             * Returning near the top removes the class.
             *
             * This resets the animation so it can play again
             * the next time the user scrolls down.
             */

            page.classList.remove("reveal-started");
        }
    }


    /* =========================================================
       EVENTS
       ========================================================= */

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /*
     * Run once when the page loads.
     */

    handleScroll();

});
