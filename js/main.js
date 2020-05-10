function pageTransition() {
  var tl = gsap.timeline();
  tl.set(".loading-screen", { transformOrigin: "bottom left" });
  tl.to(".loading-screen", { duration: 0.5, scaleY: 1 });
  tl.to(".loading-screen", {
    duration: 0.5,
    scaleY: 0,
    skewX: 0,
    transformOrigin: "top left",
    ease: "power1.out",
    delay: 1,
  });
}

function contentAnimation() {
  var tl = gsap.timeline();
  var t2 = gsap.timeline();
  var t3 = gsap.timeline();
  var t5 = gsap.timeline({ delay: 1 }),
    firstBg = document.querySelectorAll(".text__first-bg"),
    secBg = document.querySelectorAll(".text__second-bg"),
    thirdBg = document.querySelectorAll(".text__third-bg"),
    word = document.querySelectorAll(".text__word");

  t5.to(firstBg, 0.2, { scaleX: 1 })
    .to(secBg, 0.2, { scaleX: 1 })
    .to(thirdBg, 0.2, { scaleX: 1 })
    .to(word, 0.1, { opacity: 1 }, "-=0.1")
    .to(firstBg, 0.2, { scaleX: 0 })
    .to(secBg, 0.2, { scaleX: 0 })
    .to(thirdBg, 0.2, { scaleX: 0 });

  tl.fromTo(
    ".balloon-border",
    { translateY: 200, opacity: 1 },
    { duration: 8, translateY: -100, opacity: 0.5 }
  );

  t2.fromTo(
    ".balloons",
    { translateY: 100, opacity: 2 },
    { duration: 8, translateY: -300, opacity: 1 }
  );

  t3.fromTo(".cake", { opacity: -2 }, { duration: 12, opacity: 1 });

  t3.add(t5, "-=5");
}

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});
