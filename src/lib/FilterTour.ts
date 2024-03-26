export default async function FilterTour(
  searchName: string,
  StartDate: string,
  EndDate: string,
  YourTotalMembers: string,
  MinPrice: string,
  MaxPrice: string,
  AgencyUsername: string,
) {
  let query = `?name=${searchName}&startDate=${StartDate}&endDate=${EndDate}&priceFrom=${MinPrice}&priceTo=${MaxPrice}&availableMemberCountFrom=${YourTotalMembers}&agencyUsername=${AgencyUsername}`;
  console.log(query);
  const response1 = await fetch(
    `${process.env.BACKEND_URL}/api/v1/tours/filter${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response1.ok) {
    throw new Error("Failed to get tour");
  }
  query = `?overviewLocation=${searchName}&startDate=${StartDate}&endDate=${EndDate}&priceFrom=${MinPrice}&priceTo=${MaxPrice}&availableMemberCountFrom=${YourTotalMembers}&agencyUsername=${AgencyUsername}`;
  console.log(query);
  const response2 = await fetch(
    `${process.env.BACKEND_URL}/api/v1/tours/filter${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response2.ok) {
    throw new Error("Failed to get tour");
  }

  // merge 2 response by tourId
  const response1Json = await response1.json();
  const response2Json = await response2.json();
  let mergeResponse = [] as any[];
  response1Json.data?.forEach((element1: any) => {
    mergeResponse.push(element1);
  });
  response2Json.data?.forEach((element2: any) => {
    let isExist = false;
    mergeResponse.forEach((element1) => {
      if (element1.tourId === element2.tourId) {
        isExist = true;
      }
    });
    if (!isExist) {
      mergeResponse.push(element2);
    }
  });
  console.log("Punny", mergeResponse);
  return mergeResponse;
}
