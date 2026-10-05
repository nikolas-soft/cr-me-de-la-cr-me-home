export interface Cliente {
  id: string;
  nome: string;
  email: string;
  produtoComprado: string;
  valorGasto: number;
  dataCompra: string;
}

const STORAGE_KEY = "clientes_cadastrados";

export function loadClientes(): Cliente[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Cliente[]) : [];
  } catch {
    return [];
  }
}

export function saveClientes(lista: Cliente[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {
    /* ignore */
  }
}

/** Registra uma compra confirmada na loja no histórico do painel admin. */
export function registrarCompraNaAdmin(
  nomeCliente: string,
  emailCliente: string,
  produto: string,
  valor: number,
) {
  const comprasExistentes = loadClientes();
  comprasExistentes.push({
    id: Date.now().toString(),
    nome: nomeCliente,
    email: emailCliente,
    produtoComprado: produto,
    valorGasto: valor,
    dataCompra: new Date().toLocaleDateString("pt-BR"),
  });
  saveClientes(comprasExistentes);
}
