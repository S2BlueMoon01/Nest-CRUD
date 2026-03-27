import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany();
  }
  createPost(body: { title: string; content: string; authorId: number }) {
    return this.prismaService.post.create({ data: body });
  }
  getPost(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }
  updatePost(id: number, body: { title: string; content: string }) {
    return this.prismaService.post.update({ where: { id }, data: body });
  }
  deletePost(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
