/* Overlay */
let $overlay = document.querySelector("#overlay");
let $loaderWrap = document.querySelector("#loader-wrap");
let $overlayText = document.querySelector("#overlay-text");
let $overlayCard = document.querySelector("#overlay-card-wrapper");
let $overlayCloseBtn = document.querySelector("#overlay-close-btn");

/* Modal */
let $modal = document.querySelector("#modal");
let $modalContent = document.querySelector(".modal-content");
let $modalCloseBtn = document.querySelector(".modal-close-btn");
let $modalHtml = document.querySelector(".modal-html");

/* Search Header */
let $header = document.querySelector(".header");
let $searchForm = document.querySelector(".search-form");
let $searchBar = document.querySelector("#search-bar");
let $searchSubmit = document.querySelector("#search-submit-btn");
let $searchClear = document.querySelector("#search-clear-btn");
let $searchDark = state.screenWidth > 820 ? document.querySelector("#search-dark-btn") : document.querySelector("#mobile-dark-btn");
let $moonIcon = state.screenWidth > 820 ? document.querySelector("#moon-icon") : document.querySelector("#mobile-dark-icon");
let $searchBkmrk = state.screenWidth > 820 ? document.querySelector("#search-bkmrk-btn") : document.querySelector("#mobile-bkmrk-btn");
let $bkmrkIcon = state.screenWidth > 820 ? document.querySelector("#bkmrk-icon") : document.querySelector("#mobile-bkmrk-icon");
let $alerts = state.screenWidth > 820 ? document.querySelector("#alerts") : document.querySelector("#mobile-alerts");
let $mobileMenu = document.querySelector('#mobile-menu-btn');
let $mobileMenuIcon = document.querySelector('#mobile-menu-icon');
let $logo = document.querySelector("#logo");

/* Sidebar */
let $sidebar = document.querySelector(".sidebar");
let $sidebarContent = document.querySelector(".sidebar_content");

/* Filters */
let $branch = document.querySelector("#branch");
let $state = document.querySelector("#state");
let $house = document.querySelector("#house");
let $club = document.querySelector("#club");
let $course= document.querySelector("#course");
let $clearFilters = document.querySelector("#clear_filters");

/* Results */
let $instructionCardText = document.querySelector("#inst-card-text");
let $instructionText = document.querySelectorAll('#inst-card-text > p');
let $introLinks = document.querySelectorAll('.intro-link');
let $right = document.querySelector("#right");
let $resultsUl = document.querySelector("#results-ul");
/* .results-li > .card > ( picture > source {srcset} ) + .card_text > h4 + h5 + p; */

/* Pagination */
let $pagination = document.querySelector("#page_scrolling_buttons");
let $firstPage = document.querySelector("#first_page");
let $nextPage = document.querySelector("#next_page");
let $previousPage = document.querySelector("#previous_page");

/* Utilities */
let $backToTop = document.querySelector("#back_to_top img");
let $installBtn = document.querySelector("#install-btn");

/* Footer*/
let $footer = document.querySelector('footer');
let $cookieAgreement = document.querySelector('.cookie-agreement');
let $cookieAgreementBtn = document.querySelector('#cookie-btn');
let $appLinks = document.querySelector('.app-links');
let $showAppLinks = document.querySelector('#open-app-links');