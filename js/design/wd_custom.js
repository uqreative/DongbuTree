/* 
 * custom js Document
*/ 


$(window).on('load',function(){
	lnbSetControl();
});

$(document).ready(function() {
	header_js();
	responsive();
	//mainvisual();
	//mainTab();
	Tab();
	reviewSlide();
	branchTab();
	layerPopup();
	//smoothScroll();

	
	timeCounter();
});


//start animation + css
$(function(){
	setTimeout(function(){
		$('body').addClass('motion-on');			
	}, 300);
});


//lnb load
function lnbSetControl(){
	if(!($('.lnb').length > 0))	return;	

	//gnb 1차메뉴가 on이 있는경우 구문실행
	if($('#header nav .gnb > li').children('a').hasClass('on')){
		//1차메뉴 on일때 2차 하위저장
		let gnbHtml = $('#header nav .gnb > li > a.on').next('.box').html();

		//lnb add Html
		$('.lnb').append(gnbHtml);

		//1차메뉴 on일때 2차저장 / 3차 저장
		let gnbHtml1_Title= $('#header nav .gnb > li > a.on').html(), //1depth 메뉴명저장
			gnbHtml2 = $('#header nav .gnb > li > a.on').next('.box').html(),
			gnbHtml2_Title = $('#header nav .gnb > li > .box > ul > li').children('a.on').html(), //2depth 메뉴명저장
			gnbHtml3 = $('#header nav .gnb > li ul > li > a.on').next('.box').html(),
			gnbHtml3_Title = $('#header nav .gnb > li ul > li > .box > ul > li').children('a.on').html(); //3depth 메뉴명저장
			
		//활성화 메뉴명뿌리기	
		$('경로').append(gnbHtml1_Title);
		$('경로').append(gnbHtml2_Title);
		$('경로').append(gnbHtml3_Title);

		//nav.lnb ul이나 마크업이 더 필요할경우 추가 - 필요없을시 삭제하면됨.
		$.each($('.lnb'),function(){
			$(this).children("li").wrapAll('<ul></ul>');
		})

		//lnb link #content lnb 링크시점만 추가함. - 필요없으시 삭제하면됨.
		$('.lnb ul > li').each(function(){
			var lnbLink = $(this).find('a').attr('href');
			$(this).find('a').attr('href',lnbLink + '#content');
		});			

		//활성화 값이 없는경우 숨김
		if(typeof gnbHtml2_Title == '' || typeof gnbHtml2_Title == 'undefined'){
			$('경로').remove();
		}
		if(typeof gnbHtml3_Title == '' || typeof gnbHtml3_Title == 'undefined'){
			$('경로').remove();
		}
		
	}else{
		//1차가 on이 없는경우 2차가 없음을 간주하고 lnb자체를 숨김처리함 불필요할때 삭제가능
		$('.area_lnb').hide();
	}
}


function header_js(){
	//btn full
	time_set = 700;

	$('.full-gnb__btn').on('click',function(){
		$(this).children('span').toggleClass('active');	
		$('#header').toggleClass('gnb-hide');	

		if($('.full-gnb').hasClass("active")){
			$('body').removeClass('active');
			$('.full-gnb').removeClass('active');
			setTimeout(function(){
				$('.full-gnb__content').addClass('hide');		
			}, time_set);
		}else{
			$('body').addClass('active');

			$('.full-gnb').addClass('active');	
			$('.full-gnb__content').removeClass('hide');	
			
			//$('.full-gnb__list > li ul').stop().slideUp();
		}

		return false;
	});	

	let gnb_menu = $('.gnb').html();
	$('.full-gnb__list').html(gnb_menu);
	
	/*
	$('.full-gnb__list > li').each( function(i){
		var full_gnb_name = $(this).children('a').attr('class');
		var full_gnb_idx = $(this).index() + 1;
		$(this).addClass('full-gnb__item-0' + full_gnb_idx).children('a').text(full_gnb_name);
	});			
	*/
}



//responsive style
function responsive(){
	var res = ""
	var param = $("#header");
	var gnbArea = $(".gnb > li");
	var gnbLink = gnbArea.children("a");
	var gnbLinkOn = gnbArea.children("a.on");
	var gabEnTitle = $('#header .gnb > li li.active a.on').attr('data-gnbName');
	var pageTitle = gnbLinkOn.children().html();
	var pageNavigation = $('#header .gnb > li li.active a.on span').html();
	
	var lnbHtml = $('#header .gnb > li > a.on').next('ul').html();

	$('body').addClass(gabEnTitle);
	//$('#header nav .gnb > li ul').addClass('active');	
	$('.btn_menu > div').append('<span></span><span></span><span></span>');	

	//sub title	
	$('.sub-visual__text h2').html(pageTitle);
	$('.sub-tit h3').html(pageNavigation);

	//lnb	
	$('.lnb ul').append(lnbHtml);
	$('.lnb ul > li').each(function(){
		var lnbLink = $(this).find('a').attr('href');
		$(this).find('a').attr('href',lnbLink + '#lnb');
	});

	
	//sub navigation
	$('.area_navigation ul li:nth-child(3)').html(pageNavigation);
	$('.area_navigation ul li:nth-child(2)').prepend(pageTitle);

	if(!($('#header .gnb > li > a.on').siblings(".box").length > 0)) {
		$(".area_navigation ul li:last-child").remove();
	}




	//default 
	if(!$(".btn_menu").is(":hidden")) res = "mob";
	else res = "web";  
	param.attr("class",res);
	def(param);

	$(window).resize(function(){
		if(!$(".btn_menu").is(":hidden")) res2 = "mob";
		else res2 = "web"; 
		param.attr("class",res2);
		if(res != res2){
			res = res2;  
			def(param);
		}
	}); 


	//mobile
	$('.btn_menu').on('click',function(){
		if($(this).hasClass('active')){
			$('.btn_menu').removeClass('active');
			$('body').removeClass('active');
			param.find('nav').removeClass('active');
			gnbLink.removeClass('active');	
			gnbLink.parent().find('.box').slideUp();			
			
			posY = $('body').attr('data-scroll');
			$(window).scrollTop(posY);
		}else{
			posY = window.scrollY || document.documentElement.scrollTop;
			$(this).toggleClass('active');		
			setTimeout(function() {
				 $('body').toggleClass('active');
			}, 0);			
			param.find('nav').toggleClass('active');
			gnbLink.removeClass('active');	
			gnbLink.parent().find('.box').slideUp();	
			$('body').attr('data-scroll',posY);
		}
		return false;
	});	

	$('.btn_close').on('click',function(){
		$('.btn_menu').removeClass('active');
		$('body').removeClass('active');
		param.find('nav').removeClass('active');
		gnbLink.removeClass('active');	
		gnbLink.parent().find('.box').slideUp();
		return false;
	});	


	function def(param){
		if(param.attr("class") == "web" ){			
			$('#header .gnb > li > a').unbind('click');
			$('#header .gnb > li > .box').removeAttr('style');
			//$('#header nav .area-util-wrap, #header .gnb > li > a > i').remove();
			$('.btn_menu, body, #header nav').removeClass('active');
			gnbLink.removeClass('active');
			
			gnbLink.on({
				mouseover: function(){
					if(param.attr("class") == "web" || param.attr("class") && "web"){
						$(this).addClass("active").parent().addClass("active"); 
						$(this).parent().hover(function() {
						}, function(){     
						   $(this).removeClass("active", function(){
								$(this).parent().find("a").removeClass("active");
						   });    
						});
						if(!($(this).parent().find(".box").length > 0)) {
						   $(this).parent().removeClass("active").find("a").removeClass("active");
						}
					}
				},
				focus: function(){
					if(param.attr("class") == "web" || param.attr("class") && "web"){
						$(this).addClass("active").parent().addClass("active"); 	

						$('*').not('.gnb *').focus(function() {  
						   gnbLink.parent().removeClass("active", function(){
								gnbLink.removeClass("active");
						   });    
						});

						if(!($(this).parent().find(".box").length > 0)) {
						   $(this).parent().removeClass("active").find("a").removeClass("active");
						}
						
					}
				}
			});
			
		} else if (param.attr("class") == "mob"){ 
			$('#header .gnb li').off('mouseenter mouseleave');
			$('#header.mob .gnb > li').each(function(){
				var gnbLink = $(this).children('a');
				if($(this).children('.box').length > 0){
					gnbLink.on('click',function(e){
						e.preventDefault();
						$('#header .gnb a').removeClass('active');
						gnbArea.children('.box').stop().slideUp();
						$(this).addClass('active');
						$(this).siblings('a').addClass('active');
						$(this).parent().children('.box').stop().slideDown();
						return false;
					});
				}
			});
		}
	}

}


function timeCounter() {
	

	if(!($('.main-youtube').length > 0))	return;	

	var counted = 0;
	$(window).scroll(function() {

	  var oTop = $('.main-youtube').offset().top - window.innerHeight;
	  if (counted == 0 && $(window).scrollTop() > oTop) {
		$('.counter').each(function() {
		  var $this = $(this),
			countTo = $this.attr('data-count');
		  $({
			countNum: $this.text()
		  }).animate({
			  countNum: countTo
			},

			{

			  duration: 1000,
			  easing: 'linear',
			  step: function() {
				$this.text(Math.floor(this.countNum).toLocaleString());
				},
				complete: function () {
					//$this.text(this.countNum + (idx == 3 ? '+' : ''));
					$this.text(this.countNum.toLocaleString());

				}

			});
		});
		counted = 1;
	  }

	});

}


function mainvisual(){
	if(!($('.main-visual').length > 0)) return;
	var visualSwiper = new Swiper(".main-visual", {
		slidesPerView: '1',  // 화면에 보여질 아이템 개수
		loop: true,
		effect: "fade",
		   autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},
		navigation: {
		  nextEl: ".main-visual .swiper-button-next",
		  prevEl: ".main-visual .swiper-button-prev",
		},
		pagination: {
			el: ".main-visual .swiper-pagination",
			clickable: true,
		},
		paginationClickable: true,
		watchSlidesProgress: true,
	});
	$('.visual_control .start').on('click', function(){
		visualSwiper.autoplay.start();
		$(this).hide();
		$('.visual_control .stop').show();
	});
	$('.visual_control .stop').on('click', function(){
		visualSwiper.autoplay.stop();
		$(this).hide();
		$('.visual_control .start').show();
	});
}






function Tab(){
    $(".tab_contents").hide();
    $(".tab_contents:first").show();

    $("ul.tabs li").click(function () {
		if(!($(this).find('a').length > 0)){
			$("ul.tabs li").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents").hide()
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).fadeIn()
		}
    });
}


function reviewSlide(){
	if(!($('.main-youtube').length > 0)) return;
	var reviewSwiper = new Swiper(".reviewSwiper", {
		loop: true,
		autoplay: {delay: 1, },
		freeMode: true,
		speed: 3000,
		slidesPerView: 5,
		spaceBetween: 30,
		breakpoints: {
			300: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			},
			480: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			},
			768: {
			  slidesPerView: 3,
			  spaceBetween: 20,
			},
			1024: {
			  slidesPerView: 4,
			  spaceBetween: 20,
			},
			1300: {
			  slidesPerView: 4,
			  spaceBetween: 30,
			},
			1500: {
			  slidesPerView: 5,
			  spaceBetween: 30,
			},
		 },
	});
	$(".reviewSwiper").mouseenter(function(){
		reviewSwiper.autoplay.stop();
	});

	$(".reviewSwiper").mouseleave(function(){
		reviewSwiper.autoplay.start();
	});
	
}


$(document).ready(function(){

	//accordion tab
	(function($) {
		//$('.accordion > li:first-child > a').addClass('active').next().slideDown();
		$('.accordion > li').click(function(j) {
			var dropDown = $(this).find('div.list');
			$(this).closest('.accordion').find('div.list').not(dropDown).slideUp();

			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).closest('.accordion').find('.active').removeClass('active');
				$(this).addClass('active');
			}

			dropDown.stop(false, true).slideToggle();
			j.preventDefault();
		});
	})(jQuery);

	
	$(function(){
		  var accordionButton = $('.accordion-list .accordion-item > .accordion-link');
		  accordionButton.on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			var target = $this.parent();
			var description = $this.siblings('.accordion-desc');
			var other = target.siblings('.accordion-item');
			var otherDescription = other.find('.accordion-desc');
			accordionToggle(target, description, other, otherDescription);
		  });

		  // 파라미터 정리
		  // target = 아이템 활성화 버튼
		  // description = 활성화 콘텐츠
		  // other = 활성화 시킬때 다른 형제 아이템 활성화 버튼
		  // otherDescription = 활성화 시킬때 다른 형제 아이템 활성화 콘텐츠
		  function accordionToggle(target, description, other, otherDescription){
			if (target.hasClass('active')) {
			  target.removeClass('active');
			  description.stop().slideUp(300);
			} else {
			  target.addClass('active');
			  description.stop().slideDown(300);
			}

			// other, otherDescription 파라미터는 아코디언을 활성화 시킬때 다른 활성화된 아이템을 접기 위한 파라미터 입니다. 만약 다른 아이템들은 접히지 않아도 된다면 해당 파라미터를 비워두면 됩니다.
			if (other && otherDescription) {
			  other.removeClass('active');
			  otherDescription.stop().slideUp(300);
			}
		  };
		});


});



//메인 탭
function branchTab(){
	if(!($('.lnb').length > 0))	return;	
    $(".main-network .tab_content").hide(); //전체 컨텐츠 숨김
    $(".con_branch .tab_content:first").show(); //지점 컨텐츠
    //$(".sec_map > ul > .tab_content:first").show(); //지도 컨텐츠 
 
    $("ul.con_tab li").click(function() {
		
      $(".main-network .tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("."+activeTab).fadeIn();		
		
      $("ul.con_tab li").removeClass("on");
      $(this).addClass("on");

    });
	
}

/*Dropdown Menu*/
$(document).ready(function(){
	$('.dropdown').click(function () {
			$(this).attr('tabindex', 1).focus();
			$(this).toggleClass('active');
			$(this).find('.dropdown-menu').toggleClass('active');
			//$(this).find('.dropdown-menu').slideToggle(300);
		});
		$('.dropdown .dropdown-menu li').click(function () {
			$(this).parents('.dropdown').find('span').html($(this).html());
			$(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
		});
		$('.dropdown-menu').focusout(function () {
			$('dropdown').removeClass('active');
			$('.dropdown-menu').removeClass('active');
			//$(this).find('.dropdown-menu').slideUp(300);
		});
});


$(window).scroll( function(){
	var scrollTop = $(this).scrollTop();

	if ($(window).scrollTop() >= 200) {
		$('#header').addClass('on');
	}
	else {
		$('#header').removeClass('on');
	}


	//scroll  top animaion
	$('[data-ani]').each( function(i){
		
		var bottom_of_object = $(this).offset().top + $(this).outerHeight()/5;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		
		if( bottom_of_window > bottom_of_object ){                
			$(this).addClass("is_moved");	                    
		}
		else{
			$(this).removeClass('is_moved');
		}		
	});     

	$('.is_motion, [data-motion]').each(function(i){		
		var bottom_of_object = $(this).offset().top + $(this).outerHeight()/4;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		
		if( bottom_of_window > bottom_of_object ){                
			$(this).addClass('motion_in');	                    
		}
		else{
			$(this).removeClass('motion_in');
		}		
	}); 



	if($(document).scrollTop()>150){ 
		$('.btn_top').addClass('active');
	}else {
		$('.btn_top').removeClass('active');
	}


});	


$(function(){

	gsap.registerPlugin(ScrollTrigger);
	
	
	ScrollTrigger.matchMedia({
		'(min-width:1025px)':function(){
		   
		   
		   ScrollTrigger.create({
				trigger: ".main-visual",
				start: 'top top',
				end:'+=100%',
				//pin:true,
				//pinSpacing: true,
				toggleClass: "active",
				//toggleClass: {targets: 'header', className: 'fixeds'}
			});
			gsap.timeline({
				scrollTrigger:{
					trigger:'.main-visual',
					// end:'100%',
					scrub:1,
				}
			})
			//.to('.main-youtube',{marginTop:'-100vh',})
			//.to('.main-visual',{transform:'scale(0.92)',})
			

		   ScrollTrigger.create({
				trigger: ".main-service",
				start: 'top top',
				//end:'100% 50%',
				//markers:true,
				pin:true,
				//pinSpacing: true,
				toggleClass: 'active'
			});
			gsap.timeline({
				scrollTrigger:{
					trigger:'.main-service',
					// end:'100%',
					scrub:1.5,
				}
			})
			.to('.main-sns',{marginTop:'-90vh',})

		},
		'(max-width:1024px)':function(){

		}
	})
		

	ScrollTrigger.create({
		trigger: '.main-sns',
		start: 'top 20%',
		end:'+=100%',
		//markers: true,
		toggleClass: {targets: '.main-snshelper', className: 'active'}
	});


	let tl_1 = gsap.timeline();
	  tl_1.fromTo(".main-snshelper__wraps", {
		y:400,
		width: "80%",
		opacity:0,
	  }, {
		 y:0,
		width: "100%",
		opacity:1,
		//stagger: .5,
		duration:2,
		ease: "linear"
	  });


})


function layerPopup(){
	var videoEmbed = $('.popupBox > div').html();

	$('.certificate__item').on('click',function(){
		var videoSrc = $(this).find('img').attr('src');		
		var videotitle = $(this).find('p').text();		
		$('.popupBox > div').html(videoEmbed);
		$('.certificate-popup__title').text(videotitle);
		$('.popLayer').addClass('active');
		$('#layerPopup img').attr('src', videoSrc);		
		return false;
	});	

	//popup
	if($('.popupBox').length > 0){
		$(document).mouseup(function(e){
			var container = $('.popLayer');
			if(container.has(e.target).length === 0){
				$('.popLayer').removeClass('active');
				$('.popupBox > div').html('');
			}
		});
		$(document).on('click','.popLayer a.close',function(){			
			$('.popLayer').removeClass('active');
			$('.popupBox > div').html('');
			return false;
		});
	}
}

//smooth scroll
function is_mob(){
	return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

function is_mac(){
	return navigator.platform.indexOf('Mac') > -1;
}

function is_chrome(){
	return /Chrome/.test(navigator.userAgent);
}

function is_firefox(){
	return /Firefox/.test(navigator.userAgent);
}

function smoothScroll(){
	if(is_mob() || is_mac() || is_firefox()) return;
	var $window = $(window);
	if(smoothScroll_passive()){
		window.addEventListener("wheel",smoothScroll_scrolling,{passive: false});
	}else{
		$window.on("mousewheel DOMMouseScroll", smoothScroll_scrolling);
	}				
}

function smoothScroll_passive(){
	var supportsPassive = false;
	try {document.addEventListener("test", null, { get passive() { supportsPassive = true }});
	} catch(e) {}
	return supportsPassive;
}

function smoothScroll_scrolling(event){
	if(!event.path){
		event.path = new Array();
		function callParentNode(child){
			if(child.parentNode){
				event.path.push(child.parentNode);
				callParentNode(child.parentNode);
			}
			return;
		}
		event.path.push(event.target);
		callParentNode(event.target);
	}

	var impossibility = new Array("main__none-scroll");
	for(var i=0; event.path.length > i; i++){
		for(var j=0; impossibility.length > j; j++){
			if(event.path[i].getAttribute && event.path[i].getAttribute("id") ==impossibility[j])return;
		}
	}

	event.preventDefault();
	var $window = $(window);
	var scrollTime = 1;
	var distance_offset = 2.5;
	var scrollDistance = $window.height() / distance_offset;
	var delta = 0;
	if(smoothScroll_passive()){
		delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
	}else{
		if(typeof event.originalEvent.deltaY != "undefined"){
			delta = -event.originalEvent.deltaY/120;
		}else{
			delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		}
	}

	var scrollTop = $window.scrollTop();
	var finalScroll = scrollTop - parseInt(delta*scrollDistance);
	TweenMax.to($window, scrollTime, {
		scrollTo : { y: finalScroll, autoKill:true },
		ease: Power3.easeOut,
		overwrite: 5
	});		
	
}


