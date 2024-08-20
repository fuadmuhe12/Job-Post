import Image from "next/image";

type Props = {
  imgUrl: string;
  topic: string;
  desc: string;
};

const AboutCard = (props: Props) => {
  return (
    <div className="wrapper flex items-center gap-x-4">
      <div className="image">
        <Image
          src={props.imgUrl}
          width={40}
          height={40}
          alt={`logo for ${props.topic}`}
        />
      </div>
      <div className="detail">
        <p className="text-gray-400">{props.topic}</p>
        <p>{props.desc}</p>
      </div>
    </div>
  );
};

export default AboutCard;
