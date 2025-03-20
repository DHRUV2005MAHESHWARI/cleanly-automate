
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Bell, Send, Info } from "lucide-react";

const CommunicationPortal = () => {
  const [message, setMessage] = useState("");

  const announcements = [
    { 
      id: 1, 
      title: "New Equipment Training", 
      content: "Training session for the new washing machines will be held on Friday at 9am. All washing specialists must attend.", 
      date: "Oct 12, 2023", 
      author: "John Doe",
      priority: "High"
    },
    { 
      id: 2, 
      title: "Holiday Schedule", 
      content: "Please submit your holiday availability by October 20th so we can prepare the schedule for November.", 
      date: "Oct 10, 2023", 
      author: "John Doe",
      priority: "Medium"
    },
    { 
      id: 3, 
      title: "Customer Satisfaction Survey Results", 
      content: "Great job team! Our customer satisfaction scores have increased by 15% this quarter. Keep up the good work.", 
      date: "Oct 8, 2023", 
      author: "Emily Davis",
      priority: "Normal"
    },
  ];

  const messages = [
    { id: 1, sender: "Jane Smith", content: "Can someone cover my shift tomorrow morning? I have a doctor's appointment.", time: "10:30 AM", avatar: "/placeholder.svg" },
    { id: 2, sender: "You", content: "I can cover your shift, Jane.", time: "10:35 AM", avatar: "/placeholder.svg", own: true },
    { id: 3, sender: "Jane Smith", content: "Thank you so much! I really appreciate it.", time: "10:38 AM", avatar: "/placeholder.svg" },
    { id: 4, sender: "Robert Johnson", content: "Has anyone seen the delivery schedule for tomorrow?", time: "11:15 AM", avatar: "/placeholder.svg" },
    { id: 5, sender: "Michael Brown", content: "I've posted it on the board in the break room.", time: "11:20 AM", avatar: "/placeholder.svg" },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">
            <MessageCircle className="h-4 w-4 mr-2" />
            Team Messages
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Bell className="h-4 w-4 mr-2" />
            Announcements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4 mt-4">
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle>Team Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex ${msg.own ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${msg.own ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-medium text-sm ${msg.own ? 'text-primary-foreground' : ''}`}>
                            {msg.own ? 'You' : msg.sender}
                          </span>
                          <span className={`text-xs ${msg.own ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {msg.time}
                          </span>
                        </div>
                        <p className={`text-sm ${msg.own ? 'text-primary-foreground' : ''}`}>{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center space-x-2">
                <Input 
                  placeholder="Type your message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Recent Announcements</h3>
            <Button size="sm">
              <Bell className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>
          
          <div className="space-y-4">
            {announcements.map(announcement => (
              <Card key={announcement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <Badge variant={
                          announcement.priority === "High" ? "destructive" :
                          announcement.priority === "Medium" ? "default" : "secondary"
                        }>
                          {announcement.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Posted by {announcement.author} on {announcement.date}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    More Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationPortal;
