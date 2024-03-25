"use client";
import React, { useEffect, useState } from "react";
import getTourMember from "@/lib/getTourMember";

export interface Member {
  age: number;
  firstName: string;
  lastName: string;
}

const TourMember = ({ params }: { params: { tourId: string } }) => {
  const [tourMember, setTourMember] = useState<Member[] | null>(null);
  useEffect(() => {
    async function waitForGetTourMember() {
      const t = await getTourMember(params.tourId);
      setTourMember(t.data);
      console.log(t.data);
    }
    waitForGetTourMember();
  }, []);

  return (
    <main className="p-16">
      {/* need a tour banner here */}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        View Your Members List
      </h3>
      <h4 className="text-l scroll-m-20 tracking-tight text-[#515B6F]">
        This is the Member of this trip
      </h4>
      <div className="mt-8 flex w-full flex-col justify-center">
        <table className="mx-auto w-5/6 min-w-[400px] table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-2/15">Member</th>
              <th className="w-1/3">First Name</th>
              <th className="w-1/3">Last Name</th>
              <th className="w-1/5">Age</th>
            </tr>
          </thead>
          <tbody>
            {tourMember?.map((member: Member, index: number) => (
              <tr key={0} className="text-center">
                <td>{index + 1}</td>
                <td>
                  <div className="mx-auto my-3 w-11/12">{member.firstName}</div>
                </td>
                <td>
                  <div className="mx-auto my-3 w-11/12">{member.lastName}</div>
                </td>
                <td>
                  <div className="mx-auto my-3 w-3/5">{member.age}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TourMember;
