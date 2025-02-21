import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      include: { invitado: true },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { invitado: true },
    });
  }

  async createUser(name: string, phone: string) {
    return this.prisma.user.create({
      data: { nombre: name, telefono: phone, num_invitados: 0 },
    });
  }

  async updateUser(id: number, name?: string, phone?: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { nombre: name, telefono: phone },
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async inviteGuest(userId: number, name: string) {
    const newGuest = await this.prisma.invitado.create({
      data: { nombre: name, user_Id: userId },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { num_invitados: { increment: 1 } },
    });

    return newGuest;
  }

  async getGuests() {
    return await this.prisma.invitado.findMany({
      include: { invitado: true },
    });
  }

  async getGuestById(id: number) {
    return await this.prisma.invitado.findUnique({
      where: { id },
    });
  }

  async deleteGuest(id: number) {
    const guest = await this.prisma.invitado.delete({
      where: { id },
    });

    await this.prisma.user.update({
      where: { id: guest.user_Id },
      data: { num_invitados: { decrement: 1 } },
    });

    return guest;
  }
}