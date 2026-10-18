(function() {
    'use strict';

    // 1. Force Phone/Mobile layout scaling on your TV screen
    const forceMobileLayout = () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        const contentStr = 'width=440, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        if (viewport) {
            if (viewport.getAttribute('content') !== contentStr) {
                viewport.setAttribute('content', contentStr);
            }
        } else {
            const meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = contentStr;
            document.getElementsByTagName('head').appendChild(meta);
        }
    };

    // 2. Tear down the Lockout Wall containers instantly
    const clearSupportWalls = () => {
        // Strip out the "We Need Support" overlay block
        const supportContainer = document.querySelector('.info2');
        if (supportContainer) { supportContainer.remove(); }

        // Drop the tracking error popup window
        const errorPopup = document.querySelector('.ssss');
        if (errorPopup) { errorPopup.remove(); }

        // Wipe away the dark background veil layer blocking your clicks
        const darkVeil = document.querySelector('.dark-bg');
        if (darkVeil) { darkVeil.remove(); }

        // Neutralise the site's AdBlock detection notice
        const adBlockNotice = document.querySelector('.adblock');
        if (adBlockNotice) { adBlockNotice.remove(); }

        // Reset the main layout blur effect so images display cleanly
        const blurredSpotlight = document.querySelector('.spotlight');
        if (blurredSpotlight) {
            blurredSpotlight.style.setProperty('filter', 'none', 'important');
            blurredSpotlight.style.setProperty('opacity', '1', 'important');
            blurredSpotlight.style.setProperty('height', 'auto', 'important');
        }
    };

    // Run layout adjustments immediately when page code loads
    forceMobileLayout();
    document.addEventListener("DOMContentLoaded", () => {
        forceMobileLayout();
        clearSupportWalls();
    });

    // Run a tracking loop every 200 milliseconds to keep elements clean
    setInterval(() => {
        forceMobileLayout();
        clearSupportWalls();
    }, 200);

    // 3. Samsung TV Remote Interface Navigation Key Handler (Tab-Conversion Engine)
    window.addEventListener('keydown', function(e) {
        // Create a fake keyboard event that acts exactly like pressing 'Tab'
        const fakeTabEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            keyCode: 9,
            code: 'Tab',
            which: 9,
            bubbles: true,
            cancelable: true
        });

        // Create a fake keyboard event that acts like pressing 'Shift + Tab' (Go Backward)
        const fakeShiftTabEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            keyCode: 9,
            code: 'Tab',
            which: 9,
            shiftKey: true,
            bubbles: true,
            cancelable: true
        });

        switch(e.keyCode) {
            case 39: // Remote Right Arrow -> Move to next item (Tab)
                e.preventDefault();
                document.activeElement.dispatchEvent(fakeTabEvent);
                break;
            case 40: // Remote Down Arrow -> Also moves forward down the grid rows (Tab)
                e.preventDefault();
                document.activeElement.dispatchEvent(fakeTabEvent);
                break;
            case 38: // Remote Up Arrow -> Move to previous item (Shift + Tab)
                e.preventDefault();
                document.activeElement.dispatchEvent(fakeShiftTabEvent);
                break;
            case 37: // Remote Left Arrow -> Standard navigation page back
                window.history.back();
                break;
            case 13: // Remote Center Click -> Enter/Select the highlighted element
                // The TV engine naturally triggers selections on focused elements
                break;
        }
    });

    console.log("TizenBrew Unified App Interface Engine Active.");
})();
