'use client';

import { usePathname } from 'next/navigation';
import { Building2, Briefcase, Wrench, CircleDollarSign, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { name: 'Company Info', href: '/tool/company-info', icon: Building2 },
  { name: 'Industry', href: '/tool/industry', icon: Briefcase },
  { name: 'Services', href: '/tool/services', icon: Wrench },
  { name: 'Pricing', href: '/tool/pricing', icon: CircleDollarSign },
  { name: 'Proposal', href: '/tool/proposal', icon: FileText },
];

export default function ToolStepper() {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex(step => pathname.startsWith(step.href));

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn('relative', stepIdx !== steps.length - 1 ? 'flex-1' : '')}>
            <>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={cn("h-0.5 w-full", (stepIdx < currentStepIndex) ? 'bg-primary' : 'bg-border')} />
              </div>
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full"
              >
                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", 
                    (stepIdx <= currentStepIndex) ? 'bg-primary' : 'bg-card border-2'
                )}>
                    <step.icon
                        className={cn("h-5 w-5", (stepIdx <= currentStepIndex) ? 'text-primary-foreground' : 'text-muted-foreground')}
                        aria-hidden="true"
                    />
                </div>
                <span className={cn("absolute top-10 text-xs text-center w-24", 
                    stepIdx <= currentStepIndex ? "font-semibold text-primary" : "text-muted-foreground"
                )}>
                    {step.name}
                </span>
              </div>
            </>
          </li>
        ))}
      </ol>
    </nav>
  );
}
