import { useState, useEffect, useRef } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  useGetDatePlan, 
  getGetDatePlanQueryKey,
  useUpdateDatePlan, 
  useDeleteDatePlan,
  useCreateActivity,
  useUpdateActivity,
  useDeleteActivity,
  useCreateProposal,
  useListProposalsForPlan,
  getListProposalsForPlanQueryKey,
  getListDatePlansQueryKey,
  getListUpcomingDatePlansQueryKey,
  getGetStatsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, Clock, Edit2, Plus, Trash2, ArrowLeft, Loader2, DollarSign, GripVertical, CheckCircle2, XCircle, Share2, Copy, Check, Heart, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

function fireHeartConfetti() {
  const heart = confetti.shapeFromText({ text: "❤", scalar: 2 });
  const burst = (origin: { x: number; y: number }) => {
    confetti({
      particleCount: 40,
      spread: 360,
      ticks: 120,
      gravity: 0.6,
      decay: 0.93,
      startVelocity: 28,
      shapes: [heart],
      scalar: 2,
      colors: ["#BE123C", "#E11D48", "#FB7185", "#FECDD3", "#FF1744"],
      origin,
    });
  };
  burst({ x: 0.5, y: 0.4 });
  setTimeout(() => burst({ x: 0.3, y: 0.5 }), 150);
  setTimeout(() => burst({ x: 0.7, y: 0.5 }), 300);
}

const activitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  startTime: z.string().optional(),
  durationMinutes: z.coerce.number().min(1).optional().or(z.literal("").transform(() => undefined)),
  category: z.string().optional(),
  cost: z.coerce.number().min(0).optional().or(z.literal("").transform(() => undefined)),
  sortOrder: z.coerce.number().default(0),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

