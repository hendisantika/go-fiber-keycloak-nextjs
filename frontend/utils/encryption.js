export function encrypt(text) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
}
