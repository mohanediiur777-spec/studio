import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StepContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function StepContainer({ title, description, children }: StepContainerProps) {
  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
