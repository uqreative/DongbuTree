/* 
    get the url and match to the current page, if matched, then populate page title, lnb, snb etc
    just simple concept, may have bugs
    v 0.0.9 
    @ira
    // todo refractor this
*/
$(window).on('load', function () {
  loadSnb();
  console.clear;
})
function showLnb(data) {
  const title = $('.content__bg .pg-title');
  const subtit = $('.content__bg .pg-subtitle');
  const subtitle = $('.content__bg .pg-child');
  const lnb = $('.lnb__bar');
  const bg = $('.content__bg');
  const brc = $('.brc');
  const nav = $('.mnav');
  const snb = $('.snb');
  const sub = $('.mnav .navbar-dropdown');
  const subch = $('.mnav .dropdown-content');

  let currentPage = window.location.pathname;
  let pathSegments = currentPage.split("/");

  let currentFile = pathSegments[pathSegments.length - 1];
  if (pathSegments.length > 3) {
    currentFile = pathSegments[pathSegments.length - 2];
  }

  let currentPath = pathSegments.slice(0, -1).join("/");
  if (pathSegments.length > 3) {
    currentPath = pathSegments.slice(0, -2).join("/");
  }

  let activeMenuItem = null;

  $.each(data.gnb, function (key, value) {
    let menuPath = value.url;
    let menuFile = menuPath.split("/").pop();
    let menuBasePath = menuPath.split("/").slice(0, -1).join("/");
    if (menuBasePath === currentPath && key !== '/') {
      activeMenuItem = key;
      bg.addClass(activeMenuItem);
    }
  });

  if (activeMenuItem) {
    let children = data.gnb[activeMenuItem].children;
    let parent = data.gnb[activeMenuItem].name;
    let parentUrl = data.gnb[activeMenuItem].url;
    let subt = data.gnb[activeMenuItem].desc;

    lnb.empty();
    snb.empty(); // Clear any previous items

    if (children.length !== 0) {
      let activeFound = false;

      children.forEach((menuItem, index) => {
        lnb.append(`<a class="navbar-item" href="${menuItem.url}">${menuItem.name}</a>`);

        if (menuItem.children && menuItem.children.length > 0) {
          menuItem.children.forEach(subChild => {

            let childHtml = `<li><a href="${subChild.url}" class="button is-rounded is-light">${subChild.name}</a></li>`;
            snb.append(childHtml);
            if (subChild.url.split('/').pop() === currentFile) {
              snb.find(`a[href="${subChild.url}"]`).addClass('is-dark');
              nav.find(`a[href="${parentUrl}"]`).first().addClass('active');
              lnb.find(`a[href="${menuItem.url}"]`).addClass('active');
              sub.find(`a[href="${menuItem.url}"]`).addClass('active');
              subch.find('a').siblings().removeClass('active');
              subch.find(`a[href="${subChild.url}"]`).addClass('active');
              if (brc.children('li').length < 2) {
                brc.append(`
                                <li class="mt-0"><a class="has-text-black" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
                                <li class="mt-0 is-active"><a class="has-text-black" href="${menuItem.url}">${menuItem.name}</a></li>
                            `);
              }
            }
          });
        }

        // Check if the current URL matches the menu item URL
        if (menuItem.url.split('/').pop() === currentFile) {
          nav.find(`a[href="${parentUrl}"]`).first().addClass('active');
          lnb.find(`a[href="${menuItem.url}"]`).addClass('active');
          sub.find(`a[href="${menuItem.url}"]`).addClass('active');
          subtitle.append(menuItem.name);
          $('.main__title').append(menuItem.name);
          $('.main__subtitle').append(parent);
          bg.addClass(`bg${index + 1}`);
          if (brc.children('li').length < 3) {

            brc.append(`
                        <li class="mt-0"><a class="has-text-black" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
                        <li class="mt-0 is-active"><a class="has-text-black" href="${menuItem.url}">${menuItem.name}</a></li>
                    `);
          }
          activeFound = true;
        }
      });
    } else {
      nav.find(`a[href="${parentUrl}"]`).addClass('active');
      lnb.append(`<a class="navbar-item active" href="${data.gnb[activeMenuItem].url}">${parent}</a>`);
      brc.append(`
                <li class="mt-0 is-active"><a class="has-text-black" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
            `);

      $('.main__title').append(parent);
      $('.main__subtitle').append(parent);
    }

    title.prepend(parent);
    subtit.append(subt);
    lnb.show();
    snb.show(); // Make sure snb is visible
  } else {
    console.log('No Active Menu Item Found');
    lnb.hide();
    snb.hide(); // Hide if there's no active menu item
  }
}

function loadSnb() {
  const url = window.location.origin;

  if (dataCache) {
    showLnb(dataCache);
  } else {
    fetchData(url, function (data) {
      dataCache = data; // Cache the data
      showLnb(data);
    });
  }
}

