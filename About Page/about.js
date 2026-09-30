if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".page");

    if (!page) return;


    /* =========================================================
       ALWAYS START AT THE TOP
       ========================================================= */

    window.scrollTo(0, 0);

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);


    /* =========================================================
       INTRO ANIMATION
       ========================================================= */

    document.documentElement.classList.remove("intro-pending");

    page.classList.add("intro-started");

    setTimeout(() => {
        page.classList.remove("intro-started");
    }, 1500);

});
