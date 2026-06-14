const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

function getCarouselStep() {
  if (!carousel) return 0;
  const firstImage = carousel.querySelector("img");
  return firstImage ? firstImage.getBoundingClientRect().width + 16 : carousel.clientWidth;
}

if (carousel && prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -getCarouselStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: getCarouselStep(), behavior: "smooth" });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    productCards.forEach((card) => {
      const shouldShow = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
