"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transactions } from "@prisma/client";
import TransactionTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { TRANSACTION_PAYMENT_METHOD_MAP } from "@/app/_constants/transaction";
import { TRANSACTION_CATEGORY_MAP } from "@/app/_constants/transaction";

export const transactionsColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge transaction={transaction} />;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      return <p>{TRANSACTION_CATEGORY_MAP[transaction.category] || "Outro"}</p>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) => {
      return (
        <p>
          {TRANSACTION_PAYMENT_METHOD_MAP[transaction.paymentMethod] || "Outro"}
        </p>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return (
        <p className="text-muted">
          {new Date(transaction.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount));
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <EditIcon size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <TrashIcon size={16} />
          </Button>
        </div>
      );
    },
  },
];
