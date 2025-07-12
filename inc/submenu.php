<ul>
  <li>
    <a href="/index.php/order" data-gnbname="my-page">
      <img src="../../images/content/ic-mypage-menu01.svg" alt="">
      <span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">주문하기</font>
        </font>
      </span>
    </a>
  </li>
  <li>
    <a href="/index.php/order/order-list" data-gnbname="order-details">
      <img src="../../images/content/ic-mypage-menu02.svg" alt="">
      <span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">내주문내역</font>
        </font>
      </span>
    </a>
  </li>
  <li>
    <a href="/index.php/charge" data-gnbname="top-up">
      <img src="../../images/content/ic-mypage-menu03.svg" alt="">
      <span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">충전하기</font>
        </font>
      </span>
    </a>
  </li>
  <li>
    <a href="/index.php/contact-us" data-gnbname="contact-us">
      <img src="../../images/content/ic-mypage-menu04.svg" alt="">
      <span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">문의하기</font>
        </font>
      </span>
    </a>
  </li>
  <li>
    <a href="/index.php/my-page/my-profil" data-gnbname="my-profil">
      <img src="../../images/content/ic-mypage-menu05.svg" alt="">
      <span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">내 정보 수정</font>
        </font>
      </span>
    </a>
  </li>
</ul>

<script>
  let pageName = <?= json_encode($data['page_name']); ?> //page name선언

  $('.gnb > li > a').removeClass('on');
  $('[data-gnbName="' + pageName + '"]').addClass('on');
  $('[data-gnbName="' + pageName + '_sub01"]').addClass('on');
  $('[data-gnbName="' + pageName + '_sub01"]').addClass('on').parent('li').addClass('active');
  $('[data-gnbName="' + pageName + '_sub01"]').addClass('on').parent('li').addClass('active');

  if ("") {
    //게시판일경우
    $('[data-gnbName=""]').addClass('on');
    $('[data-gnbName=""]').parent('li').addClass('active');
  }

  //서브비쥬얼 컨트롤
  $('.area-subVisual').attr('data-sublayout', pageName);
  $('.area-subVisual .img--name').attr('src', '/images/content/img_' + pageName + '_bg.jpg');
</script>