export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};

export const encrypt = {
    key: process.env.ENCRYPT_KEY,
    algorithm: 'aes-256-cbc'
}

export const otpSmsTemplate =process.env.OTP_SMS_TEMPLATE