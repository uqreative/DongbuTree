
/* 
    Site Data JS
    Populate the common data from json file and manipulate trough javascript
    just simple concept, may have bugs
    v 0.0.9 
    @ira
    // todo refractor this
*/ 
$(window).on('load', function() {
    loadMenu();
    console.clear;
})

if(!jsonName){
    jsonName = '/data.json';
}
const DATA_URL = jsonName;
let dataCache = null;
// get data
function fetchData(url, callback) {
    if (dataCache) {
        callback(dataCache);
    } else {
        $.getJSON(url + DATA_URL, function(data) {
            dataCache = data;  // Save the entire data object in the cache
            callback(dataCache);
        }).fail(function(jqxhr, textStatus, error) {
            console.error("Request Failed: " + textStatus + ", " + error);
        });
    }
}
// call all based on loaded data
function loadMenu() {
    const url = window.location.origin;
    if (dataCache) {
        populateMenu(dataCache);
    } else {
        fetchData(url, populateMenu);
    }
}
// put data to the each components
function populateMenu(data) {
    populateGnb(data.gnb);
    populateLang(data.lang);
    populateLoginLogout(data.rbutton);
    populateSearch(data.search);
    populateFnav(data.fnav);
    populateFtxt(data.ftxt);
    populateFcopy(data.fcopy);
    populateFullMenu(data.gnb);
}

// gnb
function populateGnb(gnb) {
    const navbar = $('.mnav');

    $.each(gnb, function(key, menu) {
        let itemName = key;
        let parentName = menu.name;
        let parentUrl = menu.url;
        let children = menu.children;
        let isVisible = menu.visible !== undefined ? menu.visible : true;

        if (isVisible) {
            if (children.length === 0) {
                let navbarItem = $(`
                    <a href="${parentUrl}" class="navbar-item is-tab">${parentName}</a>
                `);
                navbar.append(navbarItem);
            } else {
                let navbarItem = $(`
                <div class="navbar-item has-dropdown is-hoverable is-tab">
                    <a href="${parentUrl}" class="navbar-link is-arrowless" data-item="${itemName}">${parentName}</a>
                    <div id="${itemName}-dropdown" class="navbar-dropdown is-boxed">`);
                children.forEach((child, key) => {
                    let childHtml = '';

                    if (child.visible) {
                        childHtml = `<a href="${child.url}" class="navbar-link is-arrowless">${child.name}</a>`;

                        if (child.children && child.children.length > 0) {
                            let visibleSubChildren = child.children.filter(subChild => subChild.visible);

                            if (visibleSubChildren.length > 0) {
                                childHtml = `<div class="has-dropdown">
                                                <div class="nested dropdown">
                                                <a href="${child.url}" class="navbar-link is-arrowless">${child.name}</a>
                                                <div class="dropdown-menu" id="dropdown-menu${key + 1}" role="menu">
                                                    <div class="dropdown-content">`;

                                visibleSubChildren.forEach((subChild, subKey) => {
                                    let subChildHtml = '';

                                    if (subChild.visible) {
                                        subChildHtml = `<a href="${subChild.url}" class="navbar-link is-arrowless">${subChild.name}</a>`;

                                        if (subChild.children && subChild.children.length > 0) {
                                            let visibleSubSubChildren = subChild.children.filter(subSubChild => subSubChild.visible);

                                            if (visibleSubSubChildren.length > 0) {
                                                subChildHtml = `<div class="has-dropdown">
                                                                    <div class="nested dropdown">
                                                                    <a href="${subChild.url}" class="navbar-link is-arrowless">${subChild.name}</a>
                                                                    <div class="dropdown-menu" id="dropdown-submenu${key + 1}-${subKey + 1}" role="menu">
                                                                        <div class="dropdown-content">`;

                                                visibleSubSubChildren.forEach(subSubChild => {
                                                    subChildHtml += `<a href="${subSubChild.url}" class="navbar-link is-arrowless">${subSubChild.name}</a>`;
                                                });

                                                subChildHtml += `</div></div></div></div>`;
                                            }
                                        }
                                    }

                                    childHtml += subChildHtml;
                                });

                                childHtml += `</div></div></div></div>`;
                            }
                        }
                    }

                    navbarItem.find('.navbar-dropdown').append(childHtml);
                });

                navbarItem.append(`</div></div>`);
                navbar.append(navbarItem);
            }
        }
    });
}
// fullmenu
function populateFullMenu(gnb) {
    const navbar = $('.fgnb');
    $.each(gnb, function(key, menu) {
        let itemName = key;
        let parentName = menu.name;
        let parentUrl = menu.url;
        let children = menu.children;
        let isVisible = menu.visible !== undefined ? menu.visible : true;

        if (isVisible) {
            if (children.length === 0) {
                let navbarItem = $(`
                <li class="parent ${itemName}"> <a href="${parentUrl}" class="navbar-item">${parentName}</a> </li>
                `);
                navbar.append(navbarItem);
            } else {
                let navbarItem = $(`
                    <li class="parent ${itemName}">
                    <a href="${parentUrl}" class="navbar-item is-arrowless">${parentName}</a>
                    <ul class="sub">
                `);
                children.forEach((child, key) => {
                    let childHtml = `
                                        <li class="child sub${key}">
                                            <a href="${child.url}" class="navbar-link is-arrowless">${child.name}</a>
                                        </li>`;
                    if (child.children && child.children.length > 0) {
                        childHtml = `   <li class="child sub${key}">
                                        <a href="${child.url}" class="navbar-link is-arrowless">${child.name}</a>
                                        </li>
                                        <ul class="childs" id="childmenu${key + 1}">
                                            `;
                        child.children.forEach((subChild, key) => {
                            childHtml += `<li class="gchild sub${key}"><a href="${subChild.url}" class="navbar-link is-arrowless">${subChild.name}</a></li>`;
                        });

                        childHtml += `</ul>`;
                    }
                    navbarItem.find('.sub').append(childHtml);
                });
                navbarItem.append(`</li>`);
                navbar.append(navbarItem);
            }
        }
    });
}

// lang
function populateLang(lang) {
    const rnavbar = $('.rnav');

    if (lang.show) {
        let langData = lang.option;
        let parentName = langData.name;
        let parentUrl = langData.url;
        let iconUrl = langData.icon;
        let children = langData.children;

        let langItem = $(`
            <div class="lang navbar-item has-dropdown is-hoverable lang-dropdown">
                <a href="${parentUrl}" class="navbar-link is-arrowless">
                    <img src="${iconUrl}" width="30%" alt="">
                    <span class="ml-3 is-size-6 is-uppercase has-text-weight-semibold">${parentName}</span>
                </a>
                <div class="navbar-dropdown is-boxed is-right" id="lang-dropdown">
                </div>
            </div>
        `);

        children.forEach(menuItem => {
            langItem.find('#lang-dropdown').append(`<a href="${menuItem.url}" class="navbar-item"> <img src="${menuItem.icon}" width="50%" alt=""><span class="ml-3 is-size-6 is-uppercase has-text-weight-semibold">${menuItem.name}</span></a>`);
        });
        rnavbar.prepend(langItem);
    }
}
// login/logout
function populateLoginLogout(rbutton) {
    if (rbutton.show) {
        handleLoginLogout(rbutton);
    }
}
// search
function populateSearch(search) {
    if (search.show) {
        
        searchW();
        $('.search_icon').show();
    } else {
        $('.search_icon').hide();
    }
}
// footer nav
function populateFnav(fnavData) {
    const fnav = $('.fnav');

    if (fnavData.show) {
        $.each(fnavData, function(key, menu) {
            if (key !== 'show') {
                let itemNav = menu.name;
                let itemUrl = menu.url;

                let footerNav = $(`
                    <a href="${itemUrl}" class="navbar-item p-5">${itemNav}</a>
                `);
                fnav.append(footerNav);
            }
        });
    }
}
// footer text
function populateFtxt(ftxtData) {
    const ftxt = $('.footer__info__txt');

    if (ftxtData.show) {
        $.each(ftxtData, function(key, txt) {
            if (key !== 'show') {
                let itemName = txt.name;
                let itemTxt = txt.txt;

                let footerTxt = $(`
                    <li>
                        <span>${itemName}</span><span>${itemTxt}</span>
                    </li>
                `);
                ftxt.append(footerTxt);
            }
        });
    }
}
// footer copyright
function populateFcopy(fcopyData) {
    const fcopy = $('.footer__copy');

    if (fcopyData.show) {
        $.each(fcopyData, function(key, copy) {
            if (key !== 'show') {
                let itemTxt = copy.txt;

                let footerCopy = $(`
                    <span>${itemTxt}</span>
                `);
                fcopy.append(footerCopy);
            }
        });
    }
}