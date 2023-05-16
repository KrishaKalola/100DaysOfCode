//parallex effect

const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();
    
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
})

//card design

      const wrapper = document.querySelector(".wrapper");
      const carousel = document.querySelector(".carousel");
      const firstCardWidth = carousel.querySelector(".card").offsetWidth;
      const arrowBtns = document.querySelectorAll(".wrapper .arrows");
      const carouselChildrens = [...carousel.children];
      let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
      let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
      carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
          carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });
      
      carouselChildrens.slice(0, cardPerView).forEach(card => {
          carousel.insertAdjacentHTML("beforeend", card.outerHTML);
      });
      
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
      arrowBtns.forEach(btn => {
          btn.addEventListener("click", () => {
              carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
          });
      });
      const dragStart = (e) => {
          isDragging = true;
          carousel.classList.add("dragging");
          startX = e.pageX;
          startScrollLeft = carousel.scrollLeft;
      }
      const dragging = (e) => {
          if(!isDragging) return;
          carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
      }
      const dragStop = () => {
          isDragging = false;
          carousel.classList.remove("dragging");
      }
      const infiniteScroll = () => {
          if(carousel.scrollLeft === 0) {
              carousel.classList.add("no-transition");
              carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
              carousel.classList.remove("no-transition");
          }
          else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
              carousel.classList.add("no-transition");
              carousel.scrollLeft = carousel.offsetWidth;
              carousel.classList.remove("no-transition");
          }
          clearTimeout(timeoutId);
          if(!wrapper.matches(":hover")) autoPlay();
      }
      const autoPlay = () => {
          if(window.innerWidth < 800 || !isAutoPlay) return; 
           timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
      }
      autoPlay();
      carousel.addEventListener("mousedown", dragStart);
      carousel.addEventListener("mousemove", dragging);
      document.addEventListener("mouseup", dragStop);
      carousel.addEventListener("scroll", infiniteScroll);
      wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
      wrapper.addEventListener("mouseleave", autoPlay);
