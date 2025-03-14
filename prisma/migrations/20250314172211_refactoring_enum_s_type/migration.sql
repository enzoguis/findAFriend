/*
  Warnings:

  - The values [Puppy,Adult,Elderly] on the enum `Age` will be removed. If these variants are still used in the database, this will fail.
  - The values [Low,Medium,High] on the enum `DependenceLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [Low,Medium,High] on the enum `EnergyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [Indoor,Outdoor] on the enum `Environment` will be removed. If these variants are still used in the database, this will fail.
  - The values [Small,Medium,Large] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Age_new" AS ENUM ('puppy', 'adult', 'elderly');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "Age_new" USING ("age"::text::"Age_new");
ALTER TYPE "Age" RENAME TO "Age_old";
ALTER TYPE "Age_new" RENAME TO "Age";
DROP TYPE "Age_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DependenceLevel_new" AS ENUM ('low', 'medium', 'high');
ALTER TABLE "pets" ALTER COLUMN "dependence_level" TYPE "DependenceLevel_new" USING ("dependence_level"::text::"DependenceLevel_new");
ALTER TYPE "DependenceLevel" RENAME TO "DependenceLevel_old";
ALTER TYPE "DependenceLevel_new" RENAME TO "DependenceLevel";
DROP TYPE "DependenceLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EnergyLevel_new" AS ENUM ('low', 'medium', 'high');
ALTER TABLE "pets" ALTER COLUMN "energy_level" TYPE "EnergyLevel_new" USING ("energy_level"::text::"EnergyLevel_new");
ALTER TYPE "EnergyLevel" RENAME TO "EnergyLevel_old";
ALTER TYPE "EnergyLevel_new" RENAME TO "EnergyLevel";
DROP TYPE "EnergyLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Environment_new" AS ENUM ('indoor', 'outdoor');
ALTER TABLE "pets" ALTER COLUMN "environment" TYPE "Environment_new" USING ("environment"::text::"Environment_new");
ALTER TYPE "Environment" RENAME TO "Environment_old";
ALTER TYPE "Environment_new" RENAME TO "Environment";
DROP TYPE "Environment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'medium', 'large');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;
