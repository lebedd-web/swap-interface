import { ESwapTokenAccent } from "@/api/rest/swap/types"

export const TOKEN_ACCENT_CLASSES: Record<ESwapTokenAccent, string> = {
  [ESwapTokenAccent.ORANGE]: "bg-main-1 text-main-4",
  [ESwapTokenAccent.GREEN]: "bg-main-8 text-main-11",
  [ESwapTokenAccent.BLUE]: "bg-[#627EEA] text-main-4",
  [ESwapTokenAccent.PURPLE]: "bg-[#9945FF] text-main-4",
  [ESwapTokenAccent.YELLOW]: "bg-main-10 text-main-11",
  [ESwapTokenAccent.CYAN]: "bg-[#26A17B] text-main-4",
}
