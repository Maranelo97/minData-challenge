import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getHeroes = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    
    const heroes = await prisma.hero.findMany({
      where: {
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
      include: { powerstats: true }, // Traemos las stats para el radar
      orderBy: { name: 'asc' }
    });
    
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener héroes' });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Desestructuramos
    
    // Validamos que sea un string antes de enviarlo a Prisma
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const hero = await prisma.hero.findUnique({ 
      where: { id }, // Ahora TypeScript sabe que es string
      include: { powerstats: true }
    });
    
    if (!hero) return res.status(404).json({ message: 'Héroe no encontrado' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el héroe' });
  }
};

export const createHero = async (req: Request, res: Response) => {
  try {
    // Ajustamos a los campos reales del nuevo schema
    const { name, slug, externalId, imageMd, gender, race } = req.body;
    
    const newHero = await prisma.hero.create({
      data: { 
        name, 
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'), 
        externalId: externalId || Math.floor(Math.random() * 100000),
        imageMd,
        gender,
        race
      }
    });
    res.status(201).json(newHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear héroe. Revisa los campos obligatorios.' });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const updatedHero = await prisma.hero.update({
      where: { id },
      data
    });
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar héroe' });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await prisma.hero.delete({ 
      where: { id } 
    });
    res.json({ message: 'Héroe eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar héroe' });
  }
};