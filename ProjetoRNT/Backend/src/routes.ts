import { Router, Request, Response } from "express";
import { supabase } from "./supabase";
import { verifyUser } from "./middleware/auth";

const router = Router();

/* =====================================================
   Middleware de autenticação aplicado às rotas /usuarios
===================================================== */
router.use("/usuarios", verifyUser);

/* =====================================================
   GET - Listar usuários
===================================================== */
router.get("/usuarios", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });

  } catch {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/* =====================================================
   POST - Criar usuário
===================================================== */
router.post("/usuarios", async (req: Request, res: Response) => {
  try {
    const { nome, email, idade } = req.body;

    if (!nome || !email || typeof idade !== "number") {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, email, idade }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ data });

  } catch {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/* =====================================================
   PUT - Atualizar usuário
===================================================== */
router.put("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, idade } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (!nome || !email || typeof idade !== "number") {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { data, error } = await supabase
      .from("usuarios")
      .update({ nome, email, idade })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ data });

  } catch {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/* =====================================================
   DELETE - Remover usuário
===================================================== */
router.delete("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(204);

  } catch {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;