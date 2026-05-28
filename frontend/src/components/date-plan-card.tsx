import { Link } from "wouter";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DatePlan } from "@workspace/api-client-react/src/generated/api.schemas";

interface DatePlanCardProps {
  plan: DatePlan;
}

export function DatePlanCard({ plan }: DatePlanCardProps) {
  const isUpcoming = plan.status === "upcoming";
  const date = new Date(plan.scheduledAt);
  
  return (
    <Link href={`/plans/${plan.id}`}>
      <Card className="h-full hover-elevate transition-all duration-300 cursor-pointer overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-serif text-xl font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {plan.title}
            </h3>
            <Badge 
              variant={isUpcoming ? "default" : "secondary"}
              className={plan.status === "cancelled" ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : ""}
            >
              {plan.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
            {plan.description || "No description provided."}
          </p>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary/60" />
              <span>{format(date, "EEEE, MMMM do, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary/60" />
              <span>{format(date, "h:mm a")}</span>
            </div>
            {plan.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/60" />
                <span className="truncate">{plan.location}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 border-t border-border/40 mt-auto flex justify-between items-center bg-muted/20">
          <div className="text-xs font-medium text-muted-foreground mt-3">
            {plan.activityCount || 0} {(plan.activityCount === 1) ? 'Activity' : 'Activities'}
          </div>
          {plan.budget && (
            <div className="text-xs font-medium text-primary mt-3">
              ${plan.budget.toFixed(0)}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
