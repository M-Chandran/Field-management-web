"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Paperclip,
  ImageIcon,
  Smile,
  Send,
  Users,
  MapPin,
  FileText,
  Calendar,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MessagesContent() {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the server here
      setMessage("")
      // After sending, scroll to the bottom to show the new message
      setTimeout(scrollToBottom, 100)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const messages = [
    {
      id: "1",
      sender: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      content: "Good morning team! We need to discuss the equipment delivery for the North Site project.",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      content: "I've confirmed with the supplier. They'll deliver tomorrow between 9-11 AM.",
      time: "10:18 AM",
      isMe: false,
    },
    {
      id: "3",
      sender: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content: "Great! Do we have the inventory list ready?",
      time: "10:20 AM",
      isMe: true,
    },
    {
      id: "4",
      sender: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      content: "Yes, I've attached the inventory list. Please review and let me know if anything is missing.",
      time: "10:22 AM",
      isMe: false,
      attachment: {
        type: "document",
        name: "North_Site_Inventory.pdf",
        size: "1.2 MB",
      },
    },
    {
      id: "5",
      sender: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EC",
      },
      content: "I've also scheduled the inspection for Friday at 2 PM. Can everyone make it?",
      time: "10:25 AM",
      isMe: false,
    },
    {
      id: "6",
      sender: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content: "Friday at 2 PM works for me. I'll bring the inspection checklist.",
      time: "10:28 AM",
      isMe: true,
    },
    {
      id: "7",
      sender: {
        name: "Robert Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RT",
      },
      content: "I'll be at the South Site on Friday, but I can join remotely if needed.",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: "8",
      sender: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      content: "Here's the location for the delivery. Please make sure someone is there to receive the equipment.",
      time: "10:32 AM",
      isMe: false,
      attachment: {
        type: "location",
        name: "North Site Location",
        address: "123 Main St, Building A",
      },
    },
    {
      id: "9",
      sender: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      content:
        "I've also scheduled a team meeting for tomorrow at 4 PM to discuss the installation plan. Please add it to your calendars.",
      time: "10:35 AM",
      isMe: false,
      attachment: {
        type: "calendar",
        name: "Team Meeting",
        date: "May 21, 2025",
        time: "4:00 PM - 5:00 PM",
      },
    },
    {
      id: "10",
      sender: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content: "Perfect! I'll make sure everything is ready for tomorrow's delivery and meeting.",
      time: "10:42 AM",
      isMe: true,
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Field Team Alpha" />
              <AvatarFallback>FT</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">Field Team Alpha</h2>
              <Badge variant="outline" className="px-1">
                <Users className="h-3 w-3 mr-1" />5
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Group Info</DropdownMenuItem>
              <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            Today, May 20, 2025
          </Badge>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} mb-4`}>
            {!msg.isMe && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} alt={msg.sender.name} />
                <AvatarFallback>{msg.sender.initials}</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[70%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
              {!msg.isMe && <p className="text-xs text-muted-foreground mb-1">{msg.sender.name}</p>}
              <div className={`rounded-lg p-3 ${msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <p className="text-sm">{msg.content}</p>
                {msg.attachment && (
                  <div className="mt-2 p-2 rounded bg-background/10 flex items-center gap-2">
                    {msg.attachment.type === "document" && <FileText className="h-4 w-4" />}
                    {msg.attachment.type === "location" && <MapPin className="h-4 w-4" />}
                    {msg.attachment.type === "calendar" && <Calendar className="h-4 w-4" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{msg.attachment.name}</p>
                      {msg.attachment.type === "document" && (
                        <p className="text-xs opacity-70">{msg.attachment.size}</p>
                      )}
                      {msg.attachment.type === "location" && (
                        <p className="text-xs opacity-70">{msg.attachment.address}</p>
                      )}
                      {msg.attachment.type === "calendar" && (
                        <div>
                          <p className="text-xs opacity-70">{msg.attachment.date}</p>
                          <p className="text-xs opacity-70">{msg.attachment.time}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mt-1">
                <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-10 py-6"
              multiline="true"
            />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
