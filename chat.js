{
    let SIZE = 60 // size of the chat button in pixels
    let BTN_RAD = SIZE / 2 // radius of the chat button in pixels
    let BG_CHAT = 'rgb(122 137 254)' // background color of the chat button
    let chatButtonLogo = `
<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="36" cy="36" r="36" fill="#0052FF"/>
<path d="M57.4997 33V37C57.5185 38.0308 57.2473 39.0462 56.7168 39.9303C56.1864 40.8144 55.4181 41.5315 54.4997 42V28.1C55.4028 28.5609 56.161 29.2624 56.6904 30.1271C57.2198 30.9919 57.4999 31.9861 57.4997 33ZM14.4997 33V37C14.4808 38.0308 14.7521 39.0462 15.2826 39.9303C15.813 40.8144 16.5813 41.5315 17.4997 42V28.1C16.5966 28.5609 15.8384 29.2624 15.309 30.1271C14.7796 30.9919 14.4995 31.9861 14.4997 33ZM51.4997 28V46C51.4997 47.4587 50.9202 48.8576 49.8888 49.8891C48.8573 50.9205 47.4584 51.5 45.9997 51.5H36.1597L31.2997 55.7C30.8519 56.0949 30.2767 56.3151 29.6797 56.32C29.3131 56.2944 28.9573 56.1849 28.6397 56C28.2032 55.8058 27.8326 55.4886 27.5733 55.0873C27.3141 54.686 27.1773 54.2178 27.1797 53.74V51.5H25.9997C24.541 51.5 23.1421 50.9205 22.1106 49.8891C21.0792 48.8576 20.4997 47.4587 20.4997 46V28C20.4997 26.5413 21.0792 25.1424 22.1106 24.1109C23.1421 23.0795 24.541 22.5 25.9997 22.5H40.4997V16C40.4997 15.6022 40.6577 15.2206 40.939 14.9393C41.2203 14.658 41.6019 14.5 41.9997 14.5C42.3975 14.5 42.7791 14.658 43.0604 14.9393C43.3417 15.2206 43.4997 15.6022 43.4997 16V22.5H45.9997C47.4584 22.5 48.8573 23.0795 49.8888 24.1109C50.9202 25.1424 51.4997 26.5413 51.4997 28ZM43.4997 41C43.4945 40.6038 43.3348 40.2253 43.0546 39.9451C42.7744 39.6649 42.3959 39.5052 41.9997 39.5H29.9997C29.6019 39.5 29.2203 39.658 28.939 39.9393C28.6577 40.2206 28.4997 40.6022 28.4997 41C28.4997 41.3978 28.6577 41.7794 28.939 42.0607C29.2203 42.342 29.6019 42.5 29.9997 42.5H41.9997C42.3959 42.4948 42.7744 42.3351 43.0546 42.0549C43.3348 41.7747 43.4945 41.3962 43.4997 41ZM43.4997 33C43.4945 32.6038 43.3348 32.2253 43.0546 31.9451C42.7744 31.6649 42.3959 31.5052 41.9997 31.5H29.9997C29.6019 31.5 29.2203 31.658 28.939 31.9393C28.6577 32.2206 28.4997 32.6022 28.4997 33C28.4997 33.3978 28.6577 33.7794 28.939 34.0607C29.2203 34.342 29.6019 34.5 29.9997 34.5H41.9997C42.3959 34.4948 42.7744 34.3351 43.0546 34.0549C43.3348 33.7747 43.4945 33.3962 43.4997 33Z" fill="white"/>
</svg>`

    let chatButtonClose = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>`


    function updateChatButtonOpenColor(newColor) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(chatButtonLogo, 'text/html');
        const svgElement = doc.body.firstChild;
        const circleElement = svgElement.querySelector('circle');
        if (circleElement) {
            circleElement.setAttribute('fill', newColor);
            chatButtonLogo = svgElement.outerHTML;
        } else {
            console.error('Circle element not found');
        }


        //update active button too
        const chatButtonLogoElement = chatButtonIcon.querySelector('svg');
        const pathElement = chatButtonLogoElement.querySelector('circle');
        pathElement.setAttribute('fill', newColor);
    }
    function updateChatButtonCloseColor(newColor) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(chatButtonClose, 'text/html');
        const svgElement = doc.body.firstChild;
        svgElement.setAttribute('fill', newColor);
    }


    // creat the chat button element
    let chatButton = document.createElement('div')
    // apply styles to the chat button
    chatButton.setAttribute('id', 'chat-bubble-button')
    chatButton.style.position = 'fixed'
    chatButton.style.bottom = '15px'
    chatButton.style.width = SIZE + 'px'
    chatButton.style.height = SIZE + 'px'
    chatButton.style.borderRadius = BTN_RAD + 'px'
    chatButton.style.backgroundColor = BG_CHAT
    chatButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
    chatButton.style.cursor = 'pointer'
    chatButton.style.zIndex = 999999999
    chatButton.style.transition = 'all .2s ease-in-out'

    chatButton.addEventListener('mouseenter', (event) => {
        chatButton.style.transform = 'scale(1.05)'
    })
    chatButton.addEventListener('mouseleave', (event) => {
        chatButton.style.transform = 'scale(1)'
    })

    // create the chat button icon element
    let chatButtonIcon = document.createElement('div')

    // apply styles to the chat button icon
    chatButtonIcon.style.display = 'flex'
    chatButtonIcon.style.alignItems = 'center'
    chatButtonIcon.style.justifyContent = 'center'
    chatButtonIcon.style.width = '100%'
    chatButtonIcon.style.height = '100%'
    chatButtonIcon.style.zIndex = 999999999

    // add the chat button icon to the chat button element
    chatButtonIcon.innerHTML = chatButtonLogo

    chatButton.appendChild(chatButtonIcon)

    // Create notification bubble element
    let notificationBubble = document.createElement('div')

    // Apply styles to the notification bubble
    notificationBubble.style.position = 'absolute'
    notificationBubble.style.top = '-7px'
    notificationBubble.style.right = '-1px'
    notificationBubble.style.width = '20px'
    notificationBubble.style.height = '20px'
    notificationBubble.style.borderRadius = '50%'
    notificationBubble.style.backgroundColor = 'red'
    notificationBubble.style.color = 'white'
    notificationBubble.style.display = 'flex'
    notificationBubble.style.alignItems = 'center'
    notificationBubble.style.justifyContent = 'center'
    notificationBubble.style.zIndex = 1000000000
    notificationBubble.style.fontSize = '12px'

    // Add "1" inside the notification bubble
    notificationBubble.innerHTML = "1"

    // Add the notification bubble to the chat button
    chatButton.appendChild(notificationBubble)


    // This function checks if the device is mobile
    function isMobileDevice() {
        console.log('window.innerWidth: ', window.innerWidth)
        const widthThreshold = 500; // Maximum width for small devices
        const viewportWidth = window.outerWidth//window.innerWidth;
        return viewportWidth <= widthThreshold;
    }


    const openChat = () => {
        chat.style.display = 'flex'
        chatButtonIcon.innerHTML = chatButtonClose
        // If on a mobile device, attempt to go fullscreen when the chat is opened
        if (isMobileDevice()) {

            //request full screen, if its a mobile device
            if (!document.fullscreenElement) {
                chat.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    }
    const closeChat = () => {
        chat.style.display = 'none'
        chatButtonIcon.innerHTML = chatButtonLogo
        if (isMobileDevice()) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    }

    // toggle the chat component when the chat button is clicked
    let firstClick = true
    chatButton.addEventListener('click', () => {
        // Remove the red notification on first click
        if (firstClick) {
            notificationBubble.style.display = 'none'
            firstClick = false
        }

        // Toggle the chat component
        if (chat.style.display === 'none') {
            openChat();
        } else {
            closeChat();
        }
    })

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        if (event.data && event.data.action === 'closeButtonClicked') {
            closeChat();
        }
    });

    function adjustForSmallScreens() {
        let smallScreenHeight = 600;
        if (window.innerHeight < smallScreenHeight) {
            chat.style.height = '70vh';
        }
    }


    let chat = document.createElement('div')
    chat.setAttribute('id', 'chat-bubble-window')

    chat.style.position = 'fixed'
    chat.style.flexDirection = 'column'
    chat.style.justifyContent = 'space-between'
    chat.style.bottom = '80px'
    chat.style.width = '85vw'
    chat.style.height = '70vh'
    chat.style.boxShadow =
        'rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px'
    chat.style.display = 'none'
    chat.style.borderRadius = '10px'
    chat.style.zIndex = 999999999
    chat.style.overflow = 'hidden'
    window.addEventListener('resize', adjustForSmallScreens);

    adjustForSmallScreens();

    let scriptTag = document.currentScript
    // // let urlBase = "https://arm.chatshape.com/"
    // let headers = { 'Content-Type': 'application/json' }
    console.log(scriptTag);
    let botName = scriptTag.id.substring(0, scriptTag.id.indexOf("-")).trim();
    let botID = scriptTag.id.replace(/.*?-/, "").trim();
    console.log("botID: ", botID)
    console.log("botName: ", botName)
    function init() {

        chat.innerHTML = `<iframe
    src="https://app.hypewize.com/projects/chatbot/${scriptTag.id}"
    width="100%"
    height="100%"
    frameborder="0"
    ></iframe>`

        document.body.appendChild(chat)
        let getColor = async () => {
            try {
                // Make a GET request to the specified URL
                let response = await fetch(`https://api.hypewize.com/v1/projects/${scriptTag.id}`);

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                console.log('response: ', response)
                // Parse the JSON response
                let data = await response.json();

                // Retrieve the themeColor from the response
                let themeColor = data.themeColor;

                // Set the background color of the context
                // document.body.style.backgroundColor = themeColor;
                // chatButton.style.backgroundColor = themeColor;
                // chatButtonIcon.style.backgroundColor = themeColor;
                updateChatButtonOpenColor(themeColor);
                updateChatButtonCloseColor(themeColor);
                chatButton.style.backgroundColor = themeColor;
                
                const isLeftSide = false;
                if (isLeftSide) {
                    chatButton.style.left = '20px';
                    chatButton.style.right = 'unset'
                    chat.style.left = '20px';
                    chat.style.right = 'unset'
                } else {
                    chatButton.style.right = '20px'
                    chatButton.style.left = 'unset'
                    chat.style.right = '20px'
                    chat.style.left = 'unset'
                }
                document.body.appendChild(chatButton);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        getColor()
    }
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }

    // Create a condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia('(min-width: 550px)')

    function handleSizeChange(e) {
        // Check if the media query is true
        if (e.matches) {
            chat.style.height = '600px'
            chat.style.width = '450px'
        }
    }

    // Register event listener
    mediaQuery.addEventListener('change', handleSizeChange)

    // Initial check
    handleSizeChange(mediaQuery)
}