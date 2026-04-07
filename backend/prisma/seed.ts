import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.resolve(process.cwd(), 'datosHero.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const heroesData = JSON.parse(rawData);

  console.log('🚀 Iniciando el sembrado de datos...');

  for (const h of heroesData) {
    await prisma.hero.upsert({
      where: { id: String(h.id) },
      update: {},
      create: {
        id: String(h.id),
        name: h.name,
        superpower: h.powerstats ? `Intelligence: ${h.powerstats.intelligence}, Strength: ${h.powerstats.strength}` : 'Unknown',
        alias: h.biography?.aliases?.[0] || h.slug,
      },
    });
  }

  console.log('✅ Base de datos poblada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });