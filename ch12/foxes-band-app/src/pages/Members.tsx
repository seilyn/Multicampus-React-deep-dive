import { Await, Navigate, useAsyncValue, useLoaderData } from "react-router-dom";
import { MemberType } from "../loaders";
import React from "react";
import { ReactCsspin } from "react-csspin";

const Members = () => {
  const members = useAsyncValue() as MemberType[];
  // console.log("##members: " + members);

  const imgstyle = { width: 90, height: 80 };
  const list =
    typeof members !== "string" ? (
      members.map((member) => {
        return (
          <div className="col-6 col-md-4 col-lg-3" key={member.name}>
            <img src={member.photo} className="img-thumbnail" alt={member.name} style={imgstyle} />
            <br />
            <h6>{member.name}</h6>
            <br />
            <br />
          </div>
        );
      })
    ) : (
      <Navigate to={"/"} state={{ from: "/members" }} />
    );
  // 홈으로 이동했을 때 location객체의 state가뭔가 존재하고 from이라는 속성이 있으면 from으로 다시 이동시켜버리면 된다.

  return (
    <div>
      <h2 className="m-4">Members</h2>
      <div className="container">
        <div className="row">{list}</div>
      </div>
    </div>
  );
};

type DeferredMembersDataType = { members: Promise<MemberType[]> };

const MembersSuspense = () => {
  const data = useLoaderData() as DeferredMembersDataType;

  // Suspense를 사용
  // 받아오기 전까진 csspin을 렌더링.
  // await이후 Members 렌더링
  return (
    <React.Suspense fallback={<ReactCsspin />}>
      <Await resolve={data.members}>
        <Members />
      </Await>
    </React.Suspense>
  );
};

export { MembersSuspense };
export default Members;
