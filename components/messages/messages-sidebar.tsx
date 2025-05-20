"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users, UserPlus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MessagesSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  const conversations = [
    {
      id: "1",
      name: "Field Team Alpha",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FT",
      lastMessage: "Equipment delivery confirmed for tomorrow",
      time: "10:42 AM",
      unread: 3,
      isGroup: true,
      isOnline: true,
      members: 5,
    },
    {
      id: "2",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      lastMessage: "I'll check the site and report back",
      time: "Yesterday",
      unread: 0,
      isGroup: false,
      isOnline: true,
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      lastMessage: "The inspection is scheduled for Friday",
      time: "Yesterday",
      unread: 1,
      isGroup: false,
      isOnline: false,
    },
    {
      id: "4",
      name: "Maintenance Crew",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
      lastMessage: "We need additional parts for the repair",
      time: "Monday",
      unread: 0,
      isGroup: true,
      isOnline: false,
      members: 8,
    },
    {
      id: "5",
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MW",
      lastMessage: "Can you approve the timesheet?",
      time: "Monday",
      unread: 0,
      isGroup: false,
      isOnline: true,
    },
    {
      id: "6",
      name: "Project Managers",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PM",
      lastMessage: "Let's discuss the timeline changes",
      time: "Last week",
      unread: 0,
      isGroup: true,
      isOnline: false,
      members: 4,
    },
    {
      id: "7",
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EC",
      lastMessage: "Invoice #1234 has been processed",
      time: "Last week",
      unread: 0,
      isGroup: false,
      isOnline: false,
    },
    {
      id: "8",
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
      lastMessage: "The new equipment is working great",
      time: "05/10/2025",
      unread: 0,
      isGroup: false,
      isOnline: false,
    },
  ]

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full md:w-80 lg:w-96 border-r flex flex-col h-full">
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center mb-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-1 mt-2">
                {filteredConversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className={`w-full justify-start px-2 py-3 h-auto ${conversation.id === "1" ? "bg-accent" : ""}`}
                  >
                    <div className="flex items-start w-full">
                      <div className="relative mr-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium truncate">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center">
                            {conversation.isGroup && (
                              <Badge variant="outline" className="mr-1 px-1">
                                <Users className="h-3 w-3 mr-1" />
                                {conversation.members}
                              </Badge>
                            )}
                            {conversation.unread > 0 && (
                              <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="unread">
              <div className="space-y-1 mt-2">
                {filteredConversations
                  .filter((conversation) => conversation.unread > 0)
                  .map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant="ghost"
                      className={`w-full justify-start px-2 py-3 h-auto ${conversation.id === "1" ? "bg-accent" : ""}`}
                    >
                      <div className="flex items-start w-full">
                        <div className="relative mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>{conversation.initials}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium truncate">{conversation.name}</p>
                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                            <div className="flex items-center">
                              {conversation.isGroup && (
                                <Badge variant="outline" className="mr-1 px-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  {conversation.members}
                                </Badge>
                              )}
                              {conversation.unread > 0 && (
                                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <Button className="w-full gap-2">
          <UserPlus className="h-4 w-4" />
          New Conversation
        </Button>
      </div>
    </div>
  )
}
