(function() {
    const scriptTag = document.currentScript;
    const botID = scriptTag.id.replace(/.*?-/, "").trim();

    if (!window.hasOwnProperty(`chatInjected_${botID}`)) {
        window[`chatInjected_${botID}`] = true;

        // Create chat and chat button elements
        const chat = document.createElement('div');
        const chatButton = document.createElement('div');
        const chatButtonIcon = document.createElement('div');
        const notificationBubble = document.createElement('div');

        chat.id = 'chat-bubble-window';
        chatButton.id = 'chat-bubble-button';
        chatButtonIcon.id = 'chat-bubble-button-icon';
        notificationBubble.id = 'chat-bubble-notification';

        const chatButtonLogo = `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="36" cy="36" r="36" fill="#0052FF"/> <path d="M57.4997 33V37C57.5185 38.0308 57.2473 39.0462 56.7168 39.9303C56.1864 40.8144 55.4181 41.5315 54.4997 42V28.1C55.4028 28.5609 56.161 29.2624 56.6904 30.1271C57.2198 30.9919 57.4999 31.9861 57.4997 33ZM14.4997 33V37C14.4808 38.0308 14.7521 39.0462 15.2826 39.9303C15.813 40.8144 16.5813 41.5315 17.4997 42V28.1C16.5966 28.5609 15.8384 29.2624 15.309 30.1271C14.7796 30.9919 14.4995 31.9861 14.4997 33ZM51.4997 28V46C51.4997 47.4587 50.9202 48.8576 49.8888 49.8891C48.8573 50.9205 47.4584 51.5 45.9997 51.5H36.1597L31.2997 55.7C30.8519 56.0949 30.2767 56.3151 29.6797 56.32C29.3131 56.2944 28.9573 56.1849 28.6397 56C28.2032 55.8058 27.8326 55.4886 27.5733 55.0873C27.3141 54.686 27.1773 54.2178 27.1797 53.74V51.5H25.9997C24.541 51.5 23.1421 50.9205 22.1106 49.8891C21.0792 48.8576 20.4997 47.4587 20.4997 46V28C20.4997 26.5413 21.0792 25.1424 22.1106 24.1109C23.1421 23.0795 24.541 22.5 25.9997 22.5H40.4997V16C40.4997 15.6022 40.6577 15.2206 40.939 14.9393C41.2203 14.658 41.6019 14.5 41.9997 14.5C42.3975 14.5 42.7791 14.658 43.0604 14.9393C43.3417 15.2206 43.4997 15.6022 43.4997 16V22.5H45.9997C47.4584 22.5 48.8573 23.0795 49.8888 24.1109C50.9202 25.1424 51.4997 26.5413 51.4997 28ZM43.4997 41C43.4945 40.6038 43.3348 40.2253 43.0546 39.9451C42.7744 39.6649 42.3959 39.5052 41.9997 39.5H29.9997C29.6019 39.5 29.2203 39.658 28.939 39.9393C28.6577 40.2206 28.4997 40.6022 28.4997 41C28.4997 41.3978 28.6577 41.7794 28.939 42.0607C29.2203 42.342 29.6019 42.5 29.9997 42.5H41.9997C42.3959 42.4948 42.7744 42.3351 43.0546 42.0549C43.3348 41.7747 43.4945 41.3962 43.4997 41ZM43.4997 33C43.4945 32.6038 43.3348 32.2253 43.0546 31.9451C42.7744 31.6649 42.3959 31.5052 41.9997 31.5H29.9997C29.6019 31.5 29.2203 31.658 28.939 31.9393C28.6577 32.2206 28.4997 32.6022 28.4997 33C28.4997 33.3978 28.6577 33.7794 28.939 34.0607C29.2203 34.342 29.6019 34.5 29.9997 34.5H41.9997C42.3959 34.4948 42.7744 34.3351 43.0546 34.0549C43.3348 33.7747 43.4945 33.3962 43.4997 33Z" fill="white"/> </svg>`; // Replace with your open chat SVG
        const chatButtonClose = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" width="24" height="24"> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /> </svg>`; // Replace with your close chat SVG

        // Add the icon and notification to the chat button
        chatButton.appendChild(notificationBubble);
        chatButton.appendChild(chatButtonIcon);

        // Register a media query event listener
        const mediaQuery = window.matchMedia('(min-width: 550px)');
        mediaQuery.addEventListener('change', handleSizeChange);
        handleSizeChange(mediaQuery);  // Initial check

        function handleSizeChange(mediaQuery) {
            if (mediaQuery.matches) {
                // If the media query is true, display chat and chat button
                chat.style.display = 'flex';
                chatButton.style.display = 'none';
            } else {
                // If the media query is false, hide chat and display chat button
                chat.style.display = 'none';
                chatButton.style.display = 'flex';
            }
        }

        // In your setup function, check if chat and chatButton already exist in the DOM.
        // If not, create and append them.
        function setup() {
            if (!document.getElementById('chat-bubble-window')) {
                chat.innerHTML = `<iframe src="https://hypewize.com/chatbot/${scriptTag.id}" width="100%" height="100%" frameborder="0"></iframe>`;
                document.body.appendChild(chat);
                setupChatButton();
            }
        }

        // And same in the setupChatButton function
        function setupChatButton() {
            if (!document.getElementById('chat-bubble-button')) {
                let firstClick = true;
                chatButton.addEventListener('click', () => {
                    if (firstClick) {
                        notificationBubble.style.display = 'none';
                        firstClick = false;
                    }
                    if (chat.style.display === 'none') {
                        chat.style.display = 'flex';
                        chatButtonIcon.innerHTML = chatButtonClose;
                    } else {
                        chat.style.display = 'none';
                        chatButtonIcon.innerHTML = chatButtonLogo;
                    }
                });

                document.body.appendChild(chatButton);
            }
        }

        // Call setup to start
        setup();
    }
})();
