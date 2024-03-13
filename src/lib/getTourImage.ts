export default async function getTourImage(tourId: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/tours/images/${tourId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
        // "Access-Control-Allow-Origin": "*"
      },
    },
  );
  // const res = await response.json()
  // console.log(response)
  if (!response.ok) {
    throw new Error("Failed to get tour");
  }
  return response.json();
}
