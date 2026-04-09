import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.resolve(process.cwd(), 'datosHero.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const heroesData = JSON.parse(rawData);

  console.log('🚀 Iniciando sincronización de "The Neon Vanguard" Database...');

  for (const h of heroesData) {
    // Usamos upsert para evitar duplicados si corres el seed varias veces
    await prisma.hero.upsert({
      where: { externalId: h.id }, // Usamos el ID de la API como clave de control
      update: {}, 
      create: {
        externalId: h.id,
        name: h.name,
        slug: h.slug,
        
        // Powerstats (Relación 1:1)
        powerstats: {
          create: {
            intelligence: h.powerstats.intelligence || 0,
            strength: h.powerstats.strength || 0,
            speed: h.powerstats.speed || 0,
            durability: h.powerstats.durability || 0,
            power: h.powerstats.power || 0,
            combat: h.powerstats.combat || 0,
          }
        },

        // Appearance
        gender: h.appearance.gender,
        race: h.appearance.race,
        height: h.appearance.height, // Prisma maneja el array de strings automáticamente
        weight: h.appearance.weight,
        eyeColor: h.appearance.eyeColor,
        hairColor: h.appearance.hairColor,

        // Biography
        fullName: h.biography.fullName,
        alterEgos: h.biography.alterEgos,
        aliases: h.biography.aliases || [],
        placeOfBirth: h.biography.placeOfBirth,
        firstAppearance: h.biography.firstAppearance,
        publisher: h.biography.publisher,
        alignment: h.biography.alignment,

        // Work & Connections
        occupation: h.work.occupation,
        base: h.work.base,
        groupAffiliation: h.connections.groupAffiliation,
        relatives: h.connections.relatives,

        // Images
        imageXs: h.images.xs,
        imageSm: h.images.sm,
        imageMd: h.images.md,
        imageLg: h.images.lg,
      },
    });
  }

  console.log('✅ Vanguard Database: Sincronización Completa.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el sembrado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });