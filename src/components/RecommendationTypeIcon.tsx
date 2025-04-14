import React from "react";
import type { getCollection } from "astro:content"
import { FaBlogger, FaBookOpen, FaBoxesStacked, FaNewspaper, FaPaperclip, FaPaperPlane, FaPodcast, FaTwitch, FaVideo, FaYoutube } from "react-icons/fa6";

type RecommendationType = Awaited<ReturnType<typeof getCollection<"recommendations">>>[number]

export default function RecommendationTypeIcon({ recommendation }: { recommendation: RecommendationType }) {
  const Icon = (() => {
    switch (recommendation.data.category) {
      case "blog": return (<FaBlogger className="text-xl text-orange-600" />)
      case "article": return (<FaNewspaper className="text-xl text-gray-500" />)
      case "video": {
        if (recommendation.data.url.startsWith("https://youtu.be") || recommendation.data.url.startsWith("https://www.youtube.com")) {
          return (<FaYoutube className="text-xl text-red-700" />)
        } else if (recommendation.data.url.startsWith("https://www.twitch.tv")) {
          return (<FaTwitch className="text-xl text-purple-800" />)
        }
        return <FaVideo className="text-xl text-yellow-950" />
      }
      case "book": return (<FaBookOpen className="text-xl text-yellow-950" />)
      case "collection": return (<FaBoxesStacked className="text-xl text-yellow-900" />)
      case "podcast": return (<FaPodcast className="text-xl text-purple-600" />)
      case "other": return (<FaPaperclip className="text-xl text-blue-900" />)
      default: return <FaPaperclip className="text-blue-900" />
    }
  })()

  return Icon
}
