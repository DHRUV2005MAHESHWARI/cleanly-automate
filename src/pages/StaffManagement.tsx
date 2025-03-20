
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Calendar, Clock, Award, FileText, DollarSign, MessageCircle, BarChart } from "lucide-react";
import StaffProfiles from "@/components/staff/StaffProfiles";
import StaffTasks from "@/components/staff/StaffTasks";
import ShiftScheduling from "@/components/staff/ShiftScheduling";
import PerformanceTracking from "@/components/staff/PerformanceTracking";
import TrainingCertifications from "@/components/staff/TrainingCertifications";
import PayrollManagement from "@/components/staff/PayrollManagement";
import CommunicationPortal from "@/components/staff/CommunicationPortal";
import FeedbackReports from "@/components/staff/FeedbackReports";

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">
              Manage staff profiles, tasks, schedules, and performance
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profiles">
            <StaffProfiles searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="tasks">
            <StaffTasks />
          </TabsContent>
          
          <TabsContent value="scheduling">
            <ShiftScheduling />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceTracking />
          </TabsContent>
          
          <TabsContent value="training">
            <TrainingCertifications />
          </TabsContent>
          
          <TabsContent value="payroll">
            <PayrollManagement />
          </TabsContent>
          
          <TabsContent value="communication">
            <CommunicationPortal />
          </TabsContent>
          
          <TabsContent value="feedback">
            <FeedbackReports />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StaffManagement;
