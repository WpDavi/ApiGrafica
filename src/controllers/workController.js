const { Work } = require("../db");

function normalizeWork(work) {
  return {
    id: work._id,
    status: work.status,
    name: work.name,
    fone: work.fone,
    designer: work.designer,
    startDate: work.startDate,
    endDate: work.endDate,
    amount: work.amount,
    materialType: work.materialType,
    finish: work.finish,
    description: work.description,
    serviceType: work.serviceType,
    measure: work.measure,
    amount2: work.amount2,
    materialType2: work.materialType2,
    finish2: work.finish2,
    description2: work.description2,
    serviceType2: work.serviceType2,
    measure2: work.measure2,
    amount3: work.amount3,
    materialType3: work.materialType3,
    finish3: work.finish3,
    description3: work.description3,
    serviceType3: work.serviceType3,
    measure3: work.measure3,
    amount4: work.amount4,
    materialType4: work.materialType4,
    finish4: work.finish4,
    description4: work.description4,
    serviceType4: work.serviceType4,
    measure4: work.measure4,
    amount5: work.amount5,
    materialType5: work.materialType5,
    finish5: work.finish5,
    description5: work.description5,
    serviceType5: work.serviceType5,
    measure5: work.measure5,
    amount6: work.amount6,
    materialType6: work.materialType6,
    finish6: work.finish6,
    description6: work.description6,
    serviceType6: work.serviceType6,
    measure6: work.measure6,
    amount7: work.amount7,
    materialType7: work.materialType7,
    finish7: work.finish7,
    description7: work.description7,
    serviceType7: work.serviceType7,
    measure7: work.measure7,
    entryServiceValue: work.entryServiceValue,
    serviceValue: work.serviceValue,
    delyveryForecast: work.delyveryForecast,
    image: work.image,
    created_at: work.createdAt,
    updated_at: work.updatedAt,
  };
}

async function listWork(_req, res) {
  try {
    const workItems = await Work.find().sort({ createdAt: -1 }).lean();
    const normalized = workItems.map(normalizeWork);

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

    res.json(normalizeWork(work));
  } catch (error) {
    console.error("Erro ao buscar trabalho", error);
    res.status(500).json({ message: "Erro interno ao buscar trabalho" });
  }
}

async function createWork(req, res) {
  const {
    status,
    name,
    fone,
    designer,
    startDate,
    endDate,
    amount,
    amount2,
    amount3,
    amount4,
    amount5,
    amount6,
    amount7,
    materialType,
    materialType2,
    materialType3,
    materialType4,
    materialType5,
    materialType6,
    materialType7,
    finish,
    finish2,
    finish3,
    finish4,
    finish5,
    finish6,
    finish7,
    description,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    serviceType,
    serviceType2,
    serviceType3,
    serviceType4,
    serviceType5,
    serviceType6,
    serviceType7,
    measure,
    measure2,
    measure3,
    measure4,
    measure5,
    measure6,
    measure7,
    entryServiceValue,
    serviceValue,
    delyveryForecast,
    image,
  } = req.body;

  if (!status || !name || !fone || amount === undefined) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios: status, name, fone e amount" });
  }

  try {
    const work = await Work.create({
      status,
      name,
      fone,
      designer,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      amount: amount,
      amount2: amount2 == undefined,
      amount3: amount3 == undefined,
      amount4: amount4 == undefined,
      amount5: amount5 == undefined,
      amount6: amount6 == undefined,
      amount7: amount7 == undefined,
      materialType: materialType || undefined,
      materialType2: materialType2 || undefined,
      materialType3: materialType3 || undefined,
      materialType4: materialType4 || undefined,
      materialType5: materialType5 || undefined,
      materialType6: materialType6 || undefined,
      materialType7: materialType7 || undefined,
      finish: finish || undefined,
      finish2: finish2 || undefined,
      finish3: finish3 || undefined,
      finish4: finish4 || undefined,
      finish5: finish5 || undefined,
      finish6: finish6 || undefined,
      finish7: finish7 || undefined,
      description: description || undefined,
      description2: description2 || undefined,
      description3: description3 || undefined,
      description4: description4 || undefined,
      description5: description5 || undefined,
      description6: description6 || undefined,
      description7: description7 || undefined,
      serviceType: serviceType || undefined,
      serviceType2: serviceType2 || undefined,
      serviceType3: serviceType3 || undefined,
      serviceType4: serviceType4 || undefined,
      serviceType5: serviceType5 || undefined,
      serviceType6: serviceType6 || undefined,
      serviceType7: serviceType7 || undefined,
      measure: measure,
      measure2: measure2,
      measure3: measure3,
      measure4: measure4,
      measure5: measure5,
      measure6: measure6,
      measure7: measure7,
      entryServiceValue: entryServiceValue || undefined,
      serviceValue: serviceValue || undefined,
      delyveryForecast: delyveryForecast || undefined,
      image: image || undefined,
    });
    console.log("work criado");

    res.status(201).json(normalizeWork(work));
  } catch (error) {
    console.error("Erro ao criar trabalho", error);
    res.status(500).json({ message: "Erro interno ao criar trabalho" });
  }
}

async function updateWork(req, res) {
  const {
    status,
    name,
    fone,
    designer,
    startDate,
    endDate,
    amount,
    amount2,
    amount3,
    amount4,
    amount5,
    amount6,
    amount7,
    materialType,
    materialType2,
    materialType3,
    materialType4,
    materialType5,
    materialType6,
    materialType7,
    finish,
    finish2,
    finish3,
    finish4,
    finish5,
    finish6,
    finish7,
    description,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    serviceType,
    serviceType2,
    serviceType3,
    serviceType4,
    serviceType5,
    serviceType6,
    serviceType7,
    measure,
    measure2,
    measure3,
    measure4,
    measure5,
    measure6,
    measure7,
    entryServiceValue,
    serviceValue,
    delyveryForecast,
    image,
  } = req.body;

  if (
    !status &&
    !name &&
    fone === undefined &&
    designer === undefined &&
    startDate === undefined &&
    endDate === undefined &&
    amount === undefined &&
    amount2 === undefined &&
    amount3 === undefined &&
    amount4 === undefined &&
    amount5 === undefined &&
    amount6 === undefined &&
    amount7 === undefined &&
    materialType === undefined &&
    materialType2 === undefined &&
    materialType3 === undefined &&
    materialType4 === undefined &&
    materialType5 === undefined &&
    materialType6 === undefined &&
    materialType7 === undefined &&
    finish === undefined &&
    finish2 === undefined &&
    finish3 === undefined &&
    finish4 === undefined &&
    finish5 === undefined &&
    finish6 === undefined &&
    finish7 === undefined &&
    description === undefined &&
    description2 === undefined &&
    description3 === undefined &&
    description4 === undefined &&
    description5 === undefined &&
    description6 === undefined &&
    description7 === undefined &&
    serviceType === undefined &&
    serviceType2 === undefined &&
    serviceType3 === undefined &&
    serviceType4 === undefined &&
    serviceType5 === undefined &&
    serviceType6 === undefined &&
    serviceType7 === undefined &&
    measure === undefined &&
    measure2 === undefined &&
    measure3 === undefined &&
    measure4 === undefined &&
    measure5 === undefined &&
    measure6 === undefined &&
    measure7 === undefined &&
    entryServiceValue === undefined &&
    serviceValue === undefined &&
    delyveryForecast === undefined &&
    image === undefined
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
        ...(fone !== undefined ? { fone } : {}),
        ...(designer !== undefined ? { designer } : {}),
        ...(startDate !== undefined
          ? { startDate: startDate ? new Date(startDate) : null }
          : {}),
        ...(endDate !== undefined
          ? { endDate: endDate ? new Date(endDate) : null }
          : {}),
        ...(amount !== undefined ? { amount: Number(amount) } : {}),
        ...(amount2 !== undefined ? { amount2: Number(amount2) } : {}),
        ...(amount3 !== undefined ? { amount3: Number(amount3) } : {}),
        ...(amount4 !== undefined ? { amount4: Number(amount4) } : {}),
        ...(amount5 !== undefined ? { amount5: Number(amount5) } : {}),
        ...(amount6 !== undefined ? { amount6: Number(amount6) } : {}),
        ...(amount7 !== undefined ? { amount7: Number(amount7) } : {}),
        ...(materialType !== undefined ? { materialType } : {}),
        ...(materialType2 !== undefined ? { materialType2 } : {}),
        ...(materialType3 !== undefined ? { materialType3 } : {}),
        ...(materialType4 !== undefined ? { materialType4 } : {}),
        ...(materialType5 !== undefined ? { materialType5 } : {}),
        ...(materialType6 !== undefined ? { materialType6 } : {}),
        ...(materialType7 !== undefined ? { materialType7 } : {}),
        ...(finish !== undefined ? { finish } : {}),
        ...(finish2 !== undefined ? { finish2 } : {}),
        ...(finish3 !== undefined ? { finish3 } : {}),
        ...(finish4 !== undefined ? { finish4 } : {}),
        ...(finish5 !== undefined ? { finish5 } : {}),
        ...(finish6 !== undefined ? { finish6 } : {}),
        ...(finish7 !== undefined ? { finish7 } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(description2 !== undefined ? { description2 } : {}),
        ...(description3 !== undefined ? { description3 } : {}),
        ...(description4 !== undefined ? { description4 } : {}),
        ...(description5 !== undefined ? { description5 } : {}),
        ...(description6 !== undefined ? { description6 } : {}),
        ...(description7 !== undefined ? { description7 } : {}),
        ...(serviceType !== undefined ? { serviceType } : {}),
        ...(serviceType2 !== undefined ? { serviceType2 } : {}),
        ...(serviceType3 !== undefined ? { serviceType3 } : {}),
        ...(serviceType4 !== undefined ? { serviceType4 } : {}),
        ...(serviceType5 !== undefined ? { serviceType5 } : {}),
        ...(serviceType6 !== undefined ? { serviceType6 } : {}),
        ...(serviceType7 !== undefined ? { serviceType7 } : {}),
        ...(measure !== undefined ? { measure } : {}),
        ...(measure2 !== undefined ? { measure2 } : {}),
        ...(measure3 !== undefined ? { measure3 } : {}),
        ...(measure4 !== undefined ? { measure4 } : {}),
        ...(measure5 !== undefined ? { measure5 } : {}),
        ...(measure6 !== undefined ? { measure6 } : {}),
        ...(measure7 !== undefined ? { measure7 } : {}),
        ...(entryServiceValue !== undefined ? { entryServiceValue } : {}),
        ...(serviceValue !== undefined ? { serviceValue } : {}),
        ...(delyveryForecast !== undefined ? { delyveryForecast } : {}),
        ...(image !== undefined ? { image } : {}),
      },
      { new: true, runValidators: true }
    ).lean();

    res.json(normalizeWork(updated));
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
