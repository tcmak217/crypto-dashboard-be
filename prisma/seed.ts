import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  const symbols = [
    'btc',
    'eth',
    'ltc',
    'xmr',
    'xrp',
    'doge',
    'dash',
    'maid',
    'lsk',
    'sicx',
  ];

  for (const [index, symbol] of symbols.entries()) {
    const quote = await prisma.quote.upsert({
      where: { id: index + 1 },
      update: {
        symbol: symbol,
        price: Math.random() * 10000 + 10000,
        volume: Math.random() * 10000 + 1000,
        timestamp: new Date(),
        change: Math.random() * 1000 + 100,
      },
      create: {
        symbol: symbol,
        price: Math.random() * 10000 + 10000,
        volume: Math.random() * 10000 + 1000,
        timestamp: new Date(),
        change: Math.random() * 1000 + 100,
      },
    });
    console.log({ quote });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
