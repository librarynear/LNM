import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidV4 } from 'uuid';
// Define type for individual plan
export interface LibraryPlan {
  id: string;
  hours: string;
  monthlyFee: string;
  planType: string;
  description: string;
}

// Props type for the component
interface LibraryPlansManagerProps {
  plans: LibraryPlan[];
  setPlans: React.Dispatch<React.SetStateAction<LibraryPlan[]>>;
}

// This will replace your current fee section
const LibraryPlansManager: React.FC<LibraryPlansManagerProps> = ({ plans, setPlans }) => {
  // Plan types
  const planTypes: string[] = ["Any Time", "Fixed Seat", "Time Slot"];

  // Add a new plan
  const addPlan = (): void => {
    setPlans([
      ...plans,
      {
        id: uuidV4(), // Unique ID for each plan
        hours: '',
        monthlyFee: '',
        planType: 'Any Time',
        description: ''
      }
    ]);
  };

  // Remove a plan by ID
  const removePlan = (planId: string): void => {
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  // Update plan properties
  const updatePlan = (planId: string, field: keyof LibraryPlan, value: string): void => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, [field]: value } : plan
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">Library Fee Plans</Label>
        <Button 
          type="button" 
          onClick={addPlan} 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <PlusCircle size={16} />
          Add Plan
        </Button>
      </div>

      {/* Container for all plans */}
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div key={plan.id} className="p-4 border rounded-md bg-gray-50 relative">
            {/* Plan header with number and delete button */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Plan {index + 1}</h4>
              {index > 1 && ( // Only allow deletion of plans beyond the mandatory first two
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removePlan(plan.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
            
            {/* Plan inputs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="mb-2 block">Hours</Label>
                <Input
                  type="number"
                  placeholder="e.g., 6, 12, 24"
                  className="w-full"
                  value={plan.hours}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlan(plan.id, 'hours', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Monthly Fee (₹)</Label>
                <Input
                  type="number"
                  placeholder="Enter Fee"
                  className="w-full"
                  value={plan.monthlyFee}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlan(plan.id, 'monthlyFee', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Plan Type</Label>
                <Select 
                  value={plan.planType} 
                  onValueChange={(value: string) => updatePlan(plan.id, 'planType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {planTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">Description</Label>
                <Input
                  placeholder="Short plan description"
                  className="w-full"
                  value={plan.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlan(plan.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPlansManager;