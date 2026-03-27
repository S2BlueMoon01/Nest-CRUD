# NestJS CRUD Learning Repo

Repo nay duoc tao de hoc NestJS theo huong lam du an CRUD thuc te, ket hop voi Prisma va SQLite.

## Muc tieu hoc

- Hieu cau truc co ban cua NestJS (module, controller, service)
- Thuc hanh CRUD cho resource Post
- Lam viec voi Prisma Client trong NestJS
- Hieu luong request/response va cach map du lieu tu body, param

## Cong nghe su dung

- NestJS 11
- Prisma
- SQLite
- TypeScript

## Yeu cau moi truong

- Node.js 20+
- npm

## Cai dat va chay du an

1. Cai dependencies

   npm install

2. Kiem tra bien moi truong trong file .env

   DATABASE_URL="file:./dev.db"
   PORT=3000

3. Dong bo schema vao database

   npx prisma db push

4. Chay app o che do dev

   npm run start:dev

App mac dinh chay tai http://localhost:3000

## Script huu ich

- npm run build: Build du an
- npm run start: Chay app
- npm run start:dev: Chay app voi watch mode
- npm run test: Chay unit test
- npm run test:e2e: Chay e2e test

## Cac lenh NestJS hay su dung (chi tiet)

### 1) Khoi tao va tao nhanh code

- Tao project moi
  - npx @nestjs/cli new ten-du-an

- Tao module
  - npx nest g module ten-module
  - Vi du: npx nest g module routes/comments

- Tao controller
  - npx nest g controller ten-controller
  - Vi du: npx nest g controller routes/comments

- Tao service
  - npx nest g service ten-service
  - Vi du: npx nest g service routes/comments

- Tao resource CRUD nhanh
  - npx nest g resource ten-resource
  - Lenh nay co wizard hoi ban loai API (REST/GraphQL), co tao CRUD route hay khong.

### 2) Chay ung dung

- Chay thuong
  - npm run start

- Chay development (watch)
  - npm run start:dev

- Chay debug
  - npm run start:debug

- Chay production tu thu muc dist
  - npm run build
  - npm run start:prod

### 3) Kiem tra chat luong code

- Lint va auto-fix
  - npm run lint

- Format code
  - npm run format

- Unit test
  - npm run test

- E2E test
  - npm run test:e2e

- Coverage
  - npm run test:cov

### 4) Mot so lenh NestJS CLI bo sung

- Xem help tong quan
  - npx nest --help

- Xem danh sach schematics
  - npx nest generate --help

- Tao provider
  - npx nest g provider ten-provider

- Tao guard/interceptor/pipe/filter
  - npx nest g guard ten-guard
  - npx nest g interceptor ten-interceptor
  - npx nest g pipe ten-pipe
  - npx nest g filter ten-filter

## Cac lenh Prisma chi tiet

### 1) Khoi tao va sinh Prisma Client

- Khoi tao Prisma trong project
  - npx prisma init

- Format file schema
  - npx prisma format

- Validate schema
  - npx prisma validate

- Generate Prisma Client tu schema
  - npx prisma generate

### 2) Lam viec voi database trong qua trinh hoc

- Dong bo schema nhanh vao DB (khong tao migration)
  - npx prisma db push
  - Hop voi giai doan hoc nhanh/prototype.

- Mo Prisma Studio de xem/sua data
  - npx prisma studio

- Keo schema tu DB co san (introspection)
  - npx prisma db pull

### 3) Migration workflow (nen dung khi lam nghiem tuc)

- Tao migration moi va ap dung vao DB dev
  - npx prisma migrate dev --name ten_migration
  - Vi du: npx prisma migrate dev --name add_post_table

- Kiem tra trang thai migration
  - npx prisma migrate status

- Ap dung migration tren moi truong deploy/prod
  - npx prisma migrate deploy

- Reset DB dev va chay lai toan bo migration
  - npx prisma migrate reset
  - Can than: lenh nay xoa data hien tai.

### 4) Lenh debug loi Prisma thuong gap

- Gap loi schema khong dong bo
  - npx prisma generate
  - npx prisma db push

- Gap loi migration conflict trong local
  - npx prisma migrate status
  - npx prisma migrate reset

- Gap loi query do du lieu khong hop le
  - Kiem tra lai body request o controller co dung @Body/@Param hay khong
  - Mo studio de xem du lieu thuc te: npx prisma studio

### 5) Quy trinh de xuat cho repo nay

1. Sua model trong prisma/schema.prisma
2. Chay npx prisma format
3. Chay npx prisma generate
4. Chay npx prisma db push (hoc nhanh) hoac npx prisma migrate dev --name ten_migration (nghiem tuc)
5. Chay lai app va test API

## API hien tai

Base URL: http://localhost:3000

- GET /posts
  - Lay danh sach bai viet

- POST /posts
  - Tao bai viet moi
  - Body mau:

    {
    "title": "Hello",
    "content": "NestJS CRUD",
    "authorId": 1
    }

- PUT /posts/:id
  - Cap nhat bai viet
  - Body mau:

    {
    "title": "New title",
    "content": "New content"
    }

- DELETE /posts/:id
  - Xoa bai viet

## Cau truc thu muc chinh

- src/routes/posts: API cho Post (controller, service, module)
- src/shared/services/prisma.service.ts: Khoi tao Prisma Client cho toan app
- prisma/schema.prisma: Dinh nghia model database

## Ghi chu khi hoc

- Neu gap loi lien quan den database, kiem tra lai DATABASE_URL va schema Prisma
- Neu body bi undefined trong controller, can kiem tra decorator nhu @Body, @Param
- Nen test tung endpoint bang Postman hoac curl de nam chac flow

## Huong phat trien tiep

- Them DTO + class-validator
- Them auth (JWT)
- Them phan trang va filter cho GET /posts
- Viet them test cho posts module
