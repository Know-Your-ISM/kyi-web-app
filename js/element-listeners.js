/* Element event listeners */

// $searchSubmit.addEventListener('click', async (e) => {
//     e.preventDefault();
//     await submitQuery();
// });

$logo.addEventListener("click", (e) => {
    if (state.screenWidth < 800 && state.filters === "closed") {
        $sidebar.style.display = "block";
        $sidebar.style.top = "80px";
        $sidebar.style.width = "100vw";
        $sidebarContent.style.display = "block";
        $sidebarContent.style.top = "80px";
        $sidebarContent.style.width = "100vw";
        state.filters = "open";
    } else if (state.screenWidth < 800 && state.filters === "open") {
        $sidebar.style.display = "none";
        $sidebar.style.top = "80px";
        $sidebar.style.width = "0";
        $sidebarContent.style.display = "none";
        $sidebarContent.style.width = "0";
        state.filters = "closed";
    }
});

// $searchBar.addEventListener("focus", (e) => {
//     window.addEventListener("keydown", async (ev) => {
//         if (ev.key === "Enter") {
//             ev.preventDefault();
//             await submitQuery();
//         }
//     });
// });

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
    showAlert(default_alert);
});

$backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
});