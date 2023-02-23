import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { CACHE_MANAGER } from '@nestjs/common';

describe('QuotesController', () => {
  let controller: QuotesController;

  // const mockPrisma = {
  //   quote: {
  //     findFirst: jest.fn().mockImplementation(),
  //   },
  // };

  // const mockCache = {
  //   get: jest.fn().mockImplementation(() => Promise.resolve()),
  //   set: jest.fn().mockImplementation(() => Promise.resolve()),
  // };

  const mockQuotesService = {
    selectOneQuote: jest.fn().mockImplementation((symbol: string) =>
      Promise.resolve({
        id: 1,
        symbol: 'btc',
        cryptoName: 'Bitcoin',
        price: 24402.42097421853,
        volume: 14192427098.76792,
        change: 320.1990300007008,
        timestamp: '2023-02-23T07:54:31.401Z',
      }),
    ),
    selectAllQuotes: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 10,
          symbol: 'sjcx',
          cryptoName: 'Storjcoin X',
          price: 0.0029133371892548,
          volume: 0,
          change: 0,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 1,
          symbol: 'btc',
          cryptoName: 'Bitcoin',
          price: 24392.01111898776,
          volume: 14092617320.81169,
          change: 319.3441381433547,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 2,
          symbol: 'eth',
          cryptoName: 'Ether',
          price: 1667.596157884031,
          volume: 4049420690.039901,
          change: 24.05937870507317,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 5,
          symbol: 'xrp',
          cryptoName: 'Ripple',
          price: 0.3964548007419608,
          volume: 418132347.685685,
          change: 0.006486092334413843,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 6,
          symbol: 'doge',
          cryptoName: 'Dogecoin',
          price: 0.0857099132109229,
          volume: 277495465.1924098,
          change: 0.001328352612277613,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 3,
          symbol: 'ltc',
          cryptoName: 'Litecoin',
          price: 95.23652693573416,
          volume: 192809915.4053981,
          change: 0.3119183650758422,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 4,
          symbol: 'xmr',
          cryptoName: 'Monero',
          price: 157.6359823355093,
          volume: 33480381.2270185,
          change: 0.1113559134103284,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 7,
          symbol: 'dash',
          cryptoName: 'Dash',
          price: 72.7649156850038,
          volume: 59073250.8203833,
          change: 2.627061923114309,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 9,
          symbol: 'lsk',
          cryptoName: 'Lisk',
          price: 1.201864055651087,
          volume: 652711.3608866961,
          change: 0.02184509836238634,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
        {
          id: 8,
          symbol: 'maid',
          cryptoName: 'MaidSafeCoin',
          price: 0.14118194075984,
          volume: 353.3642795278035,
          change: 0.00006350982936705041,
          timestamp: '2023-02-23T08:04:00.713Z',
        },
      ]),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        QuotesService,
        PrismaService,
        // { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    })
      // .overrideProvider(PrismaService)
      // .useValue(mockPrisma)
      .overrideProvider(QuotesService)
      .useValue(mockQuotesService)
      .compile();

    controller = module.get<QuotesController>(QuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return btc quote', async () => {
    const result = await controller.findOne('btc');
    expect(result).toEqual({
      id: expect.any(Number),
      symbol: expect.any(String),
      cryptoName: expect.any(String),
      price: expect.any(Number),
      volume: expect.any(Number),
      change: expect.any(Number),
      timestamp: expect.any(String),
    });
    expect(mockQuotesService.selectOneQuote).toBeCalledWith('btc');
  });

  it('should return all quotes', async () => {
    const result = await controller.getAllQuotes();
    const expectedObject = {
      id: expect.any(Number),
      symbol: expect.any(String),
      cryptoName: expect.any(String),
      price: expect.any(Number),
      volume: expect.any(Number),
      change: expect.any(Number),
      timestamp: expect.any(String),
    };
    expect(result).toEqual(expect.objectContaining([expectedObject]));
    expect(mockQuotesService.selectAllQuotes).toHaveBeenCalled();
  });
});
