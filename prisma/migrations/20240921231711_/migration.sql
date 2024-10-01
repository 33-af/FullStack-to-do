/*
  Warnings:

  - You are about to drop the `_CreateTodoToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `CreateTodo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CreateTodoToUser_B_index";

-- DropIndex
DROP INDEX "_CreateTodoToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CreateTodoToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreateTodo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CreateTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreateTodo" ("description", "id", "title") SELECT "description", "id", "title" FROM "CreateTodo";
DROP TABLE "CreateTodo";
ALTER TABLE "new_CreateTodo" RENAME TO "CreateTodo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
