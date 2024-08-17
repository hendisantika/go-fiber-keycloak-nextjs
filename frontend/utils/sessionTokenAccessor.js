export async function getAccessToken() {

    const session = await getServerSession(authOptions);
    if (session) {
        const accessTokenDecrypted = decrypt(session.access_token)
        return accessTokenDecrypted;
    }
    return null;
}
