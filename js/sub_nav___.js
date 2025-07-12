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
    const subch = $('.mnav .dropdown-content');

    // Get current URL without query parameters
    let currentPage = window.location.pathname;
    let currentFile = currentPage.split("/").pop();
    let currentPath = currentPage.split("/").slice(0, -1).join("/");

    // Check if there are query parameters (e.g., ?id=44)
    let queryParams = window.location.search;

    let activeMenuItem = null;

    // Loop through the JSON to find matching menu items
    $.each(data.gnb, function (key, value) {
        let menuPath = value.url.split("?")[0]; // Strip query params from the menu path
        let menuFile = menuPath.split("/").pop();
        let menuBasePath = menuPath.split("/").slice(0, -1).join("/");

        // Match only the base path without query parameters
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
        snb.empty();

        if (children.length !== 0) {
            children.forEach((menuItem, index) => {
                let menuItemPath = menuItem.url.split("?")[0]; // Ignore query parameters for matching

                // Check if the base URL matches, ignoring query parameters
                let isActive = menuItemPath === currentPath || currentPage.startsWith(menuItem.url.split("?")[0]);

                // Add 'active' class if the current page matches this menu item
                if (isActive) {
                    menuItem.active = true;
                    data.gnb[activeMenuItem].active = true; // Also mark the parent as active
                }

                // Create menu item with 'active' class if active
                lnb.append(`<a class="navbar-item ${menuItem.active ? 'active' : ''}" href="${menuItem.url}">${menuItem.name}</a>`);

                // Render sub-children if available
                if (menuItem.children && menuItem.children.length > 0) {
                    menuItem.children.forEach(subChild => {
                        let subChildPath = subChild.url.split("?")[0];
                        let subActive = subChildPath === currentPath || currentPage.startsWith(subChild.url.split("?")[0]);

                        if (subActive) {
                            subChild.active = true;
                        }

                        let childHtml = `<li><a href="${subChild.url}" class="button is-rounded is-light ${subChild.active ? 'is-dark' : ''}">${subChild.name}</a></li>`;
                        snb.append(childHtml);
                    });
                }
            });
        } else {
            // Handle parent with no children
            lnb.append(`<a class="navbar-item active" href="${data.gnb[activeMenuItem].url}">${parent}</a>`);
        }

        // Update the UI with parent and subtitle information
        title.prepend(parent);
        subtit.append(subt);
        lnb.show();
        snb.show(); // Show sub-navigation if there are children
    } else {
        // Hide the LNB if no active menu item is found
        lnb.hide();
        snb.hide();
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

