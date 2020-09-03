const loadResults = (results, fullCard) => {
    if (!results) return;
    clearResults();
    scrollToTop();

    if (fullCard) {
        let li = document.createElement('li');
        li.setAttribute('class', 'results-li');
        li.setAttribute('id', 'full-card-li');

        $resultsUl.appendChild(li);

        console.log("happened");

        return li.innerHTML = `
        <div id="instruction-card">
            <div id="inst-card_text">
                ${fullCard}
            </div>
        </div>
        `;
    }
    if (results.length <= 0) {
        showAlert('No results to show! <br /> Try shortening your keyword.');
        loadResults(null, `Oops! No results to show.`);
    }
    else {
        let i = 0;
        results.forEach(result => {
            i += 1;
            insertResult(result, i, state.ls_keys);
        });
    }
}

const clearResults = () => {
    $resultsUl.innerHTML = "";
}

const insertResult = (result, i) => {
    let { State, City, Course, Department, Name, Sex, House, Clubs, Facebook } = result;
    let li = document.createElement('li');
    let card = document.createElement('div');
    let picture = document.createElement('picture');
    let img = document.createElement('img');
    let card_text = document.createElement('div');
    let h4 = document.createElement('h4');
    let place = document.createElement('h5');
    let branch = document.createElement('h5');
    let bkmrk_btn = document.createElement('i');

    li.setAttribute("class", "results-li");
    li.setAttribute("id", i);

    card.setAttribute("class", "card");
    card_text.setAttribute("class", "card_text");

    h4.innerHTML = `${result.Name.toUpperCase()} <small><i>${Sex === "M" ? "MALE" : Sex === "F" ? "FEMALE" : "Unspecified"} | ${House.toUpperCase()}</i></small>`;
    // h6.innerHTML = `${Sex === "M" ? "MALE" : Sex === "F" ? "FEMALE" : "Unspecified"} | ${House.toUpperCase()}`;
    place.textContent = `${City ? City : "CITY"}, ${State ? State : "STATE"}`;
    branch.textContent = `${Course ? Course.toUpperCase() : "BTECH"} | ${Department ? Department : "DEPARTMENT"}`;

    card_text.appendChild(h4);
    card_text.appendChild(place);
    card_text.appendChild(branch);

    img.src = photo + "/" + result._id;
    img.onerror = () => {
        img.onerror = "";
        if (Sex === "M" || Sex.toLowerCase() === "male") {
            img.src = male_image;
        } else if (Sex === "F" || Sex.toLowerCase() === "female") {
            img.src = female_image;
        } else {
            img.src = blank_image;
        }
    }
    img.alt = "No photo";
    img.setAttribute("class", "thumbnail");

    picture.setAttribute("class", "picture");
    picture.appendChild(img);

    if (state.ls_keys.includes(ls_create_key(result._id))) {
        bkmrk_btn.classList.add("fa", "fa-star", "result-bkmrk-btn");
    } else {
        bkmrk_btn.classList.add("fa", "fa-star-o", "result-bkmrk-btn");
    }

    // bkmrk_btn.addEventListener("mouseover", (e) => {
    //     bkmrk_btn.classList.remove("fa", "fa-star-o", "result-bkmrk-btn");
    //     bkmrk_btn.classList.add("fa", "fa-star", "result-bkmrk-btn");
    // });

    // bkmrk_btn.addEventListener("mouseout", (e) => {
    //     bkmrk_btn.classList.remove("fa", "fa-star", "result-bkmrk-btn");
    //     bkmrk_btn.classList.add("fa", "fa-star-o", "result-bkmrk-btn");
    // });

    bkmrk_btn.addEventListener("click", (e) => {
        let effect = toggleBookmark(result);
        if (effect === "removed") {
            bkmrk_btn.classList.remove("fa", "fa-star", "result-bkmrk-btn");
            bkmrk_btn.classList.add("fa", "fa-star-o", "result-bkmrk-btn");
        } else if (effect === "added") {
            bkmrk_btn.classList.remove("fa", "fa-star-o", "result-bkmrk-btn");
            bkmrk_btn.classList.add("fa", "fa-star", "result-bkmrk-btn");
        }
    })

    card.appendChild(picture);
    card.appendChild(card_text);
    card.appendChild(bkmrk_btn);

    li.appendChild(card);

    li.addEventListener("click", () => {
        launchCard();
        document.querySelector("#overlay-card-wrapper").innerHTML = `
        <div id="#ovl-card-photo-wrap>
            <img src="${photo}/${result._id}" id="overlay-card-photo"/>
        </div>
        <div id="overlay-card">
        <div id="overlay-card-text">
            <h4>${Name.toUpperCase()} | ${result["Admission No"].toUpperCase()}</h4>
            <h4>${Course ? Course.toUpperCase() : "BTECH"}</h4>
            <h4>${Department ? Department.toUpperCase() : ""}</h4>
            <h4>${City ? City.toUpperCase() : ""}${State ? " ," + State.toUpperCase() : ""}</h4>
            <h4>${Sex === "M" ? "MALE" : Sex === "F" ? "FEMALE" : "Unspecified"} | ${House.toUpperCase()}</h4>
            <h4>${Clubs[0] && Clubs[0] !== "" ? Clubs[0].toUpperCase() : ""}</h4>
            <h4>${Clubs[1] && Clubs[1] !== "" ? Clubs[1].toUpperCase() : ""}</h4>
            <h4>${Clubs[2] && Clubs[2] !== "" ? Clubs[2].toUpperCase() : ""}</h4>
            <a ${Facebook ? 'href="' + Facebook + '"' : null} target="_blank" rel="noreferrer noopener"> ${ Facebook ? '<i class="fa fa-facebook"></i>' : "Facebook Profile Unavailable!"} </a>
           </div> 
        </div>
        `;

        $overlayCloseBtn.addEventListener("click", () => {
            closeCard();
        });

        window.onclick = function(event) {
            if (event.target == $overlayCard) {
                closeCard();
            }
        }

        window.onkeydown = function(event) {
            if (event.key == "Escape" && state.card === "open") {
                closeCard();
            }
        }
    });

    $resultsUl.appendChild(li);
}