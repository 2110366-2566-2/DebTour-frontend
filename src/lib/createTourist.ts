export default async function createTourist({data}: {data: any}){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/registerTourist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error("Failed to create tourist");
    }
    return response.json()
}