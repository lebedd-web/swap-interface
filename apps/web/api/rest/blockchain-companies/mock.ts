import { api } from "@/api/rest/instance"
import { AxiosHeaders, type AxiosPromise } from "axios"

import {
  EBlockchainCompanyAlias,
  EBlockchainCompanyBudget,
  EBlockchainCompanyRegion,
  EBlockchainCompanyService,
  EBlockchainCompanySort,
  type TBlockchainCompaniesFilters,
  type TBlockchainCompaniesInquiryReq,
  type TBlockchainCompaniesInquiryRes,
  type TBlockchainCompaniesRes,
  type TBlockchainCompany,
} from "./types"

const FEATURED_RATE = "$25 - $49 / hr"
const MARKET_RATE = "$50 - $99 / hr"

const COMPANIES: TBlockchainCompany[] = [
  {
    id: "peiko",
    rank: 1,
    name: "Peiko",
    tagline: "Blockchain development company for smart contracts and Web3 products.",
    description:
      "Peiko is a blockchain development company specializing in blockchain solutions, distributed ledger technology, and smart contract development.",
    rating: "5.0",
    reviews: 151,
    profileScore: "40.0/40",
    hourlyRate: FEATURED_RATE,
    minProject: "$10,000+",
    minProjectAmount: 10000,
    employees: "50 - 249",
    location: "Krakow, Poland",
    region: EBlockchainCompanyRegion.EUROPE,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.WEB3,
      EBlockchainCompanyService.SMART_CONTRACTS,
    ],
    budget: EBlockchainCompanyBudget.FROM_10K,
    serviceFocus: [
      { label: "Blockchain", value: 80 },
      { label: "Web development", value: 20 },
    ],
    industries: ["Blockchain", "Web3", "Smart contracts"],
    badges: ["Premier profile", "Blockchain focus"],
    featured: true,
  },
  {
    id: "spacedev",
    rank: 2,
    name: "SpaceDev",
    tagline: "Web3 product team for blockchain apps and smart contract delivery.",
    description:
      "A blockchain development team focused on product execution, Web3 application delivery, and smart contract implementation for growth-stage companies.",
    rating: "5.0",
    reviews: 48,
    profileScore: "39.3/40",
    hourlyRate: MARKET_RATE,
    minProject: "$25,000+",
    minProjectAmount: 25000,
    employees: "50 - 249",
    location: "Miami, FL",
    region: EBlockchainCompanyRegion.NORTH_AMERICA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.WEB3,
      EBlockchainCompanyService.SMART_CONTRACTS,
    ],
    budget: EBlockchainCompanyBudget.FROM_25K,
    serviceFocus: [
      { label: "Blockchain", value: 50 },
      { label: "Custom software development", value: 10 },
      { label: "IT staff augmentation", value: 10 },
    ],
    industries: ["Financial services", "Software", "Education"],
    badges: ["Web3 delivery", "Product team"],
    featured: false,
  },
  {
    id: "evacodes",
    rank: 3,
    name: "EvaCodes",
    tagline: "Blockchain development team for smart contracts and dApps.",
    description:
      "EvaCodes delivers blockchain and decentralized application development with a consistent focus on technical execution and timely delivery.",
    rating: "5.0",
    reviews: 55,
    profileScore: "39.2/40",
    hourlyRate: MARKET_RATE,
    minProject: "$25,000+",
    minProjectAmount: 25000,
    employees: "50 - 249",
    location: "Warsaw, Poland",
    region: EBlockchainCompanyRegion.EUROPE,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.SMART_CONTRACTS,
      EBlockchainCompanyService.WEB3,
    ],
    budget: EBlockchainCompanyBudget.FROM_25K,
    serviceFocus: [
      { label: "Blockchain", value: 85 },
      { label: "Web development", value: 10 },
      { label: "AI development", value: 5 },
    ],
    industries: ["Blockchain", "Web3", "Enterprise"],
    badges: ["Blockchain focus", "Engineering focus"],
    featured: false,
  },
  {
    id: "netset",
    rank: 4,
    name: "NetSet Software Solutions",
    tagline: "Blockchain and software development team for custom products.",
    description:
      "NetSet Software Solutions offers blockchain and distributed ledger engineering with strong client satisfaction and reliable project delivery.",
    rating: "5.0",
    reviews: 101,
    profileScore: "39.4/40",
    hourlyRate: MARKET_RATE,
    minProject: "$10,000+",
    minProjectAmount: 10000,
    employees: "50 - 249",
    location: "Sahibzada Ajit Singh Nagar, India",
    region: EBlockchainCompanyRegion.ASIA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.WEB3,
      EBlockchainCompanyService.WALLET,
    ],
    budget: EBlockchainCompanyBudget.FROM_10K,
    serviceFocus: [
      { label: "Blockchain", value: 50 },
      { label: "Web development", value: 25 },
      { label: "Mobile app development", value: 25 },
    ],
    industries: ["Software", "Mobile", "Commerce"],
    badges: ["Blockchain delivery", "Cross-platform"],
    featured: false,
  },
  {
    id: "labrys",
    rank: 5,
    name: "Labrys",
    tagline: "Blockchain and smart contract development partner.",
    description:
      "Labrys specializes in blockchain technology and smart contract development with an emphasis on delivery quality and technical skill.",
    rating: "5.0",
    reviews: 11,
    profileScore: "37.1/40",
    hourlyRate: MARKET_RATE,
    minProject: "$10,000+",
    minProjectAmount: 10000,
    employees: "10 - 49",
    location: "Milton, Australia",
    region: EBlockchainCompanyRegion.ASIA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.WALLET,
      EBlockchainCompanyService.WEB3,
    ],
    budget: EBlockchainCompanyBudget.FROM_10K,
    serviceFocus: [
      { label: "Blockchain", value: 50 },
      { label: "Mobile app development", value: 20 },
      { label: "Web development", value: 20 },
    ],
    industries: ["Blockchain", "Web3", "Mobile"],
    badges: ["Smart contracts", "Blockchain focus"],
    featured: false,
  },
  {
    id: "redduck",
    rank: 6,
    name: "RedDuck",
    tagline: "Blockchain development company for dApps and smart contracts.",
    description:
      "RedDuck focuses on blockchain product delivery across smart contract and decentralized application development.",
    rating: "5.0",
    reviews: 13,
    profileScore: "36.7/40",
    hourlyRate: MARKET_RATE,
    minProject: "$10,000+",
    minProjectAmount: 10000,
    employees: "10 - 49",
    location: "Kyiv, Ukraine",
    region: EBlockchainCompanyRegion.EUROPE,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.SMART_CONTRACTS,
    ],
    budget: EBlockchainCompanyBudget.FROM_10K,
    serviceFocus: [{ label: "Blockchain", value: 100 }],
    industries: ["Blockchain", "dApps", "Web3"],
    badges: ["100% blockchain", "Smart contracts"],
    featured: false,
  },
  {
    id: "hola-tech",
    rank: 7,
    name: "Hola Tech",
    tagline: "Blockchain engineering for dApps and custom software delivery.",
    description:
      "Hola Tech delivers blockchain, decentralized application, and custom software development for business-focused product teams.",
    rating: "5.0",
    reviews: 33,
    profileScore: "35.4/40",
    hourlyRate: MARKET_RATE,
    minProject: "$5,000+",
    minProjectAmount: 5000,
    employees: "50 - 249",
    location: "Ha Noi, Vietnam",
    region: EBlockchainCompanyRegion.ASIA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.DEFI,
      EBlockchainCompanyService.WEB3,
    ],
    budget: EBlockchainCompanyBudget.UNDER_10K,
    serviceFocus: [
      { label: "Blockchain", value: 40 },
      { label: "AI development", value: 30 },
      { label: "Custom software development", value: 10 },
    ],
    industries: ["Blockchain", "AI", "Custom software"],
    badges: ["dApp delivery", "Business focused"],
    featured: false,
  },
  {
    id: "infograins",
    rank: 8,
    name: "Infograins Software Solutions",
    tagline: "Blockchain and software engineering for product teams.",
    description:
      "Infograins provides blockchain, AI, and custom software development with strong delivery quality and cost-effective execution.",
    rating: "4.9",
    reviews: 89,
    profileScore: "34.9/40",
    hourlyRate: MARKET_RATE,
    minProject: "$5,000+",
    minProjectAmount: 5000,
    employees: "250 - 999",
    location: "Indore, India",
    region: EBlockchainCompanyRegion.ASIA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.WEB3,
      EBlockchainCompanyService.WALLET,
    ],
    budget: EBlockchainCompanyBudget.UNDER_10K,
    serviceFocus: [
      { label: "Blockchain", value: 30 },
      { label: "AI development", value: 20 },
      { label: "Custom software development", value: 15 },
    ],
    industries: ["Software", "AI", "Blockchain"],
    badges: ["Large team", "Cross-functional"],
    featured: false,
  },
  {
    id: "omisoft",
    rank: 9,
    name: "OmiSoft",
    tagline: "Blockchain engineering for dApps and distributed systems.",
    description:
      "OmiSoft focuses on blockchain and decentralized application development with strong client feedback on technical expertise and delivery.",
    rating: "5.0",
    reviews: 29,
    profileScore: "34.5/40",
    hourlyRate: MARKET_RATE,
    minProject: "$5,000+",
    minProjectAmount: 5000,
    employees: "50 - 249",
    location: "Kyiv, Ukraine",
    region: EBlockchainCompanyRegion.EUROPE,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.DEFI,
      EBlockchainCompanyService.WEB3,
    ],
    budget: EBlockchainCompanyBudget.UNDER_10K,
    serviceFocus: [
      { label: "Blockchain", value: 80 },
      { label: "AI development", value: 20 },
    ],
    industries: ["Blockchain", "Web3", "AI"],
    badges: ["Distributed systems", "Technical focus"],
    featured: false,
  },
  {
    id: "pixelplex",
    rank: 10,
    name: "PixelPlex",
    tagline: "Blockchain development for smart contracts and dApps.",
    description:
      "PixelPlex delivers blockchain engineering for smart contracts, dApps, and consulting with strong client feedback and delivery quality.",
    rating: "4.9",
    reviews: 33,
    profileScore: "34.0/40",
    hourlyRate: MARKET_RATE,
    minProject: "$25,000+",
    minProjectAmount: 25000,
    employees: "50 - 249",
    location: "New York, NY",
    region: EBlockchainCompanyRegion.NORTH_AMERICA,
    services: [
      EBlockchainCompanyService.BLOCKCHAIN,
      EBlockchainCompanyService.SMART_CONTRACTS,
      EBlockchainCompanyService.WEB3,
      EBlockchainCompanyService.DEFI,
    ],
    budget: EBlockchainCompanyBudget.FROM_25K,
    serviceFocus: [
      { label: "Blockchain", value: 20 },
      { label: "AI consulting", value: 10 },
      { label: "AI development", value: 10 },
    ],
    industries: ["Blockchain", "AI", "Consulting"],
    badges: ["dApp delivery", "Consulting"],
    featured: false,
  },
]

const getBlockchainFocus = (company: TBlockchainCompany): number =>
  company.serviceFocus.find((item) => item.label === "Blockchain")?.value ?? 0

const getScore = (company: TBlockchainCompany): number =>
  Number(company.profileScore.split("/")[0])

const matchesSearch = (company: TBlockchainCompany, search?: string): boolean => {
  if (!search?.trim()) return true

  const query = search.trim().toLowerCase()
  const haystack = [
    company.name,
    company.tagline,
    company.description,
    company.location,
    company.industries.join(" "),
    company.badges.join(" "),
  ]
    .join(" ")
    .toLowerCase()

  return haystack.includes(query)
}

const applyFilters = (
  companies: TBlockchainCompany[],
  filters?: TBlockchainCompaniesFilters,
): TBlockchainCompany[] =>
  companies.filter((company) => {
    const service = filters?.[EBlockchainCompanyAlias.service]
    const region = filters?.[EBlockchainCompanyAlias.region]
    const budget = filters?.[EBlockchainCompanyAlias.budget]

    if (!matchesSearch(company, filters?.[EBlockchainCompanyAlias.search])) return false
    if (service && !company.services.includes(service)) return false
    if (region && region !== EBlockchainCompanyRegion.ALL && company.region !== region) {
      return false
    }
    if (budget && budget !== EBlockchainCompanyBudget.ALL && company.budget !== budget) {
      return false
    }

    return true
  })

const sortCompanies = (
  companies: TBlockchainCompany[],
  sort: EBlockchainCompanySort = EBlockchainCompanySort.RECOMMENDED,
): TBlockchainCompany[] => {
  const result = [...companies]

  if (sort === EBlockchainCompanySort.SCORE_DESC) {
    return result.sort((a, b) => getScore(b) - getScore(a))
  }

  if (sort === EBlockchainCompanySort.FOCUS_DESC) {
    return result.sort((a, b) => getBlockchainFocus(b) - getBlockchainFocus(a))
  }

  if (sort === EBlockchainCompanySort.BUDGET_ASC) {
    return result.sort((a, b) => a.minProjectAmount - b.minProjectAmount)
  }

  return result.sort((a, b) => a.rank - b.rank)
}

const wait = async (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs))

export const getBlockchainCompaniesMock = (
  params?: TBlockchainCompaniesFilters,
): AxiosPromise<TBlockchainCompaniesRes> =>
  api.get("/blockchain-companies", {
    params,
    adapter: async (config) => {
      const filteredCompanies = applyFilters(COMPANIES, params)
      const companies = sortCompanies(
        filteredCompanies,
        params?.[EBlockchainCompanyAlias.sort],
      )

      return {
        data: {
          data: {
            featuredCompany: COMPANIES[0],
            companies,
            total: companies.length,
            stats: {
              companies: COMPANIES.length,
              topRating: "5.0",
              rateRange: MARKET_RATE,
              blockchainFocus: "80%+",
            },
            updatedAt: "2026-04-25T10:00:00.000Z",
          },
        },
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })

export const createBlockchainCompaniesInquiryMock = (
  payload: TBlockchainCompaniesInquiryReq,
): AxiosPromise<TBlockchainCompaniesInquiryRes> =>
  api.post("/blockchain-companies/inquiry", payload, {
    adapter: async (config) => {
      await wait(300)

      return {
        data: {
          data: {
            requestId: `bc-${Date.now()}`,
            sourceCompanyId: payload.sourceCompanyId,
            createdAt: new Date().toISOString(),
          },
        },
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })
