/*
 * custom js Document
*/

$(function(){
	$('#fullpage').fullpage({
		licenseKey: 'DABF666B-6823410F-A5659B0B-841B0320',
		fixedElements: '#header',
		autoScrolling:true,
		scrollBar: true,
		normalScrollElements: '.footer',
		easingcss3: 'cubic-bezier(0.175, 0.885, 0.5, 1.1)',
		// scrollingSpeed: 800,
		navigation: false,
		responsiveWidth: 360,
		responsiveHeight: 600,
	});
		
})
$(function(){
AOS.init({disable: 'mobile'});
})
$(function(){
	const mSlide = new Swiper('.mainSlide', {
		loop: true,
		simulateTouch: false,
		effect: 'fade',
        slidesPerView: '1',
        centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
            // type: "progressbar",
		},
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-next",
        }
	})
});
$(function(){
    var btn = $('.backTop');
    var nav = $('.header');
	var lnb = $('.lnb');
	
    $(window).scroll(function() {
    if ($(window).scrollTop() > 120) {
        btn.addClass('show');
		lnb.addClass('on');
        // nav.addClass('fixed');
    } else {
        btn.removeClass('show');
		lnb.removeClass('on');
        // nav.removeClass('fixed');
    }
    });

    btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    });
})

// pc gnb
$(function() {
	const mGnb = $('.main_gnb');
	const header = $('.header');
	$('.main_gnb li').hover(function(){
        $(this).find('a').toggleClass('active')
		$(this).siblings().find('a').removeClass('active')
    });
	mGnb.on('mouseenter', function(){
		gnbOn();
	})
	header.on('mouseleave', function(){
		gnbOff();
	})
	function gnbOn() {
		$('.header').addClass('on')
		$('.main_gnb > li > a').css("color", "var(--black)")
		$('.header').css("background-color", "rgba(255,255,255,1)")
		$('.header').css("border-color", "var(--lgrey)")
		$('.h__logo .wht').attr("src", "/images/common/logo_numeal-green.svg")
		$('.sub_gnb').css("display", "flex")
	}
	function gnbOff() {
		$('.header').removeClass('on')
		$('.main_gnb > li > a').css("color", "var(--white)")
		$('.header').css("background-color", "rgba(255,255,255,0)")
		$('.header').css("border-color", "var(--white)")
		$('.h__logo .wht').attr("src", "/images/common/logo_numeal-white.svg")
		$('.sub_gnb').css("display", "none")
	}

})

/* mobile gnb */
$(function(){
	//header menu html 저장
	const gnbMob = $('#header .gnb .main_gnb').html();
	//mobile에 삽입
	$('.mGnb__ul').append(gnbMob);
	// 모바일 메뉴에서 의자 서브 메뉴 삭제
	$('.mGnb__ul').find('.subMenu:has(.subMenu__part)').remove();
	//mobile show
	$('.btn_menu').on('click',function(){
		$('.mGnb, .cover').addClass('active');
	});

	//mobile menu setting
	const mgnbArea = $('.mGnb__ul > li');
	const mgnbLink = mgnbArea.children('a');
	//li하위 ul이 있는경우 해당 a태그에 open class 추가
	$('.mGnb__ul > li').each(function(){
		if($(this).find('ul').length > 0){
			$(this).children('a').addClass('open');
		}
	});
	//menu click
	mgnbLink.click(function(e){
		if($(this).parent().find('ul').length > 0){
			e.preventDefault();
			if( !$(this).hasClass('active') ){
				mgnbLink.removeClass('active');
			}
			mgnbArea.children('ul').stop().slideUp('fast');
			$(this).toggleClass('active').parent().find('ul').stop().slideToggle('fast');
		}
	})

	//menu close
	$('.btn_close, .cover').on('click',function(){
		$('.mGnb, .cover').removeClass('active');
		mgnbLink.removeClass('active');
		mgnbArea.children('ul').slideUp('fast');
	});
});

    // LNB active

    document.addEventListener('DOMContentLoaded', function () {
        var currentUrl = window.location.pathname;

        var menuLinks = document.querySelectorAll('.lnb .inr ul li a');

        menuLinks.forEach(function (link) {
            if (link.getAttribute('href') === currentUrl) {
                link.classList.add('active');
            }
        });
    });