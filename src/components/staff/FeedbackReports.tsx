
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Star, Users, BarChart } from "lucide-react";

const FeedbackReports = () => {
  const customerFeedback = [
    { id: 1, customer: "Alex Johnson", message: "Sarah was very professional and my clothes came back perfectly clean. Great service!", date: "Oct 12, 2023", rating: 5, staffMember: "Sarah Williams" },
    { id: 2, customer: "Maria Garcia", message: "John was friendly and helpful. The stain removal was excellent.", date: "Oct 10, 2023", rating: 5, staffMember: "John Doe" },
    { id: 3, customer: "David Lee", message: "Good service but delivery was a bit late.", date: "Oct 8, 2023", rating: 4, staffMember: "Michael Brown" },
    { id: 4, customer: "Lisa Wang", message: "Jane was extremely helpful with my special fabric items. Will definitely return!", date: "Oct 5, 2023", rating: 5, staffMember: "Jane Smith" },
    { id: 5, customer: "James Wilson", message: "Service was okay, but some stains weren't completely removed.", date: "Oct 2, 2023", rating: 3, staffMember: "Robert Johnson" },
  ];

  const staffRatings = [
    { name: "John Doe", image: "/placeholder.svg", rating: 4.8, feedbackCount: 42 },
    { name: "Jane Smith", image: "/placeholder.svg", rating: 4.9, feedbackCount: 38 },
    { name: "Robert Johnson", image: "/placeholder.svg", rating: 4.2, feedbackCount: 25 },
    { name: "Sarah Williams", image: "/placeholder.svg", rating: 4.7, feedbackCount: 35 },
    { name: "Michael Brown", image: "/placeholder.svg", rating: 4.5, feedbackCount: 30 },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Staff Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffRatings.map((staff) => (
                <div key={staff.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={staff.image} alt={staff.name} />
                      <AvatarFallback>{staff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{staff.name}</div>
                      <div className="flex items-center">
                        {renderStars(staff.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({staff.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {staff.feedbackCount} reviews
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              Performance chart would be displayed here
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Recent Customer Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Staff Member</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.customer}</TableCell>
                  <TableCell>{feedback.staffMember}</TableCell>
                  <TableCell>{feedback.message}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(feedback.rating)}
                    </div>
                  </TableCell>
                  <TableCell>{feedback.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackReports;
