/* Element event listeners */

// $searchSubmit.addEventListener('click', async (e) => {
//     e.preventDefault();
//     await submitQuery();
// });

// $logo.addEventListener("click", (e) => {
//     if (state.screenWidth < 820 && state.filters === "closed") {
//         $sidebar.style.left = '0';
//         $sidebar.style.top = "80px";
//         $sidebar.style.width = "100vw";
//         $sidebarContent.style.left = '0';
//         $sidebarContent.style.top = "80px";
//         $sidebarContent.style.width = "100vw";
//         state.filters = "open";
//     } else if (state.screenWidth < 820 && state.filters === "open") {
//         $sidebar.style.left = '100%';
//         $sidebar.style.top = "80px";
//         $sidebar.style.width = "0";
//         $sidebarContent.style.left = '100%';
//         $sidebarContent.style.width = "0";
//         state.filters = "closed";
//     }
// });

// $searchBar.addEventListener("focus", (e) => {
//     window.addEventListener("keydown", async (ev) => {
//         if (ev.key === "Enter") {
//             ev.preventDefault();
//             await submitQuery();
//         }
//     });
// });

$searchBar.addEventListener('focus', () => {
    if(state.screenWidth < 820){
        state.filters = 'open';
    }
    filterDisplay();
})

$searchDark.addEventListener("click", (e) => {
    e.preventDefault();
    toggleColorScheme();
});

$searchBkmrk.addEventListener("click", (e) => {
    e.preventDefault();
    ifMobileCloseSidebar();
    showBookmarks();
});


$searchForm.addEventListener("submit", runSubmit);

$clearFilters.addEventListener('click', (e) => {
    document.querySelectorAll(".none-selected").forEach((val) => {
        val.selected = "selected";
    });
});

$searchClear.addEventListener("click", (e) => {
    e.preventDefault();
    $searchBar.value="";
    $searchBar.focus();
    showAlert(default_alert);
});

$backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
});

$mobileMenu.addEventListener('click', (e) => {
    e.preventDefault();
    filterDisplay();
})

$showAppLinks.addEventListener('mouseover', showAppLinks);
$showAppLinks.addEventListener('mouseleave', hideAppLinks);

$showAppLinks.addEventListener('click', showAppLinks);
window.addEventListener('click' ,hideAppLinksOnMobile);


$cookieAgreementBtn.addEventListener('click',(e) => {
    lwrite('kyiCookieCheck', true );
    //kyiCookieCheck = 'true';
    // console.log(kyiCookieCheck);
    $cookieAgreement.style.bottom = '-100%';
})

// $searchBar.addEventListener('focus', () => {
//     expandInputBoolean = true;
//     expandInput();
// })

window.addEventListener('click', closebtnToggle);
window.addEventListener('keyup', closebtnToggle);
window.addEventListener('load',ifMobileCloseSidebar);

window.addEventListener('scroll', debounce(showBackToTop))