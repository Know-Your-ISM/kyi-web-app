/* Global event listeners. */
window.onload = () => {
    launchModal(userVerf, true);
    if(window.innerWidth > 820) {
        document.querySelector("#usr-verf-input").focus();
    }
    // console.log(window.innerWidth)
    runUserVerf();
    switchPlaceholder();
    state.ls_keys = ls_keys();
}

// window.addEventListener("offline", (ev) => {
//     ev.preventDefault();
//     state.online = false;
//     $overlay.style.display = 'block';
//     $overlayText.innerHTML = 'You are offline';
//     window.addEventListener("online", (e) => {
//         $overlay.style.display = 'none';
//         $overlayText.innerHTML = 'Back online.';
//         // location.reload();
//     });
// });

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    $installBtn.classList.toggle('hidden', false);
});

$installBtn.addEventListener('click', () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then((result) => {
        window.deferredPrompt = null;
        $installBtn.classList.toggle('hidden', true);
    });
});

window.addEventListener('appinstalled', (event) => {
   showAlert("App installed!");
});




// window.addEventListener('scroll', shift)