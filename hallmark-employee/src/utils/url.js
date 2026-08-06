export function getSiteCode() {

    const params = new URLSearchParams(window.location.search);

    return params.get("site");

}