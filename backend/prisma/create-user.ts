import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@mindata.com' },
    update: {},
    create: {
      email: 'admin@mindata.com',
      password: passwordHash,
    },
  });

  console.log('✅ Usuario creado:', user.email);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());