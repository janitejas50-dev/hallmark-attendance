import { loadCheckInPage } from "./pages/checkin";
import { loadConfirmPage } from "./pages/confirm";
import { loadShiftPage } from "./pages/shift";
import { loadSuccessPage } from "./pages/success";


export function showCheckIn(site) {
    loadCheckInPage(site);
}

export function showConfirm(onConfirm) {
    loadConfirmPage(onConfirm);
}

export function showShift(attendance, location) {
    loadShiftPage(attendance, location);
}

export function showSuccess() {
    loadSuccessPage();
}
