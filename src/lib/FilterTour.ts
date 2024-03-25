export default async function FilterTour(
  searchName: string,
  StartDate: string,
  EndDate: string,
  MemberCount: string,
  MinPrice: string,
  MaxPrice: string,
  AgencyUsername: string,
) {
  const HaveSearchName = searchName !== "";
  const HaveStartDate = StartDate !== "";
  const HaveEndDate = EndDate !== "";
  const HaveMemberCount = MemberCount !== "";
  const HaveMinPrice = MinPrice !== "";
  const HaveMaxPrice = MaxPrice !== "";
  const HaveAgencyUsername =
    AgencyUsername !== "" || AgencyUsername !== undefined;
  let responsebody = "";
  let AgencyName =
    AgencyUsername === "" || AgencyUsername === undefined
      ? ""
      : `${AgencyUsername}`;
  if (
    !HaveSearchName &&
    !HaveStartDate &&
    !HaveEndDate &&
    !HaveMemberCount &&
    !HaveMinPrice &&
    !HaveMaxPrice &&
    !HaveAgencyUsername
  ) {
    responsebody = "";
  } else {
    responsebody = `?name=${searchName}&startDate=${StartDate}&endDate=${EndDate}&priceFrom=${MinPrice}&priceTo=${MaxPrice}&agencyUsername=${AgencyName}`;
  }
  console.log(responsebody);
  const response = await fetch(
    `http://13.50.91.47:9000/api/v1/tours/filter${responsebody}`,
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
    searchName: string,
    StartDate: string,
    EndDate: string,
    YourTotalMembers: string,
    MinPrice: string,
    MaxPrice: string,
) {
    let query = `?name=${searchName}&startDate=${StartDate}&endDate=${EndDate}&priceFrom=${MinPrice}&priceTo=${MaxPrice}&availableMemberCountFrom=${YourTotalMembers}`;
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
    query = `?overviewLocation=${searchName}&startDate=${StartDate}&endDate=${EndDate}&priceFrom=${MinPrice}&priceTo=${MaxPrice}&availableMemberCountFrom=${YourTotalMembers}`;
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
    let mergeResponse = []  as any[]
    response1Json.data?.forEach((element1: any) => {
        mergeResponse.push(element1)
    });
    response2Json.data?.forEach((element2: any) => {
        let isExist = false
        mergeResponse.forEach((element1) => {
            if (element1.tourId === element2.tourId) {
                isExist = true
            }
        })
        if (!isExist) {
            mergeResponse.push(element2)
        }
    });
    return mergeResponse
}
