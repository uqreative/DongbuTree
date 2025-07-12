// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});
// Listen for the scroll event and log the event data
// lenis.on("scroll", (e) => {
//     console.log(e);
// });


// AOS.init({disable: 'mobile'});
window.addEventListener('load', function(){
	AOS.init();
	layerPop();
});


// mGnb menu
// function mGnbOpen() {
//     var mGnb = document.querySelector(".mGnb");
//     var btn_menu = document.querySelector(".btn_menu");
//     var btn_close = document.querySelector(".btn_close");

//     btn_menu.addEventListener("click", function () {
//         mGnb.classList.add("active");
//     });
//     btn_close.addEventListener("click", function (e) {
//         mGnb.classList.remove("active");
//     });
// }
// mGnbOpen();


/* mobile gnb */
$(function(){
	//header menu html 저장
	const gnbMob = $('#header .gnb').html();
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
	});

	//menu close
	$('.btn_close, .cover').on('click',function(){
		$('.mGnb, .cover').removeClass('active');
		mgnbLink.removeClass('active');
		mgnbArea.children('ul').slideUp('fast');
	});
});


var swiper = new Swiper(".heroTextSwiper", {
	effect: 'fade',
    pagination: {
        el: ".swiper-pagination",
		clickable: true,
    }, 
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    speed : 1500,
});

var swiper = new Swiper(".seedInfoSwiper", {
    slidesPerView: 1,
    spaceBetween: 30, 
    navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
    },
    breakpoints: { 
          767: {
              slidesPerView: 2,
              spaceBetween: 40,
          },
          1080: {
              slidesPerView: 3,
              spaceBetween: 50,
          }, 
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
    speed : 1000,
});


//layer popup
function layerPop(){
	if(!($('[data-pop-layer]').length > 0)) return;
	$('[data-pop-layer] .popBox').append('<button type="button" class="btn_close"><span>레이어닫기</span></button>');
	$('[data-pop-layer] .btn_close ,[data-pop-layer] .close').on('click',function(){
		 $('[data-pop-layer] .popBox').parent('div').removeClass('active').fadeOut();
		 //$('body').removeClass('active');
		 return false;
	});
	$(document).mouseup(function(e){
		var container = $('[data-pop-layer] .popBox').parent('div'); 
		if(container.has(e.target).length == 0){
			container.removeClass('active').fadeOut();
			//$('body').removeClass('active');
			$('html,body').off('scroll touchmove mousewheel');
		}
	});
}

function showPopup(el){
	var $el = $(el);
	$el.fadeIn();
	//$('body').addClass('active');
	$('html, body').on('scroll touchmove mousewheel', function(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	});
	setTimeout(function(){
		$el.addClass('active');
	}, 100);
	return false;
}

document.addEventListener("DOMContentLoaded", dropdownNav);
function dropdownNav(){
    const dropdownNavEl = document.querySelector('.dropdownNav');
    dropdownNavEl?.addEventListener('click', (e)=>{
        const targetEl = e.target.closest('button');
        const isExpanded = targetEl?.getAttribute('aria-expanded') === 'true';
        targetEl?.setAttribute('aria-expanded', !isExpanded);
    })
}