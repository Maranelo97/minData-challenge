/*
  Warnings:

  - You are about to drop the column `alias` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `superpower` on the `Hero` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Hero` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Hero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Hero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "alias",
DROP COLUMN "superpower",
ADD COLUMN     "aliases" TEXT[],
ADD COLUMN     "alignment" TEXT,
ADD COLUMN     "alterEgos" TEXT,
ADD COLUMN     "base" TEXT,
ADD COLUMN     "externalId" INTEGER NOT NULL,
ADD COLUMN     "eyeColor" TEXT,
ADD COLUMN     "firstAppearance" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "groupAffiliation" TEXT,
ADD COLUMN     "hairColor" TEXT,
ADD COLUMN     "height" TEXT[],
ADD COLUMN     "imageLg" TEXT,
ADD COLUMN     "imageMd" TEXT,
ADD COLUMN     "imageSm" TEXT,
ADD COLUMN     "imageXs" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "placeOfBirth" TEXT,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "race" TEXT,
ADD COLUMN     "relatives" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT[];

-- CreateTable
CREATE TABLE "Powerstats" (
    "id" TEXT NOT NULL,
    "intelligence" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "durability" INTEGER NOT NULL DEFAULT 0,
    "power" INTEGER NOT NULL DEFAULT 0,
    "combat" INTEGER NOT NULL DEFAULT 0,
    "heroId" TEXT NOT NULL,

    CONSTRAINT "Powerstats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Powerstats_heroId_key" ON "Powerstats"("heroId");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_externalId_key" ON "Hero"("externalId");

-- AddForeignKey
ALTER TABLE "Powerstats" ADD CONSTRAINT "Powerstats_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
