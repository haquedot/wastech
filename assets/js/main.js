(function ($) {
  "use strict";

  $(document).ready(function () {
    /*---------- Mobile Menu  ----------*/
    $.fn.globalmobilemenu = function (options) {
      var opt = $.extend(
        {
          menuToggleBtn: ".global-menu-toggle",
          bodyToggleClass: "global-body-visible",
          subMenuClass: "global-submenu",
          subMenuParent: "menu-item-has-children",
          globalSubMenuParent: "menu-item-has-children",
          subMenuParentToggle: "global-active",
          meanExpandClass: "global-mean-expand",
          appendElement: '<span class="global-mean-expand"></span>',
          subMenuToggleClass: "global-open",
          toggleSpeed: 400,
        },
        options
      );

      return this.each(function () {
        var menu = $(this); // Select menu

        // Menu Show & Hide
        function menuToggle() {
          menu.toggleClass(opt.bodyToggleClass);

          // collapse submenu on menu hide or show
          var subMenu = "." + opt.subMenuClass;
          $(subMenu).each(function () {
            if ($(this).hasClass(opt.subMenuToggleClass)) {
              $(this).removeClass(opt.subMenuToggleClass);
              $(this).css("display", "none");
              $(this).parent().removeClass(opt.subMenuParentToggle);
            }
          });
        }

        // Class Set Up for every submenu
        menu.find("." + opt.subMenuParent).each(function () {
          var submenu = $(this).find("ul");
          submenu.addClass(opt.subMenuClass);
          submenu.css("display", "none");
          $(this).addClass(opt.subMenuParent);
          $(this).addClass(opt.globalSubMenuParent); // Add menu-item-has-children class
          $(this).children("a").append(opt.appendElement);
        });

        // Toggle Submenu
        function toggleDropDown($element) {
          var submenu = $element.children("ul");
          if (submenu.length > 0) {
            $element.toggleClass(opt.subMenuParentToggle);
            submenu.slideToggle(opt.toggleSpeed);
            submenu.toggleClass(opt.subMenuToggleClass);
          }
        }

        // Submenu toggle Button
        var itemHasChildren = "." + opt.globalSubMenuParent + " > a";
        $(itemHasChildren).each(function () {
          $(this).on("click", function (e) {
            e.preventDefault();
            toggleDropDown($(this).parent());
          });
        });

        // Menu Show & Hide On Toggle Btn click
        $(opt.menuToggleBtn).each(function () {
          $(this).on("click", function () {
            menuToggle();
          });
        });

        // Hide Menu On outside click
        menu.on("click", function (e) {
          e.stopPropagation();
          menuToggle();
        });

        // Stop Hide full menu on menu click
        menu.on("click", function (e) {
          e.stopPropagation();
        });

        // Prevent submenu from hiding when clicking inside the menu
        menu.find("div").on("click", function (e) {
          e.stopPropagation();
        });
      });
    };

    $(".global-menu-wrapper").globalmobilemenu();

    /*---------- Sticky fix ----------*/
    $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 10) {
        $(".sticky-wrapper").addClass("sticky");
        $(".category-menu").addClass("close-category");
      } else {
        $(".sticky-wrapper").removeClass("sticky");
        $(".category-menu").removeClass("close-category");
      }
    });

    $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 10) {
        $(".sticky-wrapper2").addClass("sticky");
        $(".category-menu").addClass("close-category");
      } else {
        $(".sticky-wrapper2").removeClass("sticky");
        $(".category-menu").removeClass("close-category");
      }
    });

    // After
    $(".menu-expand").on("click", function (e) {
      e.preventDefault();
      $(".category-menu").toggleClass("open-category");
    });

    /*---------- Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
      $($sideMunuOpen).on("click", function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
      var sideMenuChild = $sideMenu + " > div";
      $(sideMenuChild).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls);
      });

      $($sideMenuCls).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    }

    popupSideMenu(".sidemenu-cart", ".sideMenuToggler", ".sideMenuCls", "show");
    popupSideMenu(".sidemenu-info", ".sideMenuInfo", ".sideMenuCls", "show");

    /*-----------------------------------
           Set Background Image & Mask   
        -----------------------------------*/
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }

    if ($("[data-mask-src]").length > 0) {
      $("[data-mask-src]").each(function () {
        var mask = $(this).attr("data-mask-src");
        $(this).css({
          "mask-image": "url(" + mask + ")",
          "-webkit-mask-image": "url(" + mask + ")",
        });
        $(this).addClass("bg-mask");
        $(this).removeAttr("data-mask-src");
      });
    }

    /*-----------------------------------
           Back to top    
        -----------------------------------*/
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $(document).on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });

    /*-----------------------------------
            MagnificPopup  view    
    -----------------------------------*/
    $(".popup-video").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });

    $(".popup-img").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    /*---------- Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
      // Sidebar Popup
      $($sideMunuOpen).on("click", function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
      var sideMenuChild = $sideMenu + " > div";
      $(sideMenuChild).on("click", function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenuCls).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    }
    popupSideMenu(".sidemenu-cart", ".sideMenuToggler", ".sideMenuCls", "show");
    popupSideMenu(".sidemenu-info", ".sideMenuInfo", ".sideMenuCls", "show");

    $(function () {
      // Intro1 Slider
    const sliderActive1 = ".intro1-slider";
    const sliderInit1 = new Swiper(sliderActive1, {
      loop: true,
      slidesPerView: 1,
      effect: "fade",
      speed: 3000,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".array-prev",
        prevEl: ".array-next",
      },
      pagination: {
        el: ".dot",
        clickable: true,
      },
    });

    function animated_swiper(selector, init) {
      const animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");
          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one("animationend", function () {
              $(this).removeClass(anim + " animated");
            });
        });
      };
      animated();
      init.on("slideChange", function () {
        $(sliderActive1 + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    }
    animated_swiper(sliderActive1, sliderInit1);

    // Intro2 Slider
    var swiper = new Swiper(".intro2-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
          centeredSlides: true,
        },
        425: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      navigation: {
        nextEl: ".intro2-items__card-arrowRight",
        prevEl: ".intro2-items__card-arrowLeft",
      },
    });

    // Project Slider
    var swiper = new Swiper(".project1-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".slider-pagination",
        type: "bullets",
        clickable: true,
      },
    });

    // Testimonial Slider
    var swiper = new Swiper(".testimonial1-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      navigation: {
        nextEl: ".testimonial1-card-controls__arrowRight",
        prevEl: ".testimonial1-card-controls__arrowLeft",
      },
    });

    // Testimonial2 Slider
    var swiper = new Swiper(".testimonial2-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        991: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".slider-pagination",
        type: "bullets",
        clickable: true,
      },
    });

    // Service2 Slider
    var swiper = new Swiper(".service2-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".slider-pagination",
        type: "bullets",
        clickable: true,
      },
    });

    /*----------------------------------------
    Bootstrap dropdown               
-------------------------------------------*/

    // Add slideDown animation to Bootstrap dropdown when expanding.

    $(".dropdown").on("show.bs.dropdown", function () {
      $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
    });
    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $(".dropdown").on("hide.bs.dropdown", function () {
      $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
    });

    /*-----------------------------------
        Img TO Svg Convert
    -----------------------------------*/

    // Convert All Image to SVG
    $("img.svg").each(function () {
      var $img = $(this),
        imgID = $img.attr("id"),
        imgClass = $img.attr("class"),
        imgURL = $img.attr("src");

      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass);
          }
          $svg = $svg.removeAttr("xmlns:a");
          $img.replaceWith($svg);
        },
        "xml"
      );
    });

    // Marquee Slider
    swiper = new Swiper(".heading-slide__active", {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true,
      speed: 8000,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 0.5,
        reverseDirection: false,
        disableOnInteraction: false,
      },
    });

    // Who Will You Meet Carousel
    var whoWillMeetSwiper = new Swiper(".who-will-meet-slider", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".who-will-meet-slider .swiper-pagination",
        clickable: true,
        type: 'bullets',
        renderBullet: function(index, className) {
          if (index % 5 === 0) {
            return '<span class="' + className + '" data-index="' + index + '"></span>';
          }
          return '';
        }
      },
      on: {
        slideChange: function() {
          // Update active dot based on current slide
          var allBullets = document.querySelectorAll('.who-will-meet-slider .swiper-pagination-bullet');
          var currentIndex = this.realIndex;
          
          allBullets.forEach(function(bullet, index) {
            bullet.classList.remove('swiper-pagination-bullet-active');
          });
          
          // Activate the appropriate bullet based on slide position
          var activeBulletIndex = Math.floor(currentIndex / 5);
          if (allBullets[activeBulletIndex]) {
            allBullets[activeBulletIndex].classList.add('swiper-pagination-bullet-active');
          }
        }
      },
      navigation: {
        nextEl: ".who-will-meet-slider .swiper-button-next",
        prevEl: ".who-will-meet-slider .swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    /*-----------------------------------
           Wow Animation 
        -----------------------------------*/
    new WOW().init();

    /*-----------------------------------
           Counter Animation 
        -----------------------------------*/
    function animateCounter() {
      const counterNumbers = document.querySelectorAll('.counter-number');
      
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1500; // Animation duration in ms
            const steps = 60; // Number of steps
            const stepDuration = duration / steps;
            let currentStep = 0;

            counter.classList.add('animated');

            const timer = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              const currentValue = Math.floor(target * progress);
              
              counter.textContent = currentValue + suffix;

              if (currentStep >= steps) {
                counter.textContent = target + suffix;
                counter.classList.add('counted');
                clearInterval(timer);
              }
            }, stepDuration);
          }
        });
      }, observerOptions);

      counterNumbers.forEach(counter => observer.observe(counter));
    }

    // Initialize counter animation when DOM is ready
    animateCounter();

    }); 
  }); // End Document Ready Function
})(jQuery); // End jQuery
