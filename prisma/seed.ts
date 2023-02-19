import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  const symbols = {
    btc: 'Bitcoin',
    eth: 'Ether',
    ltc: 'Litecoin',
    xmr: 'Monero',
    xrp: 'Ripple',
    doge: 'Dogecoin',
    dash: 'Dash',
    maid: 'MaidSafeCoin',
    lsk: 'Lisk',
    sicx: 'Storjcoin X',
  };

  for (const [symbol, name] of Object.entries(symbols)) {
    const quote = await prisma.quote.upsert({
      where: { symbol: symbol },
      update: {
        symbol: symbol,
        cryptoName: name,
        price: Math.random() * 10000 + 10000,
        volume: Math.random() * 10000 + 1000,
        timestamp: new Date(),
        change: Math.random() * 1000 + 100,
      },
      create: {
        symbol: symbol,
        cryptoName: name,
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