export default function PlanDetail() {
  const [, params] = useRoute("/plans/:id");
  const [, setLocation] = useLocation();
  const id = params?.id ? parseInt(params.id, 10) : 0;
  
  const queryClient = useQueryClient();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any | null>(null);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [proposalMessage, setProposalMessage] = useState("");
  const [proposalLink, setProposalLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { data: plan, isLoading, error } = useGetDatePlan(id, { 
    query: { enabled: !!id, queryKey: getGetDatePlanQueryKey(id) } 
  });

  const updatePlan = useUpdateDatePlan();
  const deletePlan = useDeleteDatePlan();
  const createActivity = useCreateActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const createProposal = useCreateProposal();

  const { data: proposals } = useListProposalsForPlan(id, {
    query: { enabled: !!id, queryKey: getListProposalsForPlanQueryKey(id) },
  });

  const confettiFired = useRef(false);
  useEffect(() => {
    if (!confettiFired.current && proposals && proposals.some((p) => p.status === "accepted")) {
      confettiFired.current = true;
      setTimeout(fireHeartConfetti, 400);
      setTimeout(fireHeartConfetti, 1000);
    }
  }, [proposals]);

  const activityForm = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      startTime: "",
      durationMinutes: undefined,
      category: "",
      cost: undefined,
      sortOrder: 0,
    },
  });

  const openNewActivity = () => {
    setEditingActivity(null);
    activityForm.reset({
      name: "",
      description: "",
      location: "",
      startTime: "",
      durationMinutes: undefined,
      category: "",
      cost: undefined,
      sortOrder: plan?.activities?.length || 0,
    });
    setIsActivityModalOpen(true);
  };

  const openEditActivity = (activity: any) => {
    setEditingActivity(activity);
    activityForm.reset({
      name: activity.name,
      description: activity.description || "",
      location: activity.location || "",
      startTime: activity.startTime || "",
      durationMinutes: activity.durationMinutes || undefined,
      category: activity.category || "",
      cost: activity.cost || undefined,
      sortOrder: activity.sortOrder,
    });
    setIsActivityModalOpen(true);
  };

  const onActivitySubmit = (data: ActivityFormValues) => {
    if (editingActivity) {
      updateActivity.mutate(
        { id: editingActivity.id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetDatePlanQueryKey(id) });
            setIsActivityModalOpen(false);
            toast({ title: "Activity updated" });
          }
        }
      );
    } else {
      createActivity.mutate(
        { id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetDatePlanQueryKey(id) });
            setIsActivityModalOpen(false);
            toast({ title: "Activity added" });
          }
        }
      );
    }
  };

  const handleDeleteActivity = (activityId: number) => {
    deleteActivity.mutate(
      { id: activityId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetDatePlanQueryKey(id) });
          toast({ title: "Activity removed" });
        }
      }
    );
  };

  const handleDeletePlan = () => {
    deletePlan.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListDatePlansQueryKey() });
          queryClient.invalidateQueries({ queryKey: getListUpcomingDatePlansQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
          toast({ title: "Plan deleted" });
          setLocation("/plans");
        }
      }
    );
  };

  const updateStatus = (status: "upcoming" | "completed" | "cancelled") => {
    updatePlan.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetDatePlanQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListDatePlansQueryKey() });
          queryClient.invalidateQueries({ queryKey: getListUpcomingDatePlansQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
          toast({ title: `Plan marked as ${status}` });
        }
      }
    );
  };

  const handleCreateProposal = () => {
    createProposal.mutate(
      { id, data: { message: proposalMessage || undefined } },
      {
        onSuccess: (data) => {
          const origin = window.location.origin;
          const base = import.meta.env.BASE_URL.replace(/\/$/, "");
          setProposalLink(`${origin}${base}/proposals/${data.token}`);
          setProposalMessage("");
        },
      }
    );
  };

  const handleCopyLink = () => {
    if (!proposalLink) return;
    navigator.clipboard.writeText(proposalLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleProposalClose = () => {
    setIsProposalOpen(false);
    setProposalLink(null);
    setProposalMessage("");
    setCopied(false);
  };

  if (isLoading) return <div className="animate-pulse space-y-6"><div className="h-40 bg-muted rounded-xl"></div><div className="h-64 bg-muted rounded-xl"></div></div>;
  if (error || !plan) return <div className="text-center py-10">Plan not found</div>;

  const date = new Date(plan.scheduledAt);
  const totalCost = plan.activities.reduce((sum, act) => sum + (act.cost || 0), 0);
  const remainingBudget = plan.budget ? plan.budget - totalCost : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/plans">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <Badge 
            variant={plan.status === "upcoming" ? "default" : "secondary"}
            className={plan.status === "cancelled" ? "bg-destructive/10 text-destructive" : "mb-2"}
          >
            {plan.status}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground">{plan.title}</h1>
        </div>
        
        <div className="flex items-center gap-2 hidden md:flex">
          {plan.status === "upcoming" && (
            <Button variant="outline" size="sm" onClick={() => setIsProposalOpen(true)} className="gap-2">
              <Share2 className="w-4 h-4" /> Ask on a Date
            </Button>
          )}
          {plan.status === "upcoming" && (
            <Button variant="outline" size="sm" onClick={() => updateStatus("completed")} className="gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
              <CheckCircle2 className="w-4 h-4" /> Complete
            </Button>
          )}
          {plan.status !== "cancelled" && (
            <Button variant="outline" size="sm" onClick={() => updateStatus("cancelled")} className="gap-2 text-muted-foreground">
              <XCircle className="w-4 h-4" /> Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-border/60">
            <CardHeader>
              <CardTitle>The Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plan.description && (
                <p className="text-foreground leading-relaxed">{plan.description}</p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 border-t border-border/50 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span>{format(date, "EEEE, MMMM do, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{format(date, "h:mm a")}</span>
                </div>
                {plan.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{plan.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif text-foreground">Itinerary</h2>
              <Button size="sm" onClick={openNewActivity} className="gap-2">
                <Plus className="w-4 h-4" /> Add Activity
              </Button>
            </div>

            <div className="space-y-4">
              {plan.activities.length === 0 ? (
                <div className="text-center py-10 bg-card rounded-xl border border-border/50 border-dashed">
                  <p className="text-muted-foreground mb-4">No activities planned yet.</p>
                  <Button variant="outline" onClick={openNewActivity}>Add the first activity</Button>
                </div>
              ) : (
                <div className="relative border-l-2 border-primary/20 ml-3 md:ml-4 space-y-8 pb-4">
                  {plan.activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-6 md:pl-8 group">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7.5px] top-2 ring-4 ring-background"></div>
                      
                      <Card className="border-border/60 hover-elevate transition-all group-hover:border-primary/30">
                        <CardContent className="p-4 md:p-5">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {activity.startTime && (
                                  <span className="text-sm font-medium text-primary">{activity.startTime}</span>
                                )}
                                <h3 className="font-serif text-lg font-medium">{activity.name}</h3>
                              </div>
                              
                              {activity.description && (
                                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                              )}
                              
                              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                                {activity.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {activity.location}
                                  </div>
                                )}
                                {activity.durationMinutes && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {activity.durationMinutes} min
                                  </div>
                                )}
                                {activity.cost ? (
                                  <div className="flex items-center gap-1 text-foreground font-medium">
                                    <DollarSign className="w-3 h-3" /> {activity.cost}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditActivity(activity)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteActivity(activity.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-secondary/30 border-secondary-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif">Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">{plan.budget ? `$${plan.budget}` : 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Estimated Cost</span>
                <span className="font-medium">${totalCost}</span>
              </div>
              
              {plan.budget && (
                <>
                  <div className="w-full bg-background rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${remainingBudget !== null && remainingBudget < 0 ? 'bg-destructive' : 'bg-primary'}`} 
                      style={{ width: `${Math.min((totalCost / plan.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                    <span>{remainingBudget !== null && remainingBudget >= 0 ? `${remainingBudget} remaining` : `${Math.abs(remainingBudget || 0)} over budget`}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {plan.notes && (
            <Card className="bg-accent/30 border-accent-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif">Private Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{plan.notes}</p>
              </CardContent>
            </Card>
          )}

          {proposals && proposals.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <Send className="w-4 h-4 text-primary" />
                  Proposals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {proposals.map((p) => (
                  <div key={p.id} className="text-sm space-y-1.5">
                    <div className="flex items-center gap-2">
                      {p.status === "accepted" && (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5 text-xs font-medium">
                          <Heart className="w-3 h-3 fill-current" /> Accepted
                        </span>
                      )}
                      {p.status === "pending" && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5 text-xs font-medium">
                          <Clock className="w-3 h-3" /> Awaiting reply
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {format(new Date(p.createdAt), "MMM d")}
                      </span>
                    </div>
                    {p.availability && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                        <p className="text-xs text-muted-foreground font-medium mb-0.5">They're free</p>
                        <p className="text-sm text-foreground font-medium">{p.availability}</p>
                      </div>
                    )}
                    {p.message && (
                      <p className="text-xs text-muted-foreground italic">"{p.message}"</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="pt-6 border-t border-border flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive hover:bg-destructive/10 w-full sm:w-auto">
                  Delete Plan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this date plan and all its activities.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePlan} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle font-serif>{editingActivity ? 'Edit Activity' : 'Add Activity'}</DialogTitle>
          </DialogHeader>
          <Form {...activityForm}>
            <form onSubmit={activityForm.handleSubmit(onActivitySubmit)} className="space-y-4 pt-4">
              <FormField
                control={activityForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Dinner at Luigi's" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activityForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details about this step..." className="h-16 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={activityForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={activityForm.control}
                  name="durationMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (min)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="60" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={activityForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Address or place name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={activityForm.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Cost</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
                          <Input type="number" placeholder="0" className="pl-7" {...field} value={field.value ?? ''} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsActivityModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createActivity.isPending || updateActivity.isPending}>
                  {createActivity.isPending || updateActivity.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  {editingActivity ? 'Save Changes' : 'Add Activity'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Proposal dialog */}
      <Dialog open={isProposalOpen} onOpenChange={(open) => { if (!open) handleProposalClose(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Ask on a Date</DialogTitle>
          </DialogHeader>

          {!proposalLink ? (
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Generate a link to share with someone. They can say yes or no to <span className="font-medium text-foreground">{plan.title}</span>.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Personal message (optional)</label>
                <Textarea
                  placeholder="Add a sweet note to go with the invite..."
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
              <DialogFooter className="pt-2">
                <Button variant="outline" onClick={handleProposalClose}>Cancel</Button>
                <Button onClick={handleCreateProposal} disabled={createProposal.isPending} className="gap-2">
                  {createProposal.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                  Generate Link
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Your proposal link</p>
                <p className="text-sm font-mono text-foreground break-all select-all">{proposalLink}</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Share this link with your date. They'll see the plan and can say yes or no.
              </p>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2" onClick={handleCopyLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <Button variant="outline" onClick={handleProposalClose}>Done</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
