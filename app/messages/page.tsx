import { MessagesHeader } from "@/components/messages/messages-header"
import { MessagesSidebar } from "@/components/messages/messages-sidebar"
import { MessagesContent } from "@/components/messages/messages-content"

export default function Messages() {
  return (
    <div className="flex flex-col h-screen">
      <MessagesHeader />
      <div className="flex flex-1 overflow-hidden">
        <MessagesSidebar />
        <MessagesContent />
      </div>
    </div>
  )
}
