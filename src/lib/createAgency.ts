export default async function createAgency({ data }: { data: any }) {
  console.log("This is my data", data);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/registerAgency`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to create Agency");
  }
  return response.json();
}
