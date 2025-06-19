import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllProducts() {
		return this.prisma.product.findMany({
			include: {
				category: {
					include: {
						attributes: {
							select: {
								name: true,
								type: true,
								unit: true,
							},
						},
					},
				},
			},
		})
	}

	async getProductById(id: string) {
		return this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				category: {
					include: {
						attributes: {
							select: {
								name: true,
								type: true,
								unit: true,
							},
						},
					},
				},
			},
		})
	}
}
