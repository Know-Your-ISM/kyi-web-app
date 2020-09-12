/* Globals */
const admnoRegex = /\d/;
let currentPage = 1;
let blank_image = "kyi_logo_2.png";
let male_image = "public/img/male.png";
let female_image = "public/img/female.png";
let beard_image = "public/img/man_beard.jpg";
let photo = `https://kyi.herokuapp.com/api/students/avatar`;
let form_url = `https://forms.gle/MPTtLhE9PQVXZQQ29`;
let ls_key = "kyi-bkmrks_list";
// let yourname = / ?your ? name ?/i;

/* State */
let state = {
    page: 1,
    screenWidth: document.documentElement.clientWidth,
    filters: this.screenWidth < 767 ? 'closed' : 'open',
    lastAlert: '',
    currentAlert: '',
    online: true,
    scheme: "light",
    User: {},
    verf_attempt: 5,
    card: "closed",
    ls_keys: Object.keys(localStorage),
    bookmarks: {
        open: false
    }
}

let userVerf = `<form class="user-verification" id="usr-verf-form">
<p id="usr-verf-request"> If you haven't already please complete <a href="${form_url}" target="_blank" rel="noreferrer noopener">this form</a> to have your data registered with KYI. <br /> It only takes a minute.</p>
<h4 id="usr-verf-info"> Please enter your Admission Number to proceed. </h4>
<input type="input" name="Admission No" id="usr-verf-input" placeholder="XXJEXXXX">
<input type="submit" name="search" id="usr-verf-submit" value="Continue">
<p class="usr-verf-explaination">
KYI houses the preliminary knowledge of all students inside IIT (ISM) Dhanbad in a secure cloud database and makes it all searchable. 
</p>
<div class="hide-on-mobile" style="text-align:center;">
Hang on for the Native Android and iOS apps. They'll be in the respective app markets shortly. <br />
Also, soon, this data will be accessible via our API for use in your own apps.
</div>
<p class="usr-verf-explaination">Send suggestions, complaints, compliments or even a hello at: <br /> <a href="mailto:sayhello@kyism.ml" target="_blank" rel="noreferrer noopener">sayhello@kyism.ml</a></p>
</div>
<p class="usr-verf-links"><a href="https://kyism.ga/disclaimer" target="_blank">•Disclaimer</a> <a href="https://kyism.ga/privacy" target="_blank">•Privacy Policy</a> <a href="https://kyism.ga/terms_and_conditions" target="_blank">•Terms and Conditions</a></p>`;

let default_alert = Object.keys(state.User).length > 0 ? `<span>${state.User.Name}</span>` : "";

/*
<p class="usr-verf-explaination">Imagine being able to identify every senior you come across...<br /> With <b>Know Your ISM</b>, that's exactly what you'll be able to do. </p> 
<p class="usr-verf-explaination">On each of <b>KYI</b>'s apps, you can search through the public data of students across IIT (ISM) Dhanbad.<br />
And that's just the beginning, soon you'll be able to access this data programatically in your own apps. <br />
Besides, inside KYI's Android and iOS apps, you'll also find a dose of fresher-friendly guides to everything ISM.</p>
*/