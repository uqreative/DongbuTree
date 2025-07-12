<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">		
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
		<meta name="format-detection" content="telephone=no">
		<title><?=$site[og_title]?></title>
		<link rel="stylesheet" type="text/css" href="/css/unable/common.css?ver=20231120"/>
		<link rel="stylesheet" type="text/css" href="/js/jquery-ui.css"/>
		<link rel="stylesheet" type="text/css" href="/js/design/swiper-bundle.min.css"/> <!-- slide -->
		<link rel="stylesheet" type="text/css" href="/js/design/slick.css"/> <!-- slick -->
		<link rel="stylesheet" type="text/css" href="/js/jquery.scrollbar.css"/> <!-- scrollbar -->
		<link rel="stylesheet" type="text/css" href="/css/layout.css?ver=20231120"/>
		<?php if ($_SERVER['REQUEST_URI'] == "/") {
		echo '<link rel="stylesheet" type="text/css" href="/css/main.css?ver=20231120"/>';
		} ?>
		<link rel="stylesheet" type="text/css" href="/css/content.css?ver=20231120"/>
		<!-- <script src="/js/jquery-3.6.0.min.js"></script> -->
		<!-- <script src="/js/jquery-ui.js"></script> -->
		<!-- <script src="/js/design/ScrollToPlugin.min.js"></script> -->
		<!-- <script src="/js/design/TweenMax.min.js"></script> -->
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script> -->
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script> -->
		<!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js'></script> -->
		<!-- <script src="/js/design/swiper-bundle.min.js"></script> -->
		<!-- <script src="/js/design/slick.min.js"></script> -->
		<!-- <script src="/js/jquery.scrollbar.js"></script> -->
		<!-- <script src="/js/design/wd_base.js"></script> -->
		<!-- <script src="/js/design/wd_module.js"></script> -->
		<!-- <script src="/js/design/wd_custom.js"></script> -->
		<!-- <script src="/js/common.js"></script> -->
		<!-- <script type="text/javascript" src="/js/member.js"></script> -->
		<!-- <script src="/js/board.js"></script> -->
			
		<link rel="shortcut icon" href="/images/favicon.ico"/>
		<meta property="og:image" content="/images/og_image.png">

		<link rel="canonical" href="<?=$site[url]?>" />
		<link rel="alternate" href="<?=$site[url]?>" />
		<meta property="og:url" content="<?=$site[url]?>" />
		<meta property="og:title" content="<?=$site[og_title]?>" />
		<meta name="description"  content="<?=$site[description]?>" />
		<meta property="og:description" content="<?=$site[og_description]?>" />
		<meta property="og:site_name" content="<?=$site[og_site_name]?>" />
		<meta property="naver-site-verification" content="<?=$site[naver_tag]?>" />
		<meta name="google-site-verification" content="<?=$site[google_tag]?>" />
		<meta property="og:type" content="website" />
	</head>
	<body>
		<div id="skip_menu">
			<a href="#content">본문 바로가기</a>
		</div>
		<div id="wrap">