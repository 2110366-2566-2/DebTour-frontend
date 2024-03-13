export default async function isUserExist(provider:string, user:any) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/firstContact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error("Failed to get user");
    }
    return response.json()
}