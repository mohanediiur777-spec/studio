import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StepContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}

export default function StepContainer({ title, description, children, headerContent }: StepContainerProps) {
  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {headerContent}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
