// ==UserScript==
// @name         NetMirror Native App Engine
// @namespace    http://tampermonkey.net
// @version      1.1
// @description  Bypasses ad restrictions and scales layout for Samsung TV
// @match        *://*.net52.cc/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Intercept network validation requests before they hit the server
    const interceptNetwork = () => {
        if (window.$ && window.$.ajax) {
            const originalAjax = window.$.ajax;
            window.$.ajax = function(options) {
                if (options.url && options.url.includes('/mobile/verify2.php')) {
                    console.log("Ad validation bypassed successfully.");
                    if (options.success) {
                        options.success({ statusup: "All Done", c: "n" });
                    }
                    return;
                }
                return originalAjax.apply(this, arguments);
            };
        }
    };

    // 2. Clear out the visual lockout walls and layers
    const cleanLayout = () => {
        const supportBox = document.querySelector('.info2');
        if (supportBox) supportBox.remove();

        const errorPopup = document.querySelector('.ssss');
        if (errorPopup) errorPopup.remove();

        const veil = document.querySelector('.dark-bg');
        if (veil) veil.remove();

        const adblockNotice = document.querySelector('.adblock');
        if (adblockNotice) adblockNotice.remove();

        const spotlight = document.querySelector('.spotlight');
        if (spotlight) {
            spotlight.style.setProperty('filter', 'none', 'important');
            spotlight.style.setProperty('opacity', '1', 'important');
            spotlight.style.setProperty('height', 'auto', 'important');
        }
    };

    // 3. Emulate mobile screen environment sizing properties
    const forceSizing = () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        const config = 'width=440, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        if (viewport) {
            if (viewport.getAttribute('content') !== config) {
                viewport.setAttribute('content', config);
            }
        } else {
            const meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = config;
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    };

    // Runtime loops to defeat lazy loading elements
    interceptNetwork();
    forceSizing();
    
    document.addEventListener("DOMContentLoaded", () => {
        interceptNetwork();
        cleanLayout();
        forceSizing();
    });

    setInterval(() => {
        interceptNetwork();
        cleanLayout();
        forceSizing();
    }, 250);

    // 4. Remote Key Navigation Logic
    window.addEventListener('keydown', function(e) {
        const tabForward = new KeyboardEvent('keydown', { key: 'Tab', keyCode: 9, code: 'Tab', which: 9, bubbles: true, cancelable: true });
        const tabBackward = new KeyboardEvent('keydown', { key: 'Tab', keyCode: 9, code: 'Tab', which: 9, shiftKey: true, bubbles: true, cancelable: true });

        switch(e.keyCode) {
            case 39: 
            case 40:
                e.preventDefault();
                document.activeElement.dispatchEvent(tabForward);
                break;
            case 38: 
                e.preventDefault();
                document.activeElement.dispatchEvent(tabBackward);
                break;
            case 37: 
                window.history.back();
                break;
        }
    });

    console.log("App initialization complete.");
})();
