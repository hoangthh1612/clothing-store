import { Badge, Card, Row } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { PlayIcon } from "@heroicons/react/outline";

export default function LivestreamCard({ time, img }) {
  let roomName = "Day la livestream cua toi, hay vao ung cho toi nhe";
  return (
    // <Card hoverable className="p-0 mb-xl" bodyStyle={{ padding: 0 }}>
    //   <Row className="pb-lg p-lg" justify={'space-between'}>
    //     <Badge count="Live" className="" />
    //     <span>{time}</span>
    //   </Row>
    //   <div className="relative">
    //     <img alt="example" src={img} loading="lazy" className="w-full" />
    //     <PlayIcon
    //       //   style={{ color: 'gray', width: '40px', height: '40px' }}
    //       className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-[40px] h-[40px] hover:scale-110 duration-200"
    //     />
    //   </div>
    // </Card>
    <div className="w-full h-full flex-flex-col">
      <div className="h-[75%] relative">
        <div className="absolute border-[1px] border-red-400 px-[6px] py-[1px] top-2 left-2 rounded-lg">
          <p className="text-red-500">LIVE</p>
        </div>
        <div className="absolute border-[1px] bg-slate-500 px-[6px] py-[1px] top-2 left-16 rounded-[6px]">
          <p className="text-white text-[16px]">{5} views</p>
        </div>
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/04/how-to-add-live-streaming-videos-on-website-2-1.jpg"
          alt="Thumbnail"
          loading="lazy"
          className="w-full h-full border-[1px] object-cover rounded-tl-xl rounded-tr-xl"
        />
      </div>
      <div className="h-[25%] bg-slate-300 flex space-x-5 py-2 px-1 border-[1px] rounded-bl-xl rounded-br-xl">
        <img
          className="w-[40px] h-[40px] rounded-[50%] border-[1px] object-cover"
          src="https://colorwhistle.com/wp-content/uploads/2019/04/how-to-add-live-streaming-videos-on-website-2-1.jpg"
          alt=""
        />
        <div className="flex flex-col space-x-3">
          <div className="max-h-[60%]">
            <p className="text-[18px]">
              {roomName.length > 30
                ? `${roomName.slice(0, 30) + "..."}`
                : roomName}
            </p>
          </div>
          <p className="text-[18px] text-gray-400">{`Hoang Sport`}</p>
        </div>
      </div>
    </div>
  );
}
