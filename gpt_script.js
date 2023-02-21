chrome.runtime.onMessage.addListener(
    function(emailContent, sender, sendResponse) {
        const textArea = document.querySelector('textarea');
        textArea.value = 'Respond to the most recent email in professional tone and sign off with my name (Amir Z) at the end:\n' + emailContent;
        const button = textArea.nextElementSibling;
        button.click();

        const callback = function(mutationList, observer) {
            for (const mutation of mutationList) {
                if (mutation.attributeName === 'disabled') {
                    if (button.disabled === false) {
                        const responses = document.querySelector('#__next > div.overflow-hidden.w-full.h-full.relative > div.flex.h-full.flex-1.flex-col.md\\:pl-\\[260px\\] > main > div.flex-1.overflow-hidden > div > div > div');
                        const lastResponseText = responses.lastElementChild.previousElementSibling.innerText;
                        sendResponse(lastResponseText);
                    };
                }
            }
        }

        const observer = new MutationObserver(callback);
        observer.observe(button, {attributes: true});
        return true;
    }
)