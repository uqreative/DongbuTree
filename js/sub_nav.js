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

//   function showLnb(data) {
//     const title = $('.content__bg .pg-title');
//     const subtit = $('.content__bg .pg-subtitle');
//     const subtitle = $('.content__bg .pg-child');
//     const lnb = $('.lnb__bar');
//     const bg = $('.content__bg');
//     const brc = $('.brc');
//     const nav = $('.mnav');
//     const snb = $('.snb');
//     const sub = $('.mnav .navbar-dropdown');

//     let currentPage = window.location.pathname.split("/").slice(0, -1).join("/");
//     let currentFile = window.location.pathname.split("/").pop();
//     let activeMenuItem = null;

//     console.log('Current Page:', currentPage);

//     $.each(data.gnb, function (key, value) {
//         let currentUrl = value.url.split("/").slice(0, -1).join("/");
//         console.log('Checking Menu:', currentUrl, 'against', currentPage);
//         if (currentUrl === currentPage && key !== '/') {
//             activeMenuItem = key;
//             bg.addClass(activeMenuItem);
//             console.log('Active Menu Item Found:', activeMenuItem);
//         }
//     });

//     if (activeMenuItem) {
//         let children = data.gnb[activeMenuItem].children;
//         let parent = data.gnb[activeMenuItem].name;
//         let parentUrl = data.gnb[activeMenuItem].url;
//         let subt = data.gnb[activeMenuItem].desc;

//         lnb.empty();
//         snb.empty(); // Clear any previous items

//         if (children.length !== 0) {
//             let activeFound = false;

//             children.forEach((menuItem, index) => {
//                 lnb.append(`<a class="navbar-item" href="${menuItem.url}">${menuItem.name}</a>`);
//                 console.log('Processing Menu Item:', menuItem);

//                 // Only append sub-children to .snb
//                 if (menuItem.children && menuItem.children.length > 0) {
//                     menuItem.children.forEach(subChild => {
//                         let childHtml = `<li><a href="${subChild.url}" class="button is-light is-rounded">${subChild.name}</a></li>`;
//                         snb.append(childHtml);
//                         console.log('Adding Submenu Item:', subChild);
//                         if (subChild.url.split('/').pop() === window.location.pathname.split("/").pop()) {
//                             snb.find(`a[href="${subChild.url}"]`).addClass('is-dark');
//                         }
//                     });
//                 }

//                 // Mark the active menu item and handle its display
//                 if (menuItem.url.split('/').pop() === currentFile) {
//                     console.log("the file " + currentFile);
//                     console.log("the url " + menuItem.url.split('/').pop())
//                     nav.find(`a[href="${parentUrl}"]`).first().addClass('active');
//                     lnb.find(`a[href="${menuItem.url}"]`).addClass('active');
//                     sub.find(`a[href="${menuItem.url}"]`).addClass('active');
//                     subtitle.append(menuItem.name);
//                     $('.main__title').append(menuItem.name);
//                     $('.main__subtitle').append(parent);
//                     bg.addClass(`bg${index + 1}`);
//                     brc.append(`
//                         <li class="mt-0"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
//                         <li class="mt-0 is-active"><a class="has-text-light" href="${menuItem.url}">${menuItem.name}</a></li>
//                     `);
//                     activeFound = true;
//                 }
//             });

//             // If no specific child is active, show the parent as active
//             if (!activeFound) {
//                 nav.find(`a[href="${parentUrl}"]`).addClass('active');
//                 lnb.find(`a[href="${parentUrl}"]`).addClass('active');
//                 subtitle.append(parent);
//                 $('.main__title').append(parent);
//                 $('.main__subtitle').append(parent);
//             }
//         } else {
//             nav.find(`a[href="${parentUrl}"]`).addClass('active');
//             lnb.append(`<a class="navbar-item active" href="${data.gnb[activeMenuItem].url}">${parent}</a>`);
//             brc.append(`
//                 <li class="mt-0 is-active"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
//             `);

//             $('.main__title').append(parent);
//             $('.main__subtitle').append(parent);
//         }

//         title.prepend(parent);
//         subtit.append(subt);
//         lnb.show();
//         snb.show(); // Make sure snb is visible
//     } else {
//         console.log('No Active Menu Item Found');
//         lnb.hide();
//         snb.hide(); // Hide if there's no active menu item
//     }
// }
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
    let currentFile = currentPage.split("/").pop();
    let currentPath = currentPage.split("/").slice(0, -1).join("/");
    let activeMenuItem = null;

    // console.log('Current Page:', currentPage);
    // console.log('Current File:', currentFile);

    $.each(data.gnb, function (key, value) {
        let menuPath = value.url;
        let menuFile = menuPath.split("/").pop();
        let menuBasePath = menuPath.split("/").slice(0, -1).join("/");
        // console.log('Checking Menu Path:', menuPath);
        // console.log('Checking Menu File:', menuFile, 'against', currentFile);

        if (menuBasePath === currentPath && key !== '/') {
            activeMenuItem = key;
            bg.addClass(activeMenuItem);
            // console.log('Active Menu Item Found:', activeMenuItem);
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
                // console.log('Processing Menu Item:', menuItem);

                // Append sub-children to .snb
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
                            if(brc.children('li').length < 2) {
                                brc.append(`
                                <li class="mt-0"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
                                <li class="mt-0 is-active"><a class="has-text-light" href="${menuItem.url}">${menuItem.name}</a></li>
                            `);
                            }
                        }
                    });
                }

                // Check if the current URL matches the menu item URL
                
                if (menuItem.url.split('/').pop() === currentFile) {
                    console.log("actibe menu", menuItem.url.split('/').pop());
                    console.log('the filee', currentFile)
                    nav.find(`a[href="${parentUrl}"]`).first().addClass('active');
                    lnb.find(`a[href="${menuItem.url}"]`).addClass('active');
                    sub.find(`a[href="${menuItem.url}"]`).addClass('active');
                    subtitle.append(menuItem.name);
                    $('.main__title').append(menuItem.name);
                    $('.main__subtitle').append(parent);
                    bg.addClass(`bg${index + 1}`);
                    if(brc.children('li').length < 3) {
                        
                    brc.append(`
                        <li class="mt-0"><a class="has-text-light" href="${data.gnb[activeMenuItem].url}">${data.gnb[activeMenuItem].name}</a></li>
                        <li class="mt-0 is-active"><a class="has-text-light" href="${menuItem.url}">${menuItem.name}</a></li>
                    `);
                    }
                    activeFound = true;
                }
            });

            // Default to the parent if no specific child is active
            // if (!activeFound) {
            //     nav.find(`a[href="${parentUrl}"]`).addClass('active');
            //     lnb.find(`a[href="${parentUrl}"]`).addClass('active');
            //     subtitle.append(parent);
            //     $('.main__title').append(parent);
            //     $('.main__subtitle').append(parent);
            // }
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
        fetchData(url, function(data) {
            dataCache = data; // Cache the data
            showLnb(data);
        });
    }
}

