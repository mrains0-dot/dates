import { useState } from "react";
import { useListDatePlans } from "@workspace/api-client-react";
import { DatePlanCard } from "@/components/date-plan-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, SearchX } from "lucide-react";
import { Link } from "wouter";

export default function Plans() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const { data: plans, isLoading } = useListDatePlans(
    statusFilter !== "all" ? { status: statusFilter as any } : undefined
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">All Date Plans</h1>
          <p className="text-muted-foreground">Every memory, planned and realized.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Link href="/plans/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Plan</span>
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-muted rounded-xl"></div>
          ))}
        </div>
      ) : plans && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <DatePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50">
          <SearchX className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground mb-2">No plans found</h3>
          <p className="text-muted-foreground mb-6">
            {statusFilter !== "all" 
              ? `There are no ${statusFilter} plans right now.` 
              : "You haven't created any date plans yet."}
          </p>
          {statusFilter === "all" && (
            <Link href="/plans/new">
              <Button>Start Planning</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
