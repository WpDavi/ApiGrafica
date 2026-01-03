const { Contact } = require("../db");

function normalizeContact(contact) {
  return {
    id: contact._id,
    name: contact.name,
    phone: contact.phone,
    created_at: contact.createdAt,
    updated_at: contact.updatedAt,
  };
}

async function listContacts(_req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json(contacts.map(normalizeContact));
  } catch (error) {
    console.error("Erro ao listar contatos", error);
    res.status(500).json({ message: "Erro interno ao buscar contatos" });
  }
}

async function getContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id).lean();

    if (!contact) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    res.json(normalizeContact(contact));
  } catch (error) {
    console.error("Erro ao buscar contato", error);
    res.status(500).json({ message: "Erro interno ao buscar contato" });
  }
}

async function createContact(req, res) {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Campos obrigatórios: name e phone" });
  }

  try {
    const contact = await Contact.create({ name, phone });
    res.status(201).json(normalizeContact(contact));
  } catch (error) {
    console.error("Erro ao criar contato", error);
    res.status(500).json({ message: "Erro interno ao criar contato" });
  }
}

async function updateContact(req, res) {
  const { name, phone } = req.body;

  if (name === undefined && phone === undefined) {
    return res.status(400).json({ message: "Informe ao menos um campo para atualização" });
  }

  try {
    const existing = await Contact.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
      },
      { new: true, runValidators: true }
    ).lean();

    res.json(normalizeContact(updated));
  } catch (error) {
    console.error("Erro ao atualizar contato", error);
    res.status(500).json({ message: "Erro interno ao atualizar contato" });
  }
}

async function deleteContact(req, res) {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Contato não encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover contato", error);
    res.status(500).json({ message: "Erro interno ao remover contato" });
  }
}

module.exports = {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
