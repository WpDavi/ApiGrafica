const { Product } = require('../db');

async function listProducts(_req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    const normalized = products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      created_at: product.createdAt,
      updated_at: product.updatedAt
    }));

    res.json(normalized);
  } catch (error) {
    console.error('Erro ao listar produtos', error);
    res.status(500).json({ message: 'Erro interno ao buscar produtos' });
  }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      created_at: product.createdAt,
      updated_at: product.updatedAt
    });
  } catch (error) {
    console.error('Erro ao buscar produto', error);
    res.status(500).json({ message: 'Erro interno ao buscar produto' });
  }
}

async function createProduct(req, res) {
  const { name, description, category, price } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({ message: 'Campos obrigatórios: name, category e price' });
  }

  try {
    const product = await Product.create({
      name,
      description: description || undefined,
      category,
      price: Number(price)
    });

    res.status(201).json({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      created_at: product.createdAt,
      updated_at: product.updatedAt
    });
  } catch (error) {
    console.error('Erro ao criar produto', error);
    res.status(500).json({ message: 'Erro interno ao criar produto' });
  }
}

async function updateProduct(req, res) {
  const { name, description, category, price } = req.body;

  if (!name && !description && !category && price === undefined) {
    return res.status(400).json({ message: 'Informe ao menos um campo para atualização' });
  }

  try {
    const existing = await Product.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(price !== undefined ? { price: Number(price) } : {})
      },
      { new: true, runValidators: true }
    ).lean();

    res.json({
      id: updated._id,
      name: updated.name,
      description: updated.description,
      category: updated.category,
      price: updated.price,
      created_at: updated.createdAt,
      updated_at: updated.updatedAt
    });
  } catch (error) {
    console.error('Erro ao atualizar produto', error);
    res.status(500).json({ message: 'Erro interno ao atualizar produto' });
  }
}

async function deleteProduct(req, res) {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover produto', error);
    res.status(500).json({ message: 'Erro interno ao remover produto' });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
