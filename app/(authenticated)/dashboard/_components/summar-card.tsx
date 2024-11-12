import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  size?: "sm" | "lg";
}

const SummaryCard = ({
  title,
  amount,
  icon,
  size = "sm",
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "lg" ? "bg-white bg-opacity-10" : ""}`}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-muted-foreground" : "text-white opacity-70",
          )}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`font-bold ${size === "sm" ? "text-2xl" : "text-4xl"}`}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(amount))}
        </p>
        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
