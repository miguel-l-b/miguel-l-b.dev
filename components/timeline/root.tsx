import { useEffect, useState } from "react"
import TimeLine from "."
import { timelineType } from "@/infra/models"
import Markdown from "react-markdown"


export default function Root() {
  const [content, setContent] = useState<timelineType[] | undefined>(undefined)
  const [indexActivate, setIndex] = useState<number>(0)

  useEffect(() => {
    fetch("/api/timeline/all").then(async (res) => {
      const data = await res.json() as timelineType[]
      data.sort((a, b) => a.date > b.date ? 1 : -1)
      if(data.length !== 0)
        setContent(data)
    })
  }, [])

  return (
    <div className="flex px-10 gap-10 flex-col md:flex-row">
      <div className="flex md:flex-col">
        {
          content &&
          content.map((item, index) => (
            <>
              <TimeLine.node
                isActive={indexActivate === index}
                onClick={() => setIndex(index)}
                date={item.date}
                key={index}
              />
              <TimeLine.connect isFinished={index === content.length -1} />
            </>
          ))
        }
      </div>
      <div className="bg-black w-full p-1 h-[40dvh] md:h-auto rounded-3xl text-center flex flex-col justify-center">
        <h1>{content && content[indexActivate].title}</h1>
        <Markdown>{content && content[indexActivate].content}</Markdown>
      </div>
    </div>
  );
}
