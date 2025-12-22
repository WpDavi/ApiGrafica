const { Work } = require("../db");

async function listWork(_req, res) {
  try {
    const workItems = await Work.find().sort({ createdAt: -1 }).lean();
    const normalized = workItems.map((work) => ({
      id: work._id,
      status: work.status,
      name: work.name,
      startDate: work.startDate,
      endDate: work.endDate,
      amount: work.amount,
      materialType: work.materialType,
      finish: work.finish,
      description: work.description,
      created_at: work.createdAt,
      updated_at: work.updatedAt,
    }));

    res.json(normalized);
  } catch (error) {
    console.error("Erro ao listar trabalhos", error);
    res.status(500).json({ message: "Erro interno ao buscar trabalhos" });
  }
}

async function getWork(req, res) {
  try {
    const work = await Work.findById(req.params.id).lean();

    if (!work) {
      return res.status(404).json({ message: "Trabalho não encontrado" });
    }

    res.json({
      id: work._id,
      status: work.status,
      name: work.name,
      startDate: work.startDate,
      endDate: work.endDate,
      amount: work.amount,
      materialType: work.materialType,
      finish: work.finish,
      description: work.description,
      created_at: work.createdAt,
      updated_at: work.updatedAt,
    });
  } catch (error) {
    console.error("Erro ao buscar trabalho", error);
    res.status(500).json({ message: "Erro interno ao buscar trabalho" });
  }
}

async function createWork(req, res) {
  const {
    status,
    name,
    startDate,
    endDate,
    amount,
    materialType,
    finish,
    description,
  } = req.body;

  if (!status || !name || amount === undefined) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios: status, name e amount" });
  }

  try {
    const work = await Work.create({
      status,
      name,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      amount: Number(amount),
      materialType: materialType || undefined,
      finish: finish || undefined,
      description: description || undefined,
    });
    console.log("work criado");

    res.status(201).json({
      id: work._id,
      status: work.status,
      name: work.name,
      startDate: work.startDate,
      endDate: work.endDate,
      amount: work.amount,
      materialType: work.materialType,
      finish: work.finish,
      description: work.description,
      created_at: work.createdAt,
      updated_at: work.updatedAt,
    });
  } catch (error) {
    console.error("Erro ao criar trabalho", error);
    res.status(500).json({ message: "Erro interno ao criar trabalho" });
  }
}

async function updateWork(req, res) {
  const {
    status,
    name,
    startDate,
    endDate,
    amount,
    materialType,
    finish,
    description,
  } = req.body;

  if (
    !status &&
    !name &&
    startDate === undefined &&
    endDate === undefined &&
    amount === undefined &&
    materialType === undefined &&
    finish === undefined &&
    description === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Informe ao menos um campo para atualização" });
  }

  try {
    const existing = await Work.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Trabalho não encontrado" });
    }

    const updated = await Work.findByIdAndUpdate(
      req.params.id,
      {
        ...(status !== undefined ? { status } : {}),
        ...(name !== undefined ? { name } : {}),
        ...(startDate !== undefined
          ? { startDate: startDate ? new Date(startDate) : null }
          : {}),
        ...(endDate !== undefined
          ? { endDate: endDate ? new Date(endDate) : null }
          : {}),
        ...(amount !== undefined ? { amount: Number(amount) } : {}),
        ...(materialType !== undefined ? { materialType } : {}),
        ...(finish !== undefined ? { finish } : {}),
        ...(description !== undefined ? { description } : {}),
      },
      { new: true, runValidators: true }
    ).lean();

    res.json({
      id: updated._id,
      status: updated.status,
      name: updated.name,
      startDate: updated.startDate,
      endDate: updated.endDate,
      amount: updated.amount,
      materialType: updated.materialType,
      finish: updated.finish,
      description: updated.description,
      created_at: updated.createdAt,
      updated_at: updated.updatedAt,
    });
  } catch (error) {
    console.error("Erro ao atualizar trabalho", error);
    res.status(500).json({ message: "Erro interno ao atualizar trabalho" });
  }
}

async function deleteWork(req, res) {
  try {
    const result = await Work.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Trabalho não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover trabalho", error);
    res.status(500).json({ message: "Erro interno ao remover trabalho" });
  }
}

module.exports = {
  listWork,
  getWork,
  createWork,
  updateWork,
  deleteWork,
};
