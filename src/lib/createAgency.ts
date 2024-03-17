export default async function createAgency({ data }: { data: any }) {
  console.log(data);
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
  if (!response.ok) {
    throw new Error("Failed to create Agency");
  }
  return response.json();
}
