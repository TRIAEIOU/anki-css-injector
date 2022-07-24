import { setAttributes, injectStylesheet } from "./utils";
const StyleInjector = {
    update: async function (addonPackage, attrs) {
        setAttributes(document.documentElement, { ...attrs });
        if (attrs.pointVersion < 50) {
            [...document.getElementById("fields").children].forEach((field, i) => {
                const editable = field.editingArea.editable;
                inject(addonPackage, editable, { ord: i + 1, ...attrs });
            });
        }
        else {
            /* Thanks to Hikaru Y. for generously providing this async iterator! */
            const { default: iterateAnkiEditables } = await import("./iterator");
            for await (const [editable, i] of iterateAnkiEditables()) {
                inject(addonPackage, editable, { ord: i + 1, ...attrs });
            }
        }
    },
};
function inject(addonPackage, editable, attrs) {
    const root = editable.getRootNode();
    editable.classList.add(...document.body.classList);
    setAttributes(editable, {
        field: (attrs.pointVersion < 50
            ? root.host.previousElementSibling?.getAttribute("title")
            : root.host.closest(".editor-field")?.querySelector(".label-name")
                ?.innerHTML) || "",
        ...attrs,
    });
    if (!root.querySelector("link[title*='CSS Injector']")) {
        injectStylesheet(root, editable, `/_addons/${addonPackage}/user_files/field.css`);
    }
}
globalThis.StyleInjector = StyleInjector;
