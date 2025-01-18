import { CookieCategories } from "../utils/types/cookieCategory";

const getCookieCategories = (): CookieCategories => {
    return {
        necessary: {
            title: "cookies.necessary.title",
            descriptionKey: "cookies.necessary.description",
            cookies: [
                { name: "XSRF-TOKEN", descriptionKey: "cookies.necessary.XSRF-TOKEN" },
                { name: "session_id", descriptionKey: "cookies.necessary.session_id" },
                { name: "remember_me", descriptionKey: "cookies.necessary.remember_me" }
            ],
            defaultValue: true,
            readOnly: true,
            isActive: true,
        },
        analytics: {
            title: "cookies.analytics.title",
            descriptionKey: "cookies.analytics.description",
            cookies: [
                { name: "_ga", descriptionKey: "cookies.analytics._ga" },
                { name: "_gat_UA-XXXXXX", descriptionKey: "cookies.analytics._gat" },
                { name: "_gid", descriptionKey: "cookies.analytics._gid" }
            ],
            defaultValue: true,
            readOnly: false,
            isActive: true,
        },
        marketing: {
            title: "cookies.marketing.title",
            descriptionKey: "cookies.marketing.description",
            cookies: [
                { name: "fbp", descriptionKey: "cookies.marketing.fbp" },
                { name: "enter_ts", descriptionKey: "cookies.marketing.enter_ts" },
                { name: "gclid", descriptionKey: "cookies.marketing.gclid" }
            ],
            defaultValue: false,
            readOnly: false,
            isActive: true,
        },
        functional: {
            title: "cookies.functional.title",
            descriptionKey: "cookies.functional.description",
            cookies: [
                { name: "dark_mode", descriptionKey: "cookies.functional.dark_mode" },
                { name: "language", descriptionKey: "cookies.functional.language" }
            ],
            defaultValue: true,
            readOnly: false,
            isActive: false,
        },
    }
};

export default getCookieCategories;