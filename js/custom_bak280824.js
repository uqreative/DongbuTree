$(document).ready(function() {
     mGnb();
     dropdown();
     lenis();
     backtop();
     noScroll();
     fullMenuButton();
     openFaq();
     openPopup();
     tabLink();
     gsap.registerPlugin(ScrollTrigger);
     if (window.location.pathname === '/') {
      newsTitle();
      verSlider();
      newsParallax();
      shoBlob();
      mSlider();
      pSlider();
      tabs();
    }
    });
    
    // set cookie
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    // get cookie
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    
    // login ? true
    function checkLogin() {
      return getCookie("loggedIn") === "true";
    }
    
    // display login/logout button
    function handleLoginLogout(rbutton) {
      
              // login
              $(document).on('click', '#memberLogin', function(e) {
                e.preventDefault();
                setCookie("loggedIn", "true", 1);
                // location.reload('/');
                window.location.href = "/";
            });
  
            // logout
            $(document).on('click', '#logoutButton', function(e) {
                e.preventDefault();
                setCookie("loggedIn", "false", 1);
                location.reload();
            });
  
      if (checkLogin()) {
          const logoutData = rbutton.item2;
          $('.rbutton').append(`
              <a href="#" class="link is-light member__icon">
                <span class="icon is-small is-left">
                  <i class="ph-fill ph-user-circle"></i>
                </span>
                <span>마이페이지</span>
              </a>
              <a href="${logoutData.url}" class="button is-light" id="logoutButton">
                <strong>${logoutData.name}</strong>
              </a>
          `);
      } else {
          const loginData = rbutton.item1;
          $('.rbutton').append(`
              <a href="${loginData.url}" class="link is-light" id="loginButton">
                <strong>${loginData.name}</strong>
              </a>
          `);
      }
    }
    
    function mGnb() {
    // $(".navbar-burger").click(function() {
    //     $(".navbar-burger").toggleClass("is-active");
    //     $(".navbar-menu").toggleClass("is-active");
    // });
    }
    
    function noScroll() {
      const { body, documentElement } = document;
      let { scrollTop } = document.documentElement;
  
      function disableScroll() {
        scrollTop = documentElement.scrollTop;
        body.style.top = `-${scrollTop}px`;
        body.classList.add("scroll-disabled");
      }
  
      function enableScroll() {
        body.classList.remove("scroll-disabled");
        documentElement.style.scrollBehavior = "auto";
        documentElement.scrollTop = scrollTop;
        documentElement.style.removeProperty("scroll-behavior");
        body.style.removeProperty("top");
      }
  
      $('.search_icon').on('click', disableScroll);
      // document.getElementById('disable').addEventListener('click', disableScroll);
    }
  
    function searchW() {
      $('.search_icon').on('click', function(e){
        e.preventDefault();
        $('.search').slideDown();
        $(this).css('display', 'none')
        $('.close_icon').css('display', 'flex')
      })
      
      $('.close_icon').on('click', function(e){
        e.preventDefault();
        $('.search').slideUp();
        $(this).css('display', 'none')
        $('.search_icon').css('display', 'flex')
      })
    }
    // full menu Button
    function fullMenuButton() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // fullmenu burger
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        // el.classList.a('is-active');
        $('body').toggleClass('fixed')
      //   $('.mnav').toggle();
      //   $('.search_icon').toggle();
      //   $('.rnav').toggle();
      //   $('.rbutton').toggle();
      //   $('.header').toggleClass('borderless')
      //   $('.navbar-end').toggleClass('ml-auto');
        $('.fullmenu').slideToggle();
  
      });
    });
    }

    function dropdown() {
      // DROPDOWNS
      const $clickableDropdowns = document.querySelectorAll(
        ".dropdown:not(.is-hoverable)",
      );
    
      if ($clickableDropdowns.length > 0) {
        $clickableDropdowns.forEach(($dropdown) => {
          if (!$dropdown.querySelector("button")) {
            return;
          }
    
          $dropdown.querySelector("button").addEventListener("click", (event) => {
            event.stopPropagation();
            $dropdown.classList.toggle("is-active");
          });
        });
    
        document.addEventListener("click", () => {
          closeDropdowns();
        });
      }
    
      function closeDropdowns() {
        $clickableDropdowns.forEach(($el) => {
          $el.classList.remove("is-active");
        });
      }
    }
    function mSlider() {
      'use strict';
        const progressCircle = document.querySelector(".autoplay-progress svg");
        const progressContent = document.querySelector(".autoplay-progress span");
        const mSlider = new Swiper(".slider .mSlider", {
            // centeredSlides: true,
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            pagination: {
              el: ".swiper-pagination",
              // type: "progressbar",
            // dynamicBullets: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                  progressCircle.style.setProperty("--progress", 1 - progress);
                  progressContent.textContent = `${Math.ceil(time / 1000)}`;
                }
              }
          });
    }
    function pSlider() {
      'use strict';
        const pSlider = new Swiper(".products .myProduct", {
            slidesPerView: 3,
            spaceBetween: 30,
            // pagination: {
            //   el: ".swiper-pagination",
            //   clickable: true,
            // },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }
    function tabs() {
      $('#tab .tab1').addClass('is-primary is-selected');
      $('#tab1').siblings().hide();
      $('#tab .tab1').click(function(){
        $("#tab1").fadeIn("slow")
        $('#tab1').siblings().hide();
        $(this).addClass('is-primary is-selected')
        $(this).siblings().removeClass('is-primary is-selected')
      })
      $('#tab .tab2').click(function(){
        $("#tab2").fadeIn("slow")
        $('#tab2').siblings().hide();
        $(this).addClass('is-primary is-selected')
        $(this).siblings().removeClass('is-primary is-selected')
      })
    }
    
    
    function shoBlob() {
      var $cursor = document.querySelector('.blob');
      $(document).mousemove(function(e){
        if($("#blob:hover").length != 0){
          var x = e.clientX;
          var y = e.clientY;
          $cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
          $cursor.style.position = `fixed`
          $cursor.style.opacity = '1'
          $cursor.style.zIndex = '0'
          $cursor.style.scale = '1'
          
      } else {
        $cursor.style.position = `absolute`
        $cursor.style.opacity = '0'
        $cursor.style.zIndex = '-1'
        $cursor.style.scale = '.2'
      }
      })
    }
    
    function newsTitle() {
      var $news = $('.news');
      var $title = $('.news__title');
      $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $news.offset().top + $news.outerHeight() * 0.6 ) {
          $title.css('position', 'sticky');
          $title.css('transform', 'translateY(0)');
          $title.css('top', '0');
          $title.fadeOut();
        } else {
          $title.fadeIn();
          $title.css('position', 'sticky');
          $title.css('transform', 'translateY(-50%)');
          $title.css('top', '50%');
        }
    });
    }
    
    
    function newsParallax() {
      $(window).on("load scroll", function() {
        var parallaxElement = $(".news1"),
          parallaxQuantity = parallaxElement.length;
          var parallaxElement2 = $(".news2"),
            parallaxQuantity2 = parallaxElement2.length;
        window.requestAnimationFrame(function() {
          for (var i = 0; i < parallaxQuantity; i++) {
            var currentElement = parallaxElement.eq(i),
              windowTop = $(window).scrollTop(),
              elementTop = currentElement.offset().top,
              elementHeight = currentElement.height(),
              viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
              scrolled = windowTop - elementTop + viewPortHeight;
            currentElement.css({
              transform: "translate3d(0," + scrolled * -0.1 + "px, 0)"
            });
          }
        });
        window.requestAnimationFrame(function() {
          for (var i = 0; i < parallaxQuantity2; i++) {
            var currentElement = parallaxElement2.eq(i),
              windowTop = $(window).scrollTop(),
              elementTop = currentElement.offset().top,
              elementHeight = currentElement.height(),
              viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
              scrolled = windowTop - elementTop + viewPortHeight;
            currentElement.css({
              transform: "translate3d(0," + scrolled * -0.15 + "px, 0)"
            });
          }
        });
      });
    }
    
    // lenis
    function lenis() {
      const lenis = new Lenis({
            lerp: 0.05, 
            wheelMultiplier: 1, 
          });
          
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
    
          $("[data-lenis-start]").on("click", function () {
            lenis.start();
          });
          $("[data-lenis-stop]").on("click", function () {
            lenis.stop();
        
          });
        
        $('.backTop').on('click', function () {
            lenis.scrollTo('#top');
            });
    }
    function tabLink() {
      jQuery(document).ready(function($) {
        $('*[data-href]').on('click', function() {
            window.location = $(this).data("href");
        });
    });
    }
    
    function openFaq() {
      var el = document.getElementsByClassName('faq__title');
      var fel = el[0];
      $(fel).addClass('active');
      $(fel).siblings('.faq__answer').slideToggle();
      $('.faq__title').on('click', function() {
        if($(this).hasClass('active')) {
          $(this).siblings('.faq__answer').slideUp();
          $(this).removeClass('active');
        }
        else {
          $('.faq__answer').slideUp();
          $('.faq__title').removeClass('active');
          $(this).siblings('.faq__answer').slideToggle();
          $(this).toggleClass('active');
        }
      });    
    
      $('.info').on('click', function(){
        $('.info_txt').slideToggle();
        $('.info .ph').toggleClass('ph-caret-up ');
        var $target = $('html,body'); 
        $target.animate({scrollTop: $target.height()}, 1000);
      }) 
    }
    function openPopup() {
       const gallery = document.querySelector('.certificate');
       const popup = document.getElementById('popup');
       const popupImg = document.getElementById('popupImg');
       const closeBtn = document.getElementById('close');

       if (gallery) {
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                const fullSizeSrc = e.target.getAttribute('src');
                popupImg.src = fullSizeSrc;
                popup.style.display = 'flex';
            }
        });
    
        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
      }
    }
  
    
    function backtop(){
      let btn = $('.backTop');
      let menu = $('.quickMenu');
      let header = $('.header');
      
      const url = window.location.origin;
    
      $(window).scroll(function() {
      if ($(window).scrollTop() > 100) {
          btn.addClass('show');
          menu.addClass('show');
          header.addClass('fixed');
          // if (document.getElementById("search").style.display != 'none') {
          //   $('.search').slideUp(200);
          //   $('.close_icon').css('display', 'none')
          //   $('.search_icon').css('display', 'flex')
          // }
      } else if ($(window).scrollTop() > 30) {
          // if (document.getElementById("search").style.display != 'none') {
          //     $('.search').slideUp(400);
          //     $('.close_icon').css('display', 'none')
          //     // $('.search_icon').css('display', 'flex')
              
          //   }
          fetchData(url, function(data) {
              if (data.search.show) {
                  if (document.getElementById("search").style.display != 'none') {
                      $('.search').slideUp(400);
                      $('.close_icon').css('display', 'none');
                      $('.search_icon').css('display', 'flex');
                  }
              }
          });
  
      }
       else {
          btn.removeClass('show');
          menu.removeClass('show');
          header.removeClass('fixed');
      }
      });
    }
    
    
    function verSlider() {
      
          var realIndex = 0
          var verSlide = new Swiper('.verSlide', {
              speed: 1000,
              direction: 'vertical',
              initialSlide: 1,
              mousewheel: true,
              observer: true,
              obsreveParents: true,
              pagination: {
                  el: '.verSlide .swiper-pagination',
                  clickable: true,
              },
              watchOverflow : true,
              on: {
                  slideChange: function() {
                      realIndex = this.realIndex;
                      $('.verSlide').find('.current_box').find('.current').text(realIndex + 1);
                      flag = false;
                      $('.verSlide').find(".swiper-slide").find('.txt_box').removeClass('active');
                      $('.verSlide').find(".swiper-slide").eq(this.realIndex).find('.txt_box').addClass('active');
                      setTimeout(function () {
                          verSlide.params.touchReleaseOnEdges = false;  
                          verSlide.params.mousewheel.releaseOnEdges = false;
                      });
                  },
                  reachEnd: function() {
                      setTimeout(function () {
                          verSlide.params.touchReleaseOnEdges = true;
                          verSlide.params.mousewheel.releaseOnEdges = true;
                      }, 50);
                  },
                      reachBeginning: function() {
                      setTimeout(function () {
                          verSlide.params.touchReleaseOnEdges = true;
                          verSlide.params.mousewheel.releaseOnEdges = true;
                      }, 50);
                  },
                  slideChangeTransitionEnd:function(){
                      flag = true;
                  }
              },
              // breakpoints: {
              //     1024: {
              //         direction: 'horizontal',
              //     },
              // },
          });
      
          ScrollTrigger.matchMedia({
              "(min-width: 1025px)": function() {
                  verSlide_Motion = gsap.timeline({
                      scrollTrigger: {
                          trigger: ".section__vslide",
                          scrub: 0.5,
                          invalidateOnRefresh: true,
                          pin:true,
                          start:'top top',
                          end:'80% top',
                          onEnter:function(){
                            verSlide.disable();
                              setTimeout(function(){
                                  $('.slide_dim').addClass('on');
                              },200);
                              $('.verSlide').find('.top_txt').addClass('active');
                              $('.verSlide').find(".swiper-slide").eq(realIndex).find('.txt_box').addClass('active');
                              $('.swiper-pagination').addClass('active');
          
                          },
                          onEnterBack:function(){
                              setTimeout(function(){
                                  $('.slide_dim').addClass('on');
                              },200);
                          },
                          onLeaveBack:function(){
                              // headerflag = false;
                              setTimeout(function(){
                                  $('.slide_dim').removeClass('on');
                              },200);
                              $('.verSlide').find('.top_txt').removeClass('active');
                              $('.verSlide').find(".swiper-slide").eq(realIndex).find('.txt_box').removeClass('active');
                              $('.swiper-pagination').removeClass('active');
                          },
                          onLeave:function(){
                              // headerflag = false;
                              setTimeout(function(){
                                  $('.slide_dim').removeClass('on');
                              },200);
                          },
                      }
                  });
                  verSlide_Motion1 = gsap.timeline({
                      scrollTrigger: {
                          trigger: ".section__vslide",
                          scrub: 0.5,
                          // markers:true,
                          start:'-30% top',
                          end:'top top',
                          invalidateOnRefresh: true,
                          onEnter:function(){
                            verSlide.slideTo(0);
                            verSlide.disable();
                            setTimeout(() => {
                              verSlide.enable();
                            }, 1000); //
                          },
                      }
                  }).to('.section__vslide .verSlide',{
                      width:'85%',
                      height:'70%'
                  });
              },
              "(max-width: 1024px)": function() {
                  verSlide_Motion = gsap.timeline({
                      scrollTrigger: {
                          trigger: ".section__vslide",
                          scrub: 0.5,
                          invalidateOnRefresh: true,
                          start:'top top',
                          end:'100% top',
                          onEnter:function(){
                              $('.verSlide').find(".swiper-slide").eq(realIndex).find('.txt_box').addClass('active');
                              $('.swiper-pagination').addClass('active');
                              $('.current_box').addClass('active');
          
                          },
                          onEnterBack:function(){
                              // headerflag = true;
                          },
                          onLeaveBack:function(){
                              $('.verSlide').find(".swiper-slide").eq(realIndex).find('.txt_box').removeClass('active');
                              $('.swiper-pagination').removeClass('active');
                              $('.current_box').removeClass('active');
                          },
                          onLeave:function(){
                              // headerflag = false;
                          },
                      }
                  });
      
                  gsap.set([".section__vslide"],{clearProps:"all"});
                  verSlide_Motion1 = gsap.timeline({
                      scrollTrigger: {
                          trigger: ".section__vslide",
                          scrub: 0.5,
                          start:'-30% top',
                          end:'top top',
                          invalidateOnRefresh: true,
                      }
                  }).to('.section__vslide .verSlide',{
                      width:'100%',
                      height:'calc(100% - 180px)'
                  });
              },
          });
              
      }