(function () {
  ("use strict");

  /**
   * Easy selector helper function
   */
  function select(el, all = false) {
    el = el.trim();
    if (all) {
      return Array.from(document.querySelectorAll(el));
    } else {
      return document.querySelector(el);
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * change background-color to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 500) {
        selectHeader.style = "  background-color: var(--black);";
      } else {
        selectHeader.style = "  background-color: transparent;";
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * project isotope and filter
   */
  window.addEventListener("load", () => {
    let ProjectsContainer = select(".Projects-container");
    if (ProjectsContainer) {
      let ProjectsIsotope = new Isotope(ProjectsContainer, {
        itemSelector: ".Projects-item",
      });

      let ProjectsFilters = select("#Projects-flters li", true);

      on(
        "click",
        "#Projects-flters li",
        function (e) {
          e.preventDefault();
          ProjectsFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          ProjectsIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          ProjectsIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate Projects lightbox
   */
  const ProjectsLightbox = GLightbox({
    selector: ".Projects-lightbox",
  });

  /**
   * Projects details
   */

  const projectsData = [
    {
      id: "1",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/template_onix/",
      description:
        "The Onix landing website serves as an introduction to the company's services, highlighting their expertise and offerings.",
      images: [
        "assets/img/onix-min.png",
        "assets/img/onix2-min.png",
        "assets/img/onix3-min.png",
      ],
    },
    {
      id: "2",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/TEBA-LAB/",
      description:
        "Teba Lab is a medical center that provides a variety of important medical services,including blood analysis and measure cholesterol levels.",
      images: [
        "assets/img/teba-min.png",
        "assets/img/teba2-min.png",
        "assets/img/teba3-min.png",
      ],
    },
    {
      id: "3",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/E-Commerce/",
      description:
        "Online platform for businesses to sell products/services, customers can select items through the internet.",
      images: [
        "assets/img/e-commerce-min.png",
        "assets/img/e-commerce2-min.png",
        "assets/img/e-commerce3-min.png",
      ],
    },
    {
      id: "4",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/hospital_system/",
      description:
        "Hospital system landing website serves as an entry point, introducing the hospital's services, facilities, and expertise.",
      images: [
        "assets/img/hospital-min.png",
        "assets/img/hospital2-min.png",
        "assets/img/hospital3-min.png",
      ],
    },
    {
      id: "5",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/patient_dashbord/",
      description:
        "Health records, appointments, communication, and resources, empowering patients for better healthcare management.",
      images: [
        "assets/img/dash-min.png",
        "assets/img/dash2-min.png",
        "assets/img/dash3-min.png",
      ],
    },
    {
      id: "6",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/template2/",
      description:
        "A website template is a pre-designed layout or structure for a website that can be customized and used to create a fully functional site.",
      images: [
        "assets/img/template1-min.png",
        "assets/img/template1-2-min.png",
        "assets/img/template1-3-min.png",
      ],
    },
    {
      id: "7",
      category: "Web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/template-1/",
      description:
        "A website template is a pre-designed layout or structure for a website that can be customized and used to create a fully functional site.",
      images: [
        "assets/img/template2-min.png",
        "assets/img/template2-2-min.png",
        "assets/img/template2-3-min.png",
      ],
    },
    {
      id: "8",
      category: "App",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/ToDo-List/",
      description:
        "To Do is a software application designed to help individuals or teams organize and manage their tasks, activities, and responsibilities. ",
      images: [
        "assets/img/todo-min.png",
        "assets/img/todo2-min.png",
        "assets/img/todo3-min.png",
      ],
    },
    {
      id: "9",
      category: "App",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/Calculator/",
      description:
        "This project is a simple calculator application that allows users to perform basic arithmetic operations and provides a user-friendlyinterface for performing addition, subtraction, multiplication, and division operations.",
      images: [
        "assets/img/calculator_app-min.png",
        "assets/img/calculator_app2-min.png",
        "assets/img/calculator_app3-min.png",
      ],
    },
    {
      id: "10",
      category: "App",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/Quiz-App/",
      description:
        "quiz app is a software application designed to present users with a series of questions to test their knowledge,skills, or expertise on a particular subject or topic.",
      images: [
        "assets/img/quiz-min.png",
        "assets/img/quiz2-min.png",
        "assets/img/quiz3-min.png",
      ],
    },
    {
      id: "11",
      category: "web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/rating/",
      description:
        "Online platform for users to rate products/services with reviews, aiding informed decision-making for consumers.",
      images: [
        "assets/img/rating-min.png",
        "assets/img/rating2-min.png",
        "assets/img/rating3-min.png",
      ],
    },
    {
      id: "12",
      category: "web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/Memes-Generator/",
      description:
        "Meme Generator is a fun React web application that allows users to create custom memes by combining images and adding their own text captions. The application provides an intuitive user interface where users can select images from a library, add text, and creative memes.",
      images: [
        "assets/img/meme_generator-min.png",
        "assets/img/meme_generator2-min.png",
        "assets/img/meme_generator3-min.png",
      ],
    },
    {
      id: "13",
      category: "web",
      date: "2023-08-19",
      url: "https://basemyahia402.github.io/Memes-Generator/",
      description:
        "Process to regain access after forgetting login credentials on an online platform.",
      images: [
        "assets/img/forget-min.png",
        "assets/img/forget2-min.png",
        "assets/img/forget3-min.png",
      ],
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    const projectDetailsContainer = select("#Projects-details");
    if (projectDetailsContainer) {
      const queryParams = new URLSearchParams(window.location.search);

      const projectId = queryParams.get("project");
      const selectedProject = projectsData.find(
        (project) => project.id === projectId
      );

      if (selectedProject) {
        const projectDetailsHTML = `
               <div class="container">
          <div class="row gy-4">
            <div class="col-lg-8">
              <div class="Projects-details-slider swiper">
                <div class="swiper-wrapper align-items-center">
                  <div class="swiper-slide">
                    <img src="${selectedProject.images[0]}" alt="" />
                  </div>

                  <div class="swiper-slide">
                    <img src="${selectedProject.images[1]}" alt="" />
                  </div>

                  <div class="swiper-slide">
                    <img src="${selectedProject.images[2]}" alt="" />
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="Projects-info">
                <h3>Project information</h3>
                <ul>
                  <li><strong>Category</strong>: ${selectedProject.category}</li>
                  <li><strong>Project date</strong>:${selectedProject.date}</li>
                  <li>
                    <strong>Project URL</strong>:
                    <a href="${selectedProject.url}" target="_blank">www.website.com</a>
                  </li>
                </ul>
              </div>
              <div class="Projects-description">
                <h2>Project Description</h2>
                <p>
               ${selectedProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
    `;

        projectDetailsContainer.innerHTML = projectDetailsHTML;
      } else {
        projectDetailsContainer.innerHTML = "<p>Project details not found.</p>";
      }
    }
    new Swiper(".Projects-details-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
  
})();
