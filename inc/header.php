	<header id="header">
		<div class="gnb_area">
			<h1>
				<a href="/"><img src="/images/common/logo.svg" alt="SNS도우미"></a>
			</h1>
			<div class="area_utill">
        <ul>
          <? if(!$this->loggedIn){?>
					<li class="login"><a href="/index.php/auth"><span class="btn-text-wrap"><span class="btn-text-content" data-text="로그인">로그인</span></span></a></li>
					<li class="join"><a href="/index.php/agree"><span class="btn-text-wrap"><span class="btn-text-content" data-text="가입하기">가입하기</span></span></a></li>
				<? } else { ?>
					<li class="login"><a href="/index.php/order"><span class="btn-text-wrap"><span class="btn-text-content" data-text="마이페이지">마이페이지</span></span></a></li>
					<li class="join"><a href="/index.php/logout"><span class="btn-text-wrap"><span class="btn-text-content" data-text="로그아웃">로그아웃</span></span></a></li>
        <? } ?>
				</ul>	
			</div>
		</div>
	</header>

  <!-- lnb  -->
<div class="area_lnb" id="lnb" style="display: none;">
	<nav class="lnb">
	</nav>
</div>
  <!-- lnb  -->