export enum EBlockchainCompanyService {
  BLOCKCHAIN = "blockchain",
  SMART_CONTRACTS = "smart-contracts",
  DEFI = "defi",
  WEB3 = "web3",
  WALLET = "wallet",
  TOKENIZATION = "tokenization",
}

export enum EBlockchainCompanyRegion {
  ALL = "all",
  NORTH_AMERICA = "north-america",
  EUROPE = "europe",
  ASIA = "asia",
}

export enum EBlockchainCompanyBudget {
  ALL = "all",
  UNDER_10K = "under-10k",
  FROM_10K = "from-10k",
  FROM_25K = "from-25k",
}

export enum EBlockchainCompanySort {
  RECOMMENDED = "recommended",
  SCORE_DESC = "score-desc",
  FOCUS_DESC = "focus-desc",
  BUDGET_ASC = "budget-asc",
}

export enum EBlockchainCompanyAlias {
  search = "search",
  service = "service",
  region = "region",
  budget = "budget",
  sort = "sort",
}

export type TBlockchainServiceFocus = {
  label: string
  value: number
}

export type TBlockchainCompany = {
  id: string
  rank: number
  name: string
  tagline: string
  description: string
  rating: string
  reviews: number
  profileScore: string
  hourlyRate: string
  minProject: string
  minProjectAmount: number
  employees: string
  location: string
  region: EBlockchainCompanyRegion
  services: EBlockchainCompanyService[]
  budget: EBlockchainCompanyBudget
  serviceFocus: TBlockchainServiceFocus[]
  industries: string[]
  badges: string[]
  featured: boolean
}

export type TBlockchainCompaniesStats = {
  companies: number
  topRating: string
  rateRange: string
  blockchainFocus: string
}

export type TBlockchainCompaniesFilters = {
  [EBlockchainCompanyAlias.search]?: string
  [EBlockchainCompanyAlias.service]?: EBlockchainCompanyService
  [EBlockchainCompanyAlias.region]?: EBlockchainCompanyRegion
  [EBlockchainCompanyAlias.budget]?: EBlockchainCompanyBudget
  [EBlockchainCompanyAlias.sort]?: EBlockchainCompanySort
}

export type TBlockchainCompaniesRes = {
  featuredCompany: TBlockchainCompany
  companies: TBlockchainCompany[]
  total: number
  stats: TBlockchainCompaniesStats
  updatedAt: string
}

export type TBlockchainCompaniesInquiryReq = {
  sourceCompanyId: string
}

export type TBlockchainCompaniesInquiryRes = {
  requestId: string
  sourceCompanyId: string
  createdAt: string
}
