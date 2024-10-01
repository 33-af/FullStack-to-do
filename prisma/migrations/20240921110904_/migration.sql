/*
  Warnings:

  - You are about to drop the column `technicaldebt` on the `Prioritet` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prioritet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "low" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "high" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createTodoId" TEXT,
    CONSTRAINT "Prioritet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Prioritet_createTodoId_fkey" FOREIGN KEY ("createTodoId") REFERENCES "CreateTodo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Prioritet" ("createTodoId", "high", "id", "low", "medium", "userId") SELECT "createTodoId", "high", "id", "low", "medium", "userId" FROM "Prioritet";
DROP TABLE "Prioritet";
ALTER TABLE "new_Prioritet" RENAME TO "Prioritet";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
