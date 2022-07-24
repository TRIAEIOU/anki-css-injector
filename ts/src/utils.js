export function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
export function injectStylesheet(root, editable, url) {
    const link = document.createElement("link");
    link.title = "CSS Injector Field Styles";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    root.insertBefore(link, editable);
}
