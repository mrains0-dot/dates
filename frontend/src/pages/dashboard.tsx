import { useGetStats, useListUpcomingDatePlans } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePlanCard } from "@/components/date-plan-card";
import { Heart, CalendarHeart, History, ListTodo } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: upcomingPlans, isLoading: plansLoading } = useListUpcomingDatePlans({ limit: 3 });

  if (statsLoading || plansLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-muted rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-muted rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">Our Planning Space</h1>
        <p className="text-muted-foreground">Dreaming up our next perfect moment together.</p>
      </div>

      {stats?.nextDate && (
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-lg">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
            <Heart className="w-64 h-64 fill-current" />
          </div>
          <div className="relative z-10">
            <span className="uppercase tracking-wider text-sm font-semibold opacity-80 mb-2 block">Next Up</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">{stats.nextDate.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 mt-6">
              <div className="bg-black/10 px-4 py-2 rounded-lg backdrop-blur-sm font-medium">
                {format(new Date(stats.nextDate.scheduledAt), "EEEE, MMMM do")}
              </div>
              <div className="bg-black/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                {format(new Date(stats.nextDate.scheduledAt), "h:mm a")}
              </div>
              {stats.nextDate.location && (
                <div className="bg-black/10 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                  <span>📍 {stats.nextDate.location}</span>
                </div>
              )}
            </div>
            <div className="mt-8">
              <Link href={`/plans/${stats.nextDate.id}`}>
                <Button variant="secondary" size="lg" className="shadow-sm font-medium">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Dates</CardTitle>
            <History className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-foreground">{stats?.totalPlans || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            <CalendarHeart className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-foreground">{stats?.upcomingPlans || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <Heart className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-foreground">{stats?.completedPlans || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
            <ListTodo className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-bold text-foreground">{stats?.totalActivities || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-foreground">Upcoming Plans</h2>
          <Link href="/plans" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        {upcomingPlans && upcomingPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingPlans.map((plan) => (
              <DatePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-xl border border-border/50">
            <CalendarHeart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No upcoming dates</h3>
            <p className="text-muted-foreground mb-6">Time to plan something special together.</p>
            <Link href="/plans/new">
              <Button>Create a Date Plan</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
