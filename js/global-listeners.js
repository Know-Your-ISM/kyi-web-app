/* Global event listeners. */
window.onload = async () => {
    if (!lread("kyi-User")) {
        await startUserVerf();
    } else {
        readUserFromLs();
    }
    showAlert(default_alert);
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