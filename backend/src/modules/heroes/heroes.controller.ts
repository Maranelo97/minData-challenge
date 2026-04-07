import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getHeroes = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string; // Forzamos a string
    
    const heroes = await prisma.hero.findMany({
      where: {
        name: {
          contains: name || '', // Si no hay nombre, trae todos
          mode: 'insensitive',
        },
      },
      orderBy: { name: 'asc' }
    });
    
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener héroes' });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Aquí estaba el error
    const hero = await prisma.hero.findUnique({ 
      where: { id: id } 
    });
    
    if (!hero) return res.status(404).json({ message: 'Héroe no encontrado' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el héroe' });
  }
};

export const createHero = async (req: Request, res: Response) => {
  try {
    const { name, superpower, alias } = req.body;
    const newHero = await prisma.hero.create({
      data: { name, superpower, alias }
    });
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear héroe' });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Forzamos a string
    const data = req.body;
    const updatedHero = await prisma.hero.update({
      where: { id: id },
      data
    });
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar héroe' });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Forzamos a string
    await prisma.hero.delete({ 
      where: { id: id } 
    });
    res.json({ message: 'Héroe eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar héroe' });
  }
};