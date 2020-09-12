/* Utils functions. */
const runUserVerf = () => {
    document.querySelector("#usr-verf-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        if (document.querySelector("#usr-verf-input").value === "") {
            document.querySelector("#usr-verf-input").style.border = "2px solid red";
        return document.querySelector("#usr-verf-input").setAttribute("placeholder", "This can't be empty!");
        }
        launchLoader();
        let admno = document.querySelector("#usr-verf-input").value;
        try {
            let student = await fetchOneStudent({ "Admission No": admno });
            closeLoader();
            if (student && student.status === "Verified") {
                modifyCurrentModal(`<h3 style="width:100%;text-align:center;color:green;">Welcome, ${student.student.Name}!</h3>`);
                state.User = student.student;
                console.log(state);
                default_alert = state.User.Name;
                cookieFunction();
                setTimeout(() => {
                    closeModal();
                    showAlert(default_alert);
                    if(state.screenWidth > 820) $searchBar.focus();
                }, 1200);
            } 
            else {
                state.verf_attempt -= 1;
                if (state.verf_attempt > 0) {
                    document.querySelector("#usr-verf-input").value = "";
                    document.querySelector("#usr-verf-input").setAttribute("placeholder", "Incorrect Admission Number!");
                } else {
                    modifyCurrentModal(`<h3 style="width:100%;text-align:center;color:red;">Looks like you've overstepped the attempts limit! <br /> Closing this tab in 3 seconds.</h3>`);
                    setAttribute(() => {
                        window.close();
                    }, 3000);
                }
            }
        }
        catch (e) {
            console.log(e);
            $modalHtml.innerHTML = `<p>Some error occured. Please reload or try again after some time.</p>`;
        }
    });
}

function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

const switchPlaceholder = () => {
    let names = ["Mihir", "Mohit", "Pawan", "Hasim", "Nitin", "Neel", "Nayan", "your name"];
    setInterval(() => {
        $searchBar.setAttribute("placeholder", `Try searching for ${names[Math.floor(Math.random() * names.length)]}...`);
    }, 6000);
}

const launchLoader = () => {
    $overlay.style.display = 'block';
    $loaderWrap.style.display = 'flex';
}

const closeLoader = () => {
    $overlay.style.display = 'none';
    $loaderWrap.style.display = 'none';
}

const launchCard = () => {
    $overlay.style.display = 'block';
    $overlayText.style.display = "none";
    $overlayCloseBtn.style.display = "block";
    $overlayCard.style.display = 'flex';
    state.card = "open";
}

const closeCard = () => {
    $overlayCloseBtn.style.display = "none";
    $overlay.style.display = 'none';
    $loaderWrap.style.display = 'none';
    state.card = "closed";
}

const modifyCurrentModal = (html) => {
    $modalHtml.innerHTML = html;
}

const launchModal = (html, unclosable) => {
    if (!unclosable) {
        $modalCloseBtn.onclick = (e) => {
            $modalCloseBtn.onclick = "";
            $modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == $modal) {
                $modal.style.display = "none";
            }
        }
    }

    $modal.style.display = "flex";
    if (unclosable) $modalCloseBtn.style.display = "none";

    $modalHtml.innerHTML = html;
}

const closeModal = (e) => {
    $modal.style.display = "none";
}

const showAlert = (text) => {
    state.lastAlert = $alerts.innerHTML;
    $alerts.innerHTML = text;
    state.currentAlert = $alerts.innerHTML;
}

const startPaginators = () => {
    $pagination.style.display = "flex";
    startPaginationListeners();
}

const stopPaginators = () => {
    $pagination.style.display = "none";
    stopPaginationListeners();
}

const submitQuery = async (page) => {
    let params = {};
    let input = $searchBar.value;
    let pageNumber = page || 1;

    // Close bookmarks.
    hideBookmarks();

    admnoRegex.test(input) ?
        params.admno = input : input !== "" ?
            params.name = input : null;

    let filters = [ $branch, $house, $state, $club, $course ];
    filters.forEach(filter => {
        if (filter["value"] !== "") params[filter.name] = filter.value;
    });

    if (Object.keys(params).length > 0) {
        params.admno ? showAlert("Searching for admission number") : showAlert("Searching for name");
        // params.limit = pageNumber * 15 + 1;
        // params.skip = (pageNumber - 1) * 15;

        let students = await fetchResults(params);

        // if (students.count > 15) startPaginators();
        // else stopPaginators();

        // state.page = pageNumber;

        showAlert(`${students.count} ${students.count > 1 ? `results` : `result`} in ${students._queryTime}ms`);

        return students.students;
    } else {
        showAlert("Provide at least one search parameter!");
        return null;
    }
}

const startPaginationListeners = () => {
    $nextPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(state.page + 1);
    });

    $previousPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        if (state.page !== 1) await submitQuery(state.page - 1);
    });

    $firstPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(1);
    });
}

const stopPaginationListeners = () => {
    $nextPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(state.page + 1);
    });

    $previousPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        if (state.page !== 1) await submitQuery(state.page - 1);
    });

    $firstPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(1);
    });
}

const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
}

const ifMobileCloseSidebar = () => {
    if (state.screenWidth < 820) {
        $sidebar.style.left = '100%';
        $sidebarContent.style.left = '100%';
        $right.style.display = "block";
        state.filters = "closed";
    }
}

const filterDisplay = () => {
    if (state.screenWidth < 820 && state.filters === "closed") {
        $sidebar.style.left = '0';
        $sidebar.style.top = "80px";
        $sidebar.style.width = "100vw";
        $sidebarContent.style.left = '0';
        $sidebarContent.style.top = "80px";
        $sidebarContent.style.width = "100vw";
        $sidebarContent.style.overflowY = 'auto';
        state.filters = "open";
    } else if (state.screenWidth < 820 && state.filters === "open") {
        $sidebar.style.left = '100%';
        $sidebar.style.top = "80px";
        $sidebar.style.width = "0";
        $sidebarContent.style.left = '100%';
        $sidebarContent.style.width = "0";
        $sidebarContent.style.overflowY = 'hidden';
        state.filters = "closed";
    }
}

const runSubmit = async (ev) => {
    ev.preventDefault();
    toggleForm("disable");
    launchLoader();
    let results = await submitQuery(1);
    loadResults(results);
    footerAndBackToTopDisplay(results);
    toggleForm("enable");
    ifMobileCloseSidebar();
    closeLoader();
    if (results === null || results === []) {
        setTimeout(() => {
            showAlert(default_alert);
        }, 3000);
    }
}

const footerAndBackToTopDisplay = (results) =>{
    if(results !== null || results === []){
        $footer.classList.remove('footer-first-placed-at');
        // $backToTop.style.display = 'flex';
    }
    
    // if($right.style.height < ''){
    //     $footer.classList.add('footer-first-placed-at');
    //     $backToTop.style.display = 'none';
    //     console.log('it aint right');
    // }
}

const showBackToTop = function(){
    if(window.scrollY > '350'){
        $backToTop.style.display = 'flex';
        $backToTop.style.right = '25px';
        
        // console.log('company')
    }
    else{
        $backToTop.style.right = '-20%';
    }
}

const toggleForm = (to) => {
    if (to === "disable") {
        $searchBar.readOnly = true;
        $searchSubmit.readOnly = true;
        $searchClear.readOnly = true;
        $logo.readOnly = true;
    } else if (to === "enable") {
        $searchBar.readOnly = false;
        $searchSubmit.readOnly = false;
        $searchClear.readOnly = false;
        $logo.readOnly = false;
    }
}

const toggleColorScheme = () => {
    if (state.scheme === 'light') {
        // showAlert("Switching to dark...");
        $moonIcon.classList.remove("fa-moon-o");
        colorScheme("dark");
        $moonIcon.classList.add("fa-sun-o");
        state.scheme = 'dark';
        // showAlert(default_alert);
    } else if (state.scheme === 'dark') {
        // showAlert("Switching to light...");
        $moonIcon.classList.remove("fa-sun-o");
        colorScheme("light");
        $moonIcon.classList.add("fa-moon-o");
        state.scheme = 'light';
        // showAlert(default_alert);
    }
}

const colorScheme = (scheme) => {
        $header.classList.toggle('header-dark');
        document.body.classList.toggle('body-dark');
        
        $alerts.classList.toggle('alerts-dark');
        $searchBkmrk.classList.toggle('searchbtns-dark');
        $searchSubmit.classList.toggle('searchbtns-dark');
        $searchDark.classList.toggle('searchbtns-dark');

        if(scheme === 'dark'){
            $sidebarContent.style.background = 'linear-gradient(to left, grey 60%, #90a4ae)';
            $overlay.style.background = 'rgba(241, 232, 232, 0.438)';
            document.querySelectorAll('.card').forEach(card => card.classList.add('card-dark'));
            document.querySelectorAll('.card').forEach(card => card.style.borderBottom = '1px solid rgb(136, 112, 112)');
            $introLinks.forEach(introLink => introLink.style.color = '#60b0da');
            $alerts.style.color = '#ccc';
            $mobileMenu.style.background = 'rgb(77,77,77)';
            $footer.style.background = '#292929b7';
        }else{
            $sidebarContent.style.background = 'linear-gradient(to left, #23a1db 60%, #7ec3ff ';
            $overlay.style.background = '#ffffffb4';
            document.querySelectorAll('.card').forEach(card => card.classList.remove('card-dark'));
            document.querySelectorAll('.card').forEach(card => card.style.borderBottom = '1px solid snow');
            // $introLinks.style.color = 'rgb(71, 71, 212)';
            $introLinks.forEach(introLink => introLink.style.color = 'rgb(71, 71, 212)');
            $alerts.style.color = '#323232';
            $mobileMenu.style.background = 'white';
            $footer.style.background = '#f8f8f8';
        }
    }

const lread = (key) => {
    // return localStorage.getItem(key);
    let value = localStorage.getItem(key);
    if(!value){
        return value;
    }
    try{
        let value2 = atob(value);
        return value2;
    } catch(e){
        return value;
    }
}

const lwrite = (key, value) => {
    value = btoa(value);
    localStorage.setItem(key, value);
}

const lremove = (key) => {
    localStorage.removeItem(key);
}

const ifExistReturnArray = (str) => {
    return str ? str.split("///") : [];
}

const ls_keys = () => {
    let returnable = [];
    Object.keys(localStorage).forEach(key => {
        if (key.slice(0, 4) === "kyi_") {
            returnable.push(key);
        }
    });

    return returnable;
}

const showBookmarks = () => {
    let keys = ls_keys();
    
    let readList = keys.map(key => {
        try {
            return JSON.parse(lread(key));
        } catch (e) {
            return showAlert("Some error occured!");
        }
    });
    
    if (readList.length === 0) {
        showAlert("No bookmarks!");
    // }// 
    // else if(state.bookmarks.open === true) {
    //     hideBookmarks();
    // }
    } else {
        loadResults(readList);
        showAlert(`${readList.length} ${readList.length > 1 ? 'bookmarks' : 'bookmark'}`);
        $bkmrkIcon.classList.remove("fa-bookmark-o");
        $bkmrkIcon.classList.add("fa-bookmark");
        state.bookmarks.open = true;
    }
}

const hideBookmarks = () => {
    state.bookmarks.open = false;
    $bkmrkIcon.classList.remove("fa-bookmark");
    $bkmrkIcon.classList.add("fa-bookmark-o");

}

const refreshStateLsKeys = () => {
    state.ls_keys = ls_keys();
}

// const addBookmark = (student) => {
//     let readList = lread(ls_key);
//     readList = ifExistReturnArray(readList);
    
//     let indexIfAlreadyExists = readList.findIndex(val => {
//         return JSON.parse(val)._id === student._id ? true : false;
//     });

//     if (indexIfAlreadyExists !== -1) {
//         return showAlert("Already bookmarked!");
//     }

//     readList.push(JSON.stringify(student));

//     lwrite(ls_key, readList.join("///"));
// }

const addBookmark = (student) => {
    let readList = ls_keys();
    
    let indexIfAlreadyExists = readList.findIndex(val => {
        return val === ls_create_key(student._id) ? true : false;
    });

    if (indexIfAlreadyExists !== -1) {
        return showAlert("Already bookmarked!");
    }

    lwrite(ls_create_key(student._id), JSON.stringify(student));

    refreshStateLsKeys()
}

const removeBookmark = (id) => {
    lremove(ls_create_key(id));
    refreshStateLsKeys();
    if (state.bookmarks.open) {
        showBookmarks();
    }
}

const toggleBookmark = (student) => {
    if (state.ls_keys.includes(ls_create_key(student._id))) {
        removeBookmark(student._id);
        return "removed";
    } else{
        addBookmark(student);
        return "added";
    }
}

const ls_create_key = (id) => {
    return "kyi_" + id;
}

const closebtnToggle = function(e){
    if ($searchBar.value === ""){
        $searchClear.style.visibility = 'hidden';
        $searchClear.style.opacity = '0';
    } else{
        $searchClear.style.visibility = 'visible';
        $searchClear.style.opacity = '1';
    }
}

const showAppLinks = function(){
    $appLinks.style.visibility = 'visible';
    $appLinks.style.opacity = '1';
}
const hideAppLinks = function(){
    $appLinks.style.visibility = 'hidden';
    $appLinks.style.opacity = '0';
}
const hideAppLinksOnMobile = function(e){
    if(e.target !== $showAppLinks && $appLinks.style.opacity === '1'){
        $appLinks.style.visibility = 'hidden';
        $appLinks.style.opacity = '0';
    }
}

const displayCookieBar = () => {
    $cookieAgreement.style.bottom = 0;
    setTimeout(() => {
        $cookieAgreement.style.bottom = '-100%';    
    }, 30000)
}

const cookieFunction = () => {
    let potasticCrusaders = JSON.parse(lread('kyiCookieCheck'));
    if(typeof potasticCrusaders === 'object'){
        lwrite('kyiCookieCheck', false);
        potasticCrusaders = false;
    }
    if(potasticCrusaders === false){
        displayCookieBar();
    }
}