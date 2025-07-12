/* 
    get the url and match to the current page, if matched, then populate page title, lnb, snb etc
    just simple concept, may have bugs
    v 0.0.9 
    @ira
    // todo refractor this
*/
$(window).on('load', function() {
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

    let currentPage = window.location.pathname.split("/").slice(0,-1).join("/");
    let activeMenuItem = null;

    $.each(data.gnb, function(key, value) {
        let currentUrl = value.url.split("/").slice(0,-1).join("/");
        if (currentUrl === currentPage && key !== '/') {
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
        if (children.length != 0) {
            children.forEach((menuItem, index) => {
                lnb.append(`<a class="navbar-item" href="${menuItem.url}">${menuItem.name}</a>`);
                if (menuItem.url.split('/').pop() === window.location.pathname.split("/").pop()) {
                    nav.find(`a[href="${parentUrl}"]`).first().addClass('active');
                    lnb.find(`a[href="${menuItem.url}"]`).addClass('active');
                    sub.find(`a[href="${menuItem.url}"]`).addClass('active');
                    subtitle.append(menuItem.name);
                    $('.main__title').append(menuItem.name);
                    $('.main__subtitle').append(parent);
                    bg.addClass(`bg${index + 1}`);
                    brc.append(`
                        <li class="mt-0"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
                        <li class="mt-0 is-active"><a class="has-text-light" href="${menuItem.url}">${menuItem.name}</a></li>
                    `);
                    if (menuItem.children && menuItem.children.length > 0) {
                        menuItem.children.forEach(subChild => {
                            let childHtml = `<li><a href="${subChild.url}" class="navbar-link is-arrowless">${subChild.name}</a></li>`;
                            snb.append(childHtml);
                        });
                    }
                }
            });
        } else {
            nav.find(`a[href="${parentUrl}"]`).addClass('active');
            lnb.append(`<a class="navbar-item active" href="${data.gnb[activeMenuItem].url}">${parent}</a>`);
            brc.append(`
                <li class="mt-0 is-active"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
            `);

            $('.main__title').append(parent);
            $('.main__subtitle').append(parent);
        }
        title.prepend(parent);
        subtit.append(subt);
        lnb.show();
    } else {
        lnb.hide();
    }
}

function loadSnb() {
    const url = window.location.origin;

    if (dataCache) {
        showLnb(dataCache);
    } else {
        fetchData(url, function(data) {
            dataCache = data; // Cache the data
            showLnb(data);
        });
    }
}

