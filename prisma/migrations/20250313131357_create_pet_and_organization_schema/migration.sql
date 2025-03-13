-- CreateEnum
CREATE TYPE "age" AS ENUM ('Puppy', 'Adult', 'Elderly');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" "age" NOT NULL,
    "gender" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_key" ON "organizations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_phone_number_key" ON "organizations"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_key" ON "pets"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
