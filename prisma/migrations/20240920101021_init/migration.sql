-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CreateTodo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CreateTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prioritet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "technicaldebt" TEXT NOT NULL,
    "low" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "high" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createTodoId" TEXT,
    CONSTRAINT "Prioritet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Prioritet_createTodoId_fkey" FOREIGN KEY ("createTodoId") REFERENCES "CreateTodo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActiveDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sunday" TEXT NOT NULL,
    "monday" TEXT NOT NULL,
    "thuesday" TEXT NOT NULL,
    "wednesday" TEXT NOT NULL,
    "thuersday" TEXT NOT NULL,
    "friday" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createTodoId" TEXT,
    CONSTRAINT "ActiveDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActiveDay_createTodoId_fkey" FOREIGN KEY ("createTodoId") REFERENCES "CreateTodo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
