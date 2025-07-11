export const setCookie = (name, value, hours) => {
    const date = new Date();
    const milliseconds = 1000;
    const seconds = 60;
    const minutes = 60;

    date.setTime(date.getTime() + hours * seconds * minutes * milliseconds);
    const cookieValue = encodeURIComponent(value) + (hours === null ? '' : `;expires=${date.toUTCString()};path=/`);
    document.cookie = `${name}=${cookieValue}`;
};

export const getCookie = (name) => {
    const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);

    if (results) {
        return decodeURIComponent(results[2]);
    }
    return null;
};
