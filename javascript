<script>

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);

  gsap.defaults({
    ease: "expo.out",
    duration: 0.8,
  });

  let lenis;
  let isMobile = window.innerWidth < 480;

  window.addEventListener("resize", () => {
    isMobile = window.innerWidth < 480;
  });

  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading");
    const boxWidth = Math.floor(window.innerWidth / 12); // as defined in CSS.
    const rowsRequired = Math.ceil(window.innerHeight / boxWidth);
    const numberOfCubes = rowsRequired * 12;

    const createCube = () => {
      const cube = document.createElement("div");
      cube.classList.add("load_page_block");
      return cube;
    };

    for (let i = 0; i < numberOfCubes; i++) {
      loadingScreen.appendChild(createCube());
    }

    loadingScreen.style.backgroundColor = "transparent";
    let pixel = document.querySelectorAll(".loading_bar");
    let loadingScreenEnd = 2.05;

    let loadingTl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "expo.out",
      },
    });

    loadingTl
      .to(
        ".loading_bar_wrap",
        {
          delay: 0.6,
          width: "auto",
          duration: 2,
          ease: "expo.out",
        },
        0
      )
      .from(
        pixel,
        {
          yPercent: 140,
          stagger: 0.05,
          ease: "back.out(3)",
          duration: 1,
        },
        0.6
      )
      .set(".loading_txt_container", { display: "none" }, 2.2)
      .to(
        ".load_page_block",
        {
          opacity: 0,
          duration: 0.2,
          stagger: (index) => {
            return (gsap.utils.random(0, 0.7) * (index + 1)) / numberOfCubes;
          },
        },
        loadingScreenEnd
      )
      .set("load_page", { display: "none" })
      .fromTo(
        ".video_embed",
        {
          yPercent: 50,
          scale: 0.9,
          duration: 1.4,
          ease: "expo.out",
        },
        {
          yPercent: 0,
          scale: 1,
        },
        "-=0.8"
      );
  });

  function initModal() {
    const ticketButton = document.getElementById("get-tickets");
    const modalBg = document.getElementById("modal-bg");
    const modalContainer = document.getElementById("modal-container");
    const closers = document.querySelectorAll('[wb-data="close"]');

    ticketButton.addEventListener("click", function () {
      document.body.classList.add("no_scroll");
      setTimeout(() => {
        document.getElementById("First-Name").focus();
      }, 100);
    });

    [modalBg, modalContainer].forEach((element) => {
      closers.forEach((closer) => {
        closer.addEventListener("click", function () {
          document.body.classList.remove("no_scroll");
        });
      });
    });
  }
  initModal();

  function initNavLink() {
    let navLinks = document.querySelectorAll(".nav_link");

    navLinks.forEach((navLink) => {
      const text = navLink.innerText;

      navLink.addEventListener("mouseenter", function () {
        gsap.to(navLink, {
          duration: 0.6,
          scrambleText: {
            text: text,
            chars: "uppercase",
            speed: 0.4,
          },
        });
      });

      navLink.addEventListener("mouseleave", function () {
        gsap.to(navLink, {
          duration: 0.6,
          scrambleText: {
            text: text,
            chars: "uppercase",
          },
        });
      });
    });
  }
  initNavLink();

  function initAccordions() {
    let accordions = document.querySelectorAll(".box_item");

    accordions.forEach((accordion) => {
      let trigger = accordion.querySelector(".box_item_link");
      let dots = accordion.querySelectorAll(".arrow_dot");
      let content = accordion.querySelector(".box_content_wrap");

      let openTl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "expo.out",
        },
        paused: true,
        reversed: true,
      });

      openTl
        .fromTo(
          content,
          {
            height: "0px",
          },
          {
            height: "auto",
          },
          0
        )
        .to(
          [dots[0], dots[4]],
          {
            yPercent: 200,
            stagger: 0.2,
          },
          0
        )
        .to(dots[2], { yPercent: -200 }, 0.1);

      trigger.addEventListener("click", function () {
        if (openTl.reversed()) {
          openTl.play();
        } else {
          gsap.to(openTl, { time: 0, ease: "power4.out", overwrite: true });
          openTl.reverse();
        }
      });

      lenis.resize();
    });
  }
  initAccordions();
});



</script>
