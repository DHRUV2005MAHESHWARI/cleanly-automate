
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Certification, Staff, TrainingModule } from "@/lib/types";
import { toast } from "sonner";

const TrainingCertifications = () => {
  const [certifications, setCertifications] = useState<(Certification & { staff_name: string })[]>([]);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch certifications with staff names
        const { data: certData, error: certError } = await supabase
          .from('certifications')
          .select(`
            *,
            staff:staff_id(name)
          `)
          .order('expires');

        if (certError) throw certError;

        // Format certifications with staff names
        const formattedCerts = certData.map(cert => ({
          ...cert,
          staff_name: cert.staff?.name || 'Unknown'
        }));

        // Fetch training modules
        const { data: trainingData, error: trainingError } = await supabase
          .from('training_modules')
          .select('*')
          .order('id');

        if (trainingError) throw trainingError;

        setCertifications(formattedCerts);
        setTrainingModules(trainingData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load training and certification data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Group certifications by staff member for display
  const groupedCertifications = certifications.reduce((acc, cert) => {
    const staffName = cert.staff_name;
    if (!acc[staffName]) {
      acc[staffName] = [];
    }
    acc[staffName].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

  // Convert the grouped object back to an array for rendering
  const staffCertifications = Object.entries(groupedCertifications).map(([name, certs]) => ({
    name,
    certifications: certs
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Staff Certifications
            {loading && <span className="ml-2 text-sm text-muted-foreground">(Loading...)</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-8 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
                <div className="h-3 w-24 bg-primary/10 rounded"></div>
              </div>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-yellow-500" />
              <p>No certification records found</p>
            </div>
          ) : (
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
                {staffCertifications.flatMap(staff => 
                  staff.certifications.map((cert, certIndex) => (
                    <TableRow key={`${cert.id}-${certIndex}`}>
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
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-8 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
                <div className="h-3 w-24 bg-primary/10 rounded"></div>
              </div>
            </div>
          ) : trainingModules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-yellow-500" />
              <p>No training modules found</p>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingCertifications;
