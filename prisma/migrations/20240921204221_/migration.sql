/*
  Warnings:

  - You are about to drop the `ActiveDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prioritet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `CreateTodo` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActiveDay";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Prioritet";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CreateTodoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CreateTodoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CreateTodo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CreateTodoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreateTodo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_CreateTodo" ("description", "id", "title") SELECT "description", "id", "title" FROM "CreateTodo";
DROP TABLE "CreateTodo";
ALTER TABLE "new_CreateTodo" RENAME TO "CreateTodo";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "fullName", "id", "lastName", "password") SELECT "email", "fullName", "id", "lastName", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CreateTodoToUser_AB_unique" ON "_CreateTodoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CreateTodoToUser_B_index" ON "_CreateTodoToUser"("B");
