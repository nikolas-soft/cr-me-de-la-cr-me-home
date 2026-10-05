import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, Upload, Trash2, Users } from "lucide-react";
import { loadClientes, saveClientes, type Cliente } from "../lib/clientes";
import { formatPrice } from "../data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin — La Crème Bakery" },
      {
        name: "description",
        content: "Gerencie as compras dos clientes da La Crème: cadastro, histórico e exportação.",
      },
      { property: "og:title", content: "Painel Admin — La Crème Bakery" },
      {
        property: "og:description",
        content: "Gerencie as compras dos clientes da La Crème: cadastro, histórico e exportação.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const inputClass =
  "w-full rounded-xl border-2 border-cherry/25 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-cherry focus:outline-none";

function AdminPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mensagem, setMensagem] = useState<{ texto: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    setClientes(loadClientes());
  }, []);

  const salvarListaLocal = (novaLista: Cliente[]) => {
    setClientes(novaLista);
    saveClientes(novaLista);
  };

  const avisar = (texto: string, ok = true) => setMensagem({ texto, ok });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !produto || !valor) {
      avisar("Preencha todos os campos.", false);
      return;
    }
    const novoCliente: Cliente = {
      id: Date.now().toString(),
      nome,
      email,
      produtoComprado: produto,
      valorGasto: parseFloat(valor),
      dataCompra: new Date().toLocaleDateString("pt-BR"),
    };
    salvarListaLocal([...clientes, novoCliente]);
    avisar("Cliente cadastrado com sucesso!");
    setNome("");
    setEmail("");
    setProduto("");
    setValor("");
  };

  const handleExportarTXT = () => {
    if (clientes.length === 0) {
      avisar("Nenhum cliente cadastrado para exportar.", false);
      return;
    }
    const conteudo = JSON.stringify(clientes, null, 2);
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relatorio_clientes.txt";
    link.click();
    URL.revokeObjectURL(url);
    avisar("Arquivo exportado com sucesso!");
  };

  const handleImportarTXT = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const dados = JSON.parse(event.target?.result as string);
        if (Array.isArray(dados)) {
          salvarListaLocal(dados as Cliente[]);
          avisar("Dados importados e restaurados com sucesso!");
        } else {
          avisar("Formato de arquivo inválido.", false);
        }
      } catch {
        avisar("Erro ao ler o arquivo TXT.", false);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleRemover = (id: string) => {
    salvarListaLocal(clientes.filter((c) => c.id !== id));
    avisar("Registro removido.");
  };

  const totalGeral = clientes.reduce((s, c) => s + c.valorGasto, 0);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-10">
      <p className="eyebrow text-muted-foreground">Área restrita</p>
      <h1 className="mt-3 font-display text-4xl text-cherry md:text-5xl">
        Painel do Administrador
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Gerencie as compras dos clientes da La Crème. As compras confirmadas no checkout entram
        aqui automaticamente, e você também pode cadastrar vendas manualmente.
      </p>

      {mensagem && (
        <div
          role="status"
          className={`mt-6 rounded-2xl border-2 px-5 py-3 text-sm ${
            mensagem.ok
              ? "border-cherry/30 bg-cream-deep text-cherry"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      {/* Formulário de cadastro */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-4 rounded-3xl border-2 border-cherry/25 bg-card p-6 shadow-cherry-sm sm:grid-cols-2"
      >
        <h2 className="font-display text-2xl text-cherry sm:col-span-2">Cadastrar venda</h2>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputClass}
          aria-label="Nome do cliente"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          aria-label="E-mail"
        />
        <input
          type="text"
          placeholder="O que comprou?"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          className={inputClass}
          aria-label="Produto comprado"
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Quanto gastou (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={inputClass}
          aria-label="Valor gasto"
        />
        <button
          type="submit"
          className="rounded-full bg-cherry px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-90 sm:col-span-2"
        >
          Cadastrar cliente
        </button>
      </form>

      {/* Ações de arquivo */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleExportarTXT}
          className="inline-flex items-center gap-2 rounded-full border-2 border-cherry px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cherry transition-colors hover:bg-cherry hover:text-background"
        >
          <Download className="h-4 w-4" />
          Exportar TXT
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border-2 border-cherry px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cherry transition-colors hover:bg-cherry hover:text-background"
        >
          <Upload className="h-4 w-4" />
          Importar TXT
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".txt"
          onChange={handleImportarTXT}
          className="hidden"
          aria-label="Importar arquivo TXT"
        />
        <span className="ml-auto inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {clientes.length} registro{clientes.length === 1 ? "" : "s"} · Total{" "}
          {formatPrice(totalGeral)}
        </span>
      </div>

      {/* Tabela de clientes */}
      <div className="mt-6 overflow-x-auto rounded-3xl border-2 border-cherry/25 bg-card shadow-cherry-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-cherry text-left text-background">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium" aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Nenhum cliente registrado ainda.
                </td>
              </tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.id} className="border-t border-cherry/15">
                  <td className="px-4 py-3 font-medium text-foreground">{c.nome}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.produtoComprado}</td>
                  <td className="px-4 py-3 text-foreground">{formatPrice(c.valorGasto)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.dataCompra}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemover(c.id)}
                      aria-label={`Remover ${c.nome}`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
