import AboutCard from "@/components/aboutCard";
import { Job } from "@/lib/types/types";
import Image from "next/image";

const JobDetail = (props: Job) => {
  return (
    <main className="flex flex-col md:flex-row gap-x-16 px-8 py-7 ">
      <div className="left-side w-full md:w-3/4 flex flex-col gap-y-14">
        <div className="discription">
          <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
            Description
          </h2>
          <p className="leading-6 text-justify">{props.description}</p>
        </div>
        <div className="responsiblity">
          <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
            Responsibilities
          </h2>
          <div>
            {props.responsibilities.split("\n").map((value, ind) => {
              return (
                <div key={ind} className="flex items-center gap-x-2 pb-2">
                  <Image
                    src={"/icons/right_icon.svg"}
                    width={20}
                    height={20}
                    alt="right icon"
                  />
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ideal-candidate">
          <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
            Ideal Candidate we want
          </h2>
          <ul className="list-disc list-outside pl-6 leading-6 gap-y-1">
            <p> {`${props.idealCandidate} ${props.title}`}</p>
            {/* {props.ideal_candidate.traits.map((value, ind) => {
              // Split the trait by ":"
              const part = value.split(":");

              // Check if part[1] exists, otherwise provide a default empty string
              const leftPart = part[0]?.trim() || "";
              const rightPart = part[1]?.trim() || "";

              return (
                <li key={ind}>
                  <span className="font-semibold">{leftPart}</span>: {rightPart}
                </li>
              );
            })} */}
          </ul>
        </div>

        <div className="when-where pb-6">
          <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
            When & Where
          </h2>
          <div className="flex items-center gap-x-3">
            <Image
              src={"/icons/location.svg"}
              width={40}
              height={40}
              alt="location"
            />
            <p>{props.whenAndWhere}</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/4 w-full">
        <div className="divide-y-2 flex flex-col gap-y-5">
          <div className="about p">
            <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">About</h2>
            <div className="flex flex-col gap-y-5">
              <AboutCard
                desc={new Date(props.deadline).toISOString().split("T")[0]}
                imgUrl="/icons/posted_on.svg"
                topic="Posted on"
              />
              <AboutCard
                desc={new Date(props.deadline).toISOString().split("T")[0]}
                imgUrl="/icons/deadline.svg"
                topic="Deadline"
              />
              <AboutCard
                desc={props.location[0]}
                imgUrl="/icons/location.svg"
                topic="Location"
              />
              <AboutCard
                desc={new Date(props.startDate).toISOString().split("T")[0]}
                imgUrl="/icons/start_date.svg"
                topic="Start Date"
              />
              <AboutCard
                desc={new Date(props.endDate).toISOString().split("T")[0]}
                imgUrl="/icons/end_date.svg"
                topic="End Date"
              />
            </div>
          </div>
          <div className="catagories pt-5">
            <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
              Categories
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {props.categories.map((value, ind) => {
                return (
                  <div
                    key={ind}
                    className="bg-[#56cdad1a]  rounded-[80px] px-[6px] py-[10px] w-fit text-center text-[#56CDAD]"
                  >
                    <p className="text-xs font-semibold">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="required-skill pt-5">
            <h2 className="text-2xl font-[900] text-[#25324B]  pb-4">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {props.requiredSkills.map((value, ind) => {
                return (
                  <div
                    key={ind}
                    className="bg-[#4540de0c]  rounded-sm px-[6px] py-[10px] w-fit text-center text-[#4540de]"
                  >
                    <p className="text-xs font-normal">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetail;
