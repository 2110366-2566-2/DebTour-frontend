export default async function deleteTour(token: string, tourId: string) {
    console.log(token)
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours/${tourId}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            // "Access-Control-Allow-Origin": "*"
        },
    });
    // const res = await response.json()
    // console.log(res.body)
    if (!response.ok) {
        throw new Error("Failed to delete tour");
    }
    return response.json();
}