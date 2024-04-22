import axios from 'axios'
import { otpSmsTemplate } from './constant';

export async function sendOtpSms(phone, code) {

    try {
        await axios.post(generateOTPLink(phone, code))
    } catch (e) {
        console.log(e);

    }

}

function generateOTPLink(phone, code) {
    return 'https://api.kavenegar.com/v1/' +
        process.env.API_KEY_KAVENEGAR +
        '/verify/lookup.json?receptor=' +
        phone +
        '&token=' +
        code +
        '&template=' +
        otpSmsTemplate
}