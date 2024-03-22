export default async function createTour(session:any, tour: object) {
    if (!session || session.user.role !== "Agency") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
        },
        body: JSON.stringify(tour),
    });
    if (!response.ok) {
        return {
            success: false,
        };
    }
    return {
        success: true,
    };
}