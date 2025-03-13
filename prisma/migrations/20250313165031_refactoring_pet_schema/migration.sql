/*
  Warnings:

  - You are about to drop the column `gender` on the `pets` table. All the data in the column will be lost.
  - Added the required column `dependence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Puppy', 'Adult', 'Elderly');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "DependenceLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Indoor', 'Outdoor');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "gender",
ADD COLUMN     "dependence_level" "DependenceLevel" NOT NULL,
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL,
ADD COLUMN     "environment" "Environment" NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL;

-- DropEnum
DROP TYPE "age";
