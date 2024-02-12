export default async function getTour(tourId: string) {
    const response = await fetch(`http://13.50.91.47:9000/api/v1/tours/${tourId}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            // "Access-Control-Allow-Origin": "*"
        },
    });
    // const res = await response.json()
    console.log(response)
    if (!response.ok) {
        throw new Error("Failed to get tour");
    }
    // return {
    //     "name":"dsa",
    //     "startDate":"2024-02-12T06:07:54.717Z",
    //     "endDate":"2024-02-12T06:07:54.717Z",
    //     "refundDueDate":"2024-02-12T06:07:54.717Z",
    //     "overviewLocation":"sda",
    //     "description":"asd",
    //     "price":1000,
    //     "maxMemberCount":69,
    //     "activities":[
    //         {
    //             "name":"asdasd",
    //             "description":"dasd",
    //             "startTimestamp":"2024-02-12T06:07:54.717Z",
    //             "endTimestamp":"2024-02-12T06:07:54.717Z",
    //             "location":{"name":"saddsa",
    //             "latitude":0,
    //             "longtitude":0,
    //             "type":"Other",
    //             "address":"sadadsasd"}
    //         }
    //     ]
    // }
    return response.json();
}