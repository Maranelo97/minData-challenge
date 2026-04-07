import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mindata_secret_2026';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // El token suele venir en el header "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Guardamos los datos del usuario en la petición
    next(); // ¡Todo bien! Pasa al siguiente paso
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};