"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { addExpense } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";
import type { ExpenseType } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { ExpenseForm, type ExpenseFormData } from "./expense-form";

interface Props {
  type: ExpenseType;
}

export function AddExpenseDialog({ type }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: ExpenseFormData = {
    name: "",
    amount: "",
    date: type === "recurring" ? undefined : new Date(),
    status: type === "recurring" ? "active" : "paid",
    recurrence: type === "recurring" ? "monthly" : "one-time",
  };

  const handleSubmit = async (data: ExpenseFormData) => {
    startTransition(async () => {
      const result = await addExpense(data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Despesa adicionada com sucesso!");
        setIsOpen(false);
      }
    });
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button>
            <Plus size={16} />
            Adicionar despesa
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar despesa</DrawerTitle>
            <DrawerDescription>
              Adiciona uma nova despesa para acompanhar e gerir os teus gastos
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <ExpenseForm
                variant="add"
                type={type}
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="add-expense" loading={isPending}>
                Adicionar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          Adicionar despesa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription>
            Adiciona uma nova despesa para acompanhar e gerir os teus gastos
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          variant="add"
          type={type}
          defaultValues={formDefaultValues}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="add-expense" loading={isPending}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
