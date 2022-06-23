export type Lot = {
    id: number,
    lotId: number,
    status: number,
    sellerAddress: string,
    proposedAssetAddress: string,
    proposedAssetId: number,
    proposedAmount: number,
    askedAssetAddress: string,
    askedAssetId: number,
    askedAmount: number,
    txHash: string,
    txHashSuccess: boolean,
    buyerAddress: string,
    createdAt: number,
    updatedAt: string
}