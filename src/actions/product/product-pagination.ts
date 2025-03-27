"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationsOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}
export const getPaginatedWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationsOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    });

    //2. Obtener el total de paginas

    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: 1,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (err) {
    throw new Error("no se pudo obtener los productos");
  }
};
