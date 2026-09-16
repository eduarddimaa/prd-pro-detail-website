// Anul curent în footer
document.getElementById("year").textContent = new Date().getFullYear();

// Meniu mobil
var toggle = document.getElementById("navToggle");
var links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
    toggle.textContent = links.classList.contains("open") ? "✕" : "☰";
  });
}

// Animație la scroll
var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(function (el) {
  observer.observe(el);
});

// Lightbox galerie
var gallery = document.getElementById("gallery");
var lb = document.getElementById("lightbox");
if (gallery && lb) {
  var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
  var lbImg = document.getElementById("lbImg");
  var counter = document.getElementById("lbCounter");
  var current = 0;

  function show(i) {
    current = (i + figures.length) % figures.length;
    var img = figures[current].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    counter.textContent = current + 1 + " / " + figures.length;
  }
  function open(i) {
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }

  figures.forEach(function (fig, i) {
    fig.addEventListener("click", function () {
      open(i);
    });
  });
  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbNext").addEventListener("click", function (e) {
    e.stopPropagation();
    show(current + 1);
  });
  document.getElementById("lbPrev").addEventListener("click", function (e) {
    e.stopPropagation();
    show(current - 1);
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });

  // Swipe pe telefon
  var startX = 0;
  lb.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });
  lb.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) show(current - 1);
    if (dx < -50) show(current + 1);
  });
}
