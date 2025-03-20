
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Calendar, CheckCircle2 } from "lucide-react";

const TrainingCertifications = () => {
  const certifications = [
    { 
      id: 1, 
      name: "John Doe", 
      certifications: [
        { title: "Advanced Fabric Care", date: "2022-05-12", expires: "2024-05-12", status: "Active" },
        { title: "Workplace Safety", date: "2022-02-08", expires: "2024-02-08", status: "Active" },
        { title: "Customer Service Excellence", date: "2021-11-15", expires: "2023-11-15", status: "Expiring Soon" }
      ]
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      certifications: [
        { title: "Eco-Friendly Cleaning Practices", date: "2022-07-20", expires: "2024-07-20", status: "Active" },
        { title: "Stain Removal Specialist", date: "2023-01-10", expires: "2025-01-10", status: "Active" },
        { title: "Workplace Safety", date: "2022-03-15", expires: "2024-03-15", status: "Active" }
      ]
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      certifications: [
        { title: "Industrial Pressing Techniques", date: "2022-04-05", expires: "2024-04-05", status: "Active" },
        { title: "Workplace Safety", date: "2021-09-30", expires: "2023-09-30", status: "Expired" }
      ]
    }
  ];

  const trainingModules = [
    { id: 1, title: "Delicate Fabric Handling", description: "Learn how to handle and clean delicate fabrics", duration: "2 hours", completion: 80 },
    { id: 2, title: "Commercial Laundry Equipment", description: "Operating and maintaining commercial laundry equipment", duration: "4 hours", completion: 100 },
    { id: 3, title: "Stain Removal Techniques", description: "Advanced techniques for removing difficult stains", duration: "3 hours", completion: 60 },
    { id: 4, title: "Eco-Friendly Practices", description: "Implementing environmentally friendly laundry practices", duration: "2 hours", completion: 40 },
    { id: 5, title: "Customer Service Skills", description: "Improving customer service and handling complaints", duration: "2.5 hours", completion: 90 },
  ];

  // Helper function to determine badge variant based on certification status
  const getCertificationBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expiring Soon":
        return "secondary";
      case "Expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Certification</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.flatMap(staff => 
                staff.certifications.map((cert, certIndex) => (
                  <TableRow key={`${staff.id}-${certIndex}`}>
                    {certIndex === 0 && (
                      <TableCell className="font-medium" rowSpan={staff.certifications.length}>
                        {staff.name}
                      </TableCell>
                    )}
                    <TableCell>{cert.title}</TableCell>
                    <TableCell>{new Date(cert.date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(cert.expires).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getCertificationBadgeVariant(cert.status)}>
                        {cert.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map(module => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{module.duration}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="text-sm font-medium">{module.completion}%</span>
                  </div>
                  <Progress value={module.completion} className="h-2" />
                </div>
                <div className="mt-2 flex justify-end">
                  {module.completion === 100 ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
                      In Progress
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingCertifications;
