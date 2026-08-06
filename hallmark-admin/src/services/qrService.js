import QRCode from "qrcode";

export async function generateSiteQR(siteCode) {

    const url =
        `https://hallmark-attendance.web.app/checkin?site=${siteCode}`;

    return await QRCode.toDataURL(url);

}