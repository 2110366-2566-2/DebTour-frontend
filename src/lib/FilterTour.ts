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
}
