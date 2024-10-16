import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { BookOpen, TrendingUp, Calculator, FileText, Users, Award, Play, ChevronDown, ChevronUp, Wallet, PieChart, Zap, HelpCircle, Vote, BarChart2, ShieldCheck, Bookmark, Video, Target } from 'lucide-react';

export default function LearningDashboard({ user }) {
  // New content for the learning dashboard
  const learningDashboardContent = {
    personalizedPath: {
      title: "Your Learning Path",
      progress: 35,
      nextCourse: "Understanding Risk Management",
    },
    recentActivity: [
      { title: "Completed: Budgeting Basics", date: "2023-05-20" },
      { title: "Started: Investment Types", date: "2023-05-18" },
      { title: "Earned Badge: Savings Master", date: "2023-05-15" },
    ],
    recommendedCourses: [
      { title: "Emergency Fund Essentials", duration: "30 mins" },
      { title: "Introduction to Stock Market", duration: "45 mins" },
      { title: "Cryptocurrency 101", duration: "1 hour" },
    ],
    upcomingWebinars: [
      { title: "Mastering Compound Interest", date: "2023-06-01", time: "2:00 PM EST" },
      { title: "Advanced Portfolio Diversification", date: "2023-06-05", time: "3:30 PM EST" },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-2"></h1>
      <p className="text-xl mb-8 text-muted-foreground"></p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personalized Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              {learningDashboardContent.personalizedPath.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={learningDashboardContent.personalizedPath.progress} className="mb-4" />
            <p>Next course: {learningDashboardContent.personalizedPath.nextCourse}</p>
          </CardContent>
          <CardFooter>
            <Button>Continue Learning</Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-6 w-6" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {learningDashboardContent.recentActivity.map((activity, index) => (
                <li key={index} className="flex justify-between">
                  <span>{activity.title}</span>
                  <span className="text-muted-foreground">{activity.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Recommended Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {learningDashboardContent.recommendedCourses.map((course, index) => (
                <li key={index} className="flex justify-between">
                  <span>{course.title}</span>
                  <span className="text-muted-foreground">{course.duration}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Courses</Button>
          </CardFooter>
        </Card>

        {/* Upcoming Webinars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              Upcoming Webinars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {learningDashboardContent.upcomingWebinars.map((webinar, index) => (
                <li key={index}>
                  <p>{webinar.title}</p>
                  <p className="text-sm text-muted-foreground">{webinar.date} at {webinar.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Webinars</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Additional sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Financial Calculators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access our suite of financial calculators to plan your future.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Open Calculators</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Financial Glossary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore and learn financial terms to boost your knowledge.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Glossary</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Community Forum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Join discussions and learn from peers in our community forum.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Visit Forum</Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}