"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FormAction = (formData: FormData) => Promise<void>;

interface FormularioDialogProps {
  action: FormAction;
}

export function FormularioDialog({ action }: FormularioDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Novo Livro</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha as informações do livro e responda ao questionário.
          </DialogDescription>
        </DialogHeader>

        {/* 🔥 O segredo está AQUI */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="analise">Análise</TabsTrigger>
          </TabsList>

          <form
            action={async (formData) => {
              await action(formData);
              setOpen(false);
            }}
            className="space-y-4"
          >
            {/* TAB 1 */}
            <TabsContent
              value="info"
              forceMount
              className="space-y-4 data-[state=inactive]:hidden"
            >
              <div>
                <Label htmlFor="titulo">Título do Livro</Label>
                <Input id="titulo" name="titulo" required />
              </div>

              <div>
                <Label htmlFor="autor">Autor</Label>
                <Input id="autor" name="autor" />
              </div>

              <div>
                <Label htmlFor="paginas">Número de Páginas</Label>
                <Input id="paginas" name="paginas" type="number" />
              </div>

              <div>
                <Label htmlFor="editora">Editora</Label>
                <Input id="editora" name="editora" />
              </div>
            </TabsContent>

            {/* TAB 2 */}
            <TabsContent
              value="analise"
              forceMount
              className="space-y-4 data-[state=inactive]:hidden"
            >
              <div>
                <Label htmlFor="descricao_capa">Descreva a capa</Label>
                <Textarea id="descricao_capa" name="descricao_capa" />
              </div>

              <div>
                <Label htmlFor="momento_marcante">Momento marcante</Label>
                <Textarea id="momento_marcante" name="momento_marcante" />
              </div>

              <div>
                <Label htmlFor="analise_critica">Análise crítica</Label>
                <Textarea id="analise_critica" name="analise_critica" />
              </div>

              <div>
                <Label htmlFor="comentario_final">Comentário final</Label>
                <Textarea id="comentario_final" name="comentario_final" />
              </div>
            </TabsContent>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Salvar Livro
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
