import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DeviceRegistrationToken
 * ///////////////////////////////
 * ///////////////////////////////
 */
export type DeviceRegistrationTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$DeviceRegistrationTokenPayload>;
export type AggregateDeviceRegistrationToken = {
    _count: DeviceRegistrationTokenCountAggregateOutputType | null;
    _avg: DeviceRegistrationTokenAvgAggregateOutputType | null;
    _sum: DeviceRegistrationTokenSumAggregateOutputType | null;
    _min: DeviceRegistrationTokenMinAggregateOutputType | null;
    _max: DeviceRegistrationTokenMaxAggregateOutputType | null;
};
export type DeviceRegistrationTokenAvgAggregateOutputType = {
    id: number | null;
    deviceId: number | null;
};
export type DeviceRegistrationTokenSumAggregateOutputType = {
    id: number | null;
    deviceId: number | null;
};
export type DeviceRegistrationTokenMinAggregateOutputType = {
    id: number | null;
    deviceId: number | null;
    token: string | null;
    expiresAt: Date | null;
};
export type DeviceRegistrationTokenMaxAggregateOutputType = {
    id: number | null;
    deviceId: number | null;
    token: string | null;
    expiresAt: Date | null;
};
export type DeviceRegistrationTokenCountAggregateOutputType = {
    id: number;
    deviceId: number;
    token: number;
    expiresAt: number;
    _all: number;
};
export type DeviceRegistrationTokenAvgAggregateInputType = {
    id?: true;
    deviceId?: true;
};
export type DeviceRegistrationTokenSumAggregateInputType = {
    id?: true;
    deviceId?: true;
};
export type DeviceRegistrationTokenMinAggregateInputType = {
    id?: true;
    deviceId?: true;
    token?: true;
    expiresAt?: true;
};
export type DeviceRegistrationTokenMaxAggregateInputType = {
    id?: true;
    deviceId?: true;
    token?: true;
    expiresAt?: true;
};
export type DeviceRegistrationTokenCountAggregateInputType = {
    id?: true;
    deviceId?: true;
    token?: true;
    expiresAt?: true;
    _all?: true;
};
export type DeviceRegistrationTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceRegistrationToken to aggregate.
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeviceRegistrationTokens to fetch.
     */
    orderBy?: Prisma.DeviceRegistrationTokenOrderByWithRelationInput | Prisma.DeviceRegistrationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeviceRegistrationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeviceRegistrationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DeviceRegistrationTokens
    **/
    _count?: true | DeviceRegistrationTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DeviceRegistrationTokenAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DeviceRegistrationTokenSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DeviceRegistrationTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DeviceRegistrationTokenMaxAggregateInputType;
};
export type GetDeviceRegistrationTokenAggregateType<T extends DeviceRegistrationTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateDeviceRegistrationToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeviceRegistrationToken[P]> : Prisma.GetScalarType<T[P], AggregateDeviceRegistrationToken[P]>;
};
export type DeviceRegistrationTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    orderBy?: Prisma.DeviceRegistrationTokenOrderByWithAggregationInput | Prisma.DeviceRegistrationTokenOrderByWithAggregationInput[];
    by: Prisma.DeviceRegistrationTokenScalarFieldEnum[] | Prisma.DeviceRegistrationTokenScalarFieldEnum;
    having?: Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeviceRegistrationTokenCountAggregateInputType | true;
    _avg?: DeviceRegistrationTokenAvgAggregateInputType;
    _sum?: DeviceRegistrationTokenSumAggregateInputType;
    _min?: DeviceRegistrationTokenMinAggregateInputType;
    _max?: DeviceRegistrationTokenMaxAggregateInputType;
};
export type DeviceRegistrationTokenGroupByOutputType = {
    id: number;
    deviceId: number;
    token: string;
    expiresAt: Date;
    _count: DeviceRegistrationTokenCountAggregateOutputType | null;
    _avg: DeviceRegistrationTokenAvgAggregateOutputType | null;
    _sum: DeviceRegistrationTokenSumAggregateOutputType | null;
    _min: DeviceRegistrationTokenMinAggregateOutputType | null;
    _max: DeviceRegistrationTokenMaxAggregateOutputType | null;
};
type GetDeviceRegistrationTokenGroupByPayload<T extends DeviceRegistrationTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeviceRegistrationTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeviceRegistrationTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeviceRegistrationTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeviceRegistrationTokenGroupByOutputType[P]>;
}>>;
export type DeviceRegistrationTokenWhereInput = {
    AND?: Prisma.DeviceRegistrationTokenWhereInput | Prisma.DeviceRegistrationTokenWhereInput[];
    OR?: Prisma.DeviceRegistrationTokenWhereInput[];
    NOT?: Prisma.DeviceRegistrationTokenWhereInput | Prisma.DeviceRegistrationTokenWhereInput[];
    id?: Prisma.IntFilter<"DeviceRegistrationToken"> | number;
    deviceId?: Prisma.IntFilter<"DeviceRegistrationToken"> | number;
    token?: Prisma.StringFilter<"DeviceRegistrationToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DeviceRegistrationToken"> | Date | string;
    device?: Prisma.XOR<Prisma.DeviceScalarRelationFilter, Prisma.DeviceWhereInput>;
};
export type DeviceRegistrationTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    device?: Prisma.DeviceOrderByWithRelationInput;
};
export type DeviceRegistrationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    token?: string;
    AND?: Prisma.DeviceRegistrationTokenWhereInput | Prisma.DeviceRegistrationTokenWhereInput[];
    OR?: Prisma.DeviceRegistrationTokenWhereInput[];
    NOT?: Prisma.DeviceRegistrationTokenWhereInput | Prisma.DeviceRegistrationTokenWhereInput[];
    deviceId?: Prisma.IntFilter<"DeviceRegistrationToken"> | number;
    expiresAt?: Prisma.DateTimeFilter<"DeviceRegistrationToken"> | Date | string;
    device?: Prisma.XOR<Prisma.DeviceScalarRelationFilter, Prisma.DeviceWhereInput>;
}, "id" | "token">;
export type DeviceRegistrationTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    _count?: Prisma.DeviceRegistrationTokenCountOrderByAggregateInput;
    _avg?: Prisma.DeviceRegistrationTokenAvgOrderByAggregateInput;
    _max?: Prisma.DeviceRegistrationTokenMaxOrderByAggregateInput;
    _min?: Prisma.DeviceRegistrationTokenMinOrderByAggregateInput;
    _sum?: Prisma.DeviceRegistrationTokenSumOrderByAggregateInput;
};
export type DeviceRegistrationTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput | Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput | Prisma.DeviceRegistrationTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DeviceRegistrationToken"> | number;
    deviceId?: Prisma.IntWithAggregatesFilter<"DeviceRegistrationToken"> | number;
    token?: Prisma.StringWithAggregatesFilter<"DeviceRegistrationToken"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"DeviceRegistrationToken"> | Date | string;
};
export type DeviceRegistrationTokenCreateInput = {
    token: string;
    expiresAt: Date | string;
    device: Prisma.DeviceCreateNestedOneWithoutTokensInput;
};
export type DeviceRegistrationTokenUncheckedCreateInput = {
    id?: number;
    deviceId: number;
    token: string;
    expiresAt: Date | string;
};
export type DeviceRegistrationTokenUpdateInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    device?: Prisma.DeviceUpdateOneRequiredWithoutTokensNestedInput;
};
export type DeviceRegistrationTokenUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceId?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenCreateManyInput = {
    id?: number;
    deviceId: number;
    token: string;
    expiresAt: Date | string;
};
export type DeviceRegistrationTokenUpdateManyMutationInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceId?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenListRelationFilter = {
    every?: Prisma.DeviceRegistrationTokenWhereInput;
    some?: Prisma.DeviceRegistrationTokenWhereInput;
    none?: Prisma.DeviceRegistrationTokenWhereInput;
};
export type DeviceRegistrationTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
};
export type DeviceRegistrationTokenCreateNestedManyWithoutDeviceInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput> | Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput[] | Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?: Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput | Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput[];
    createMany?: Prisma.DeviceRegistrationTokenCreateManyDeviceInputEnvelope;
    connect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
};
export type DeviceRegistrationTokenUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput> | Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput[] | Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?: Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput | Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput[];
    createMany?: Prisma.DeviceRegistrationTokenCreateManyDeviceInputEnvelope;
    connect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
};
export type DeviceRegistrationTokenUpdateManyWithoutDeviceNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput> | Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput[] | Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?: Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput | Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput[];
    upsert?: Prisma.DeviceRegistrationTokenUpsertWithWhereUniqueWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: Prisma.DeviceRegistrationTokenCreateManyDeviceInputEnvelope;
    set?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    disconnect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    delete?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    connect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    update?: Prisma.DeviceRegistrationTokenUpdateWithWhereUniqueWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?: Prisma.DeviceRegistrationTokenUpdateManyWithWhereWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: Prisma.DeviceRegistrationTokenScalarWhereInput | Prisma.DeviceRegistrationTokenScalarWhereInput[];
};
export type DeviceRegistrationTokenUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput> | Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput[] | Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?: Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput | Prisma.DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput[];
    upsert?: Prisma.DeviceRegistrationTokenUpsertWithWhereUniqueWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: Prisma.DeviceRegistrationTokenCreateManyDeviceInputEnvelope;
    set?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    disconnect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    delete?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    connect?: Prisma.DeviceRegistrationTokenWhereUniqueInput | Prisma.DeviceRegistrationTokenWhereUniqueInput[];
    update?: Prisma.DeviceRegistrationTokenUpdateWithWhereUniqueWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?: Prisma.DeviceRegistrationTokenUpdateManyWithWhereWithoutDeviceInput | Prisma.DeviceRegistrationTokenUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: Prisma.DeviceRegistrationTokenScalarWhereInput | Prisma.DeviceRegistrationTokenScalarWhereInput[];
};
export type DeviceRegistrationTokenCreateWithoutDeviceInput = {
    token: string;
    expiresAt: Date | string;
};
export type DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
};
export type DeviceRegistrationTokenCreateOrConnectWithoutDeviceInput = {
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput>;
};
export type DeviceRegistrationTokenCreateManyDeviceInputEnvelope = {
    data: Prisma.DeviceRegistrationTokenCreateManyDeviceInput | Prisma.DeviceRegistrationTokenCreateManyDeviceInput[];
    skipDuplicates?: boolean;
};
export type DeviceRegistrationTokenUpsertWithWhereUniqueWithoutDeviceInput = {
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedUpdateWithoutDeviceInput>;
    create: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedCreateWithoutDeviceInput>;
};
export type DeviceRegistrationTokenUpdateWithWhereUniqueWithoutDeviceInput = {
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateWithoutDeviceInput, Prisma.DeviceRegistrationTokenUncheckedUpdateWithoutDeviceInput>;
};
export type DeviceRegistrationTokenUpdateManyWithWhereWithoutDeviceInput = {
    where: Prisma.DeviceRegistrationTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateManyMutationInput, Prisma.DeviceRegistrationTokenUncheckedUpdateManyWithoutDeviceInput>;
};
export type DeviceRegistrationTokenScalarWhereInput = {
    AND?: Prisma.DeviceRegistrationTokenScalarWhereInput | Prisma.DeviceRegistrationTokenScalarWhereInput[];
    OR?: Prisma.DeviceRegistrationTokenScalarWhereInput[];
    NOT?: Prisma.DeviceRegistrationTokenScalarWhereInput | Prisma.DeviceRegistrationTokenScalarWhereInput[];
    id?: Prisma.IntFilter<"DeviceRegistrationToken"> | number;
    deviceId?: Prisma.IntFilter<"DeviceRegistrationToken"> | number;
    token?: Prisma.StringFilter<"DeviceRegistrationToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DeviceRegistrationToken"> | Date | string;
};
export type DeviceRegistrationTokenCreateManyDeviceInput = {
    id?: number;
    token: string;
    expiresAt: Date | string;
};
export type DeviceRegistrationTokenUpdateWithoutDeviceInput = {
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenUncheckedUpdateWithoutDeviceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenUncheckedUpdateManyWithoutDeviceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deviceId?: boolean;
    token?: boolean;
    expiresAt?: boolean;
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistrationToken"]>;
export type DeviceRegistrationTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deviceId?: boolean;
    token?: boolean;
    expiresAt?: boolean;
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistrationToken"]>;
export type DeviceRegistrationTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    deviceId?: boolean;
    token?: boolean;
    expiresAt?: boolean;
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistrationToken"]>;
export type DeviceRegistrationTokenSelectScalar = {
    id?: boolean;
    deviceId?: boolean;
    token?: boolean;
    expiresAt?: boolean;
};
export type DeviceRegistrationTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "deviceId" | "token" | "expiresAt", ExtArgs["result"]["deviceRegistrationToken"]>;
export type DeviceRegistrationTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
};
export type DeviceRegistrationTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
};
export type DeviceRegistrationTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    device?: boolean | Prisma.DeviceDefaultArgs<ExtArgs>;
};
export type $DeviceRegistrationTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeviceRegistrationToken";
    objects: {
        device: Prisma.$DevicePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        deviceId: number;
        token: string;
        expiresAt: Date;
    }, ExtArgs["result"]["deviceRegistrationToken"]>;
    composites: {};
};
export type DeviceRegistrationTokenGetPayload<S extends boolean | null | undefined | DeviceRegistrationTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload, S>;
export type DeviceRegistrationTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeviceRegistrationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeviceRegistrationTokenCountAggregateInputType | true;
};
export interface DeviceRegistrationTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeviceRegistrationToken'];
        meta: {
            name: 'DeviceRegistrationToken';
        };
    };
    /**
     * Find zero or one DeviceRegistrationToken that matches the filter.
     * @param {DeviceRegistrationTokenFindUniqueArgs} args - Arguments to find a DeviceRegistrationToken
     * @example
     * // Get one DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceRegistrationTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DeviceRegistrationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceRegistrationTokenFindUniqueOrThrowArgs} args - Arguments to find a DeviceRegistrationToken
     * @example
     * // Get one DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceRegistrationTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeviceRegistrationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenFindFirstArgs} args - Arguments to find a DeviceRegistrationToken
     * @example
     * // Get one DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceRegistrationTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeviceRegistrationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenFindFirstOrThrowArgs} args - Arguments to find a DeviceRegistrationToken
     * @example
     * // Get one DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceRegistrationTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DeviceRegistrationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceRegistrationTokens
     * const deviceRegistrationTokens = await prisma.deviceRegistrationToken.findMany()
     *
     * // Get first 10 DeviceRegistrationTokens
     * const deviceRegistrationTokens = await prisma.deviceRegistrationToken.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const deviceRegistrationTokenWithIdOnly = await prisma.deviceRegistrationToken.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DeviceRegistrationTokenFindManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DeviceRegistrationToken.
     * @param {DeviceRegistrationTokenCreateArgs} args - Arguments to create a DeviceRegistrationToken.
     * @example
     * // Create one DeviceRegistrationToken
     * const DeviceRegistrationToken = await prisma.deviceRegistrationToken.create({
     *   data: {
     *     // ... data to create a DeviceRegistrationToken
     *   }
     * })
     *
     */
    create<T extends DeviceRegistrationTokenCreateArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenCreateArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DeviceRegistrationTokens.
     * @param {DeviceRegistrationTokenCreateManyArgs} args - Arguments to create many DeviceRegistrationTokens.
     * @example
     * // Create many DeviceRegistrationTokens
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DeviceRegistrationTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DeviceRegistrationTokens and returns the data saved in the database.
     * @param {DeviceRegistrationTokenCreateManyAndReturnArgs} args - Arguments to create many DeviceRegistrationTokens.
     * @example
     * // Create many DeviceRegistrationTokens
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DeviceRegistrationTokens and only return the `id`
     * const deviceRegistrationTokenWithIdOnly = await prisma.deviceRegistrationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DeviceRegistrationTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DeviceRegistrationToken.
     * @param {DeviceRegistrationTokenDeleteArgs} args - Arguments to delete one DeviceRegistrationToken.
     * @example
     * // Delete one DeviceRegistrationToken
     * const DeviceRegistrationToken = await prisma.deviceRegistrationToken.delete({
     *   where: {
     *     // ... filter to delete one DeviceRegistrationToken
     *   }
     * })
     *
     */
    delete<T extends DeviceRegistrationTokenDeleteArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DeviceRegistrationToken.
     * @param {DeviceRegistrationTokenUpdateArgs} args - Arguments to update one DeviceRegistrationToken.
     * @example
     * // Update one DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DeviceRegistrationTokenUpdateArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DeviceRegistrationTokens.
     * @param {DeviceRegistrationTokenDeleteManyArgs} args - Arguments to filter DeviceRegistrationTokens to delete.
     * @example
     * // Delete a few DeviceRegistrationTokens
     * const { count } = await prisma.deviceRegistrationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DeviceRegistrationTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeviceRegistrationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceRegistrationTokens
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DeviceRegistrationTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeviceRegistrationTokens and returns the data updated in the database.
     * @param {DeviceRegistrationTokenUpdateManyAndReturnArgs} args - Arguments to update many DeviceRegistrationTokens.
     * @example
     * // Update many DeviceRegistrationTokens
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DeviceRegistrationTokens and only return the `id`
     * const deviceRegistrationTokenWithIdOnly = await prisma.deviceRegistrationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DeviceRegistrationTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DeviceRegistrationToken.
     * @param {DeviceRegistrationTokenUpsertArgs} args - Arguments to update or create a DeviceRegistrationToken.
     * @example
     * // Update or create a DeviceRegistrationToken
     * const deviceRegistrationToken = await prisma.deviceRegistrationToken.upsert({
     *   create: {
     *     // ... data to create a DeviceRegistrationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceRegistrationToken we want to update
     *   }
     * })
     */
    upsert<T extends DeviceRegistrationTokenUpsertArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationTokenClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DeviceRegistrationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenCountArgs} args - Arguments to filter DeviceRegistrationTokens to count.
     * @example
     * // Count the number of DeviceRegistrationTokens
     * const count = await prisma.deviceRegistrationToken.count({
     *   where: {
     *     // ... the filter for the DeviceRegistrationTokens we want to count
     *   }
     * })
    **/
    count<T extends DeviceRegistrationTokenCountArgs>(args?: Prisma.Subset<T, DeviceRegistrationTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeviceRegistrationTokenCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DeviceRegistrationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceRegistrationTokenAggregateArgs>(args: Prisma.Subset<T, DeviceRegistrationTokenAggregateArgs>): Prisma.PrismaPromise<GetDeviceRegistrationTokenAggregateType<T>>;
    /**
     * Group by DeviceRegistrationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DeviceRegistrationTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeviceRegistrationTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: DeviceRegistrationTokenGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeviceRegistrationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceRegistrationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DeviceRegistrationToken model
     */
    readonly fields: DeviceRegistrationTokenFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DeviceRegistrationToken.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DeviceRegistrationTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    device<T extends Prisma.DeviceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DeviceDefaultArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DeviceRegistrationToken model
 */
export interface DeviceRegistrationTokenFieldRefs {
    readonly id: Prisma.FieldRef<"DeviceRegistrationToken", 'Int'>;
    readonly deviceId: Prisma.FieldRef<"DeviceRegistrationToken", 'Int'>;
    readonly token: Prisma.FieldRef<"DeviceRegistrationToken", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"DeviceRegistrationToken", 'DateTime'>;
}
/**
 * DeviceRegistrationToken findUnique
 */
export type DeviceRegistrationTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DeviceRegistrationToken to fetch.
     */
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
};
/**
 * DeviceRegistrationToken findUniqueOrThrow
 */
export type DeviceRegistrationTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DeviceRegistrationToken to fetch.
     */
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
};
/**
 * DeviceRegistrationToken findFirst
 */
export type DeviceRegistrationTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DeviceRegistrationToken to fetch.
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeviceRegistrationTokens to fetch.
     */
    orderBy?: Prisma.DeviceRegistrationTokenOrderByWithRelationInput | Prisma.DeviceRegistrationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeviceRegistrationTokens.
     */
    cursor?: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeviceRegistrationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeviceRegistrationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeviceRegistrationTokens.
     */
    distinct?: Prisma.DeviceRegistrationTokenScalarFieldEnum | Prisma.DeviceRegistrationTokenScalarFieldEnum[];
};
/**
 * DeviceRegistrationToken findFirstOrThrow
 */
export type DeviceRegistrationTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DeviceRegistrationToken to fetch.
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeviceRegistrationTokens to fetch.
     */
    orderBy?: Prisma.DeviceRegistrationTokenOrderByWithRelationInput | Prisma.DeviceRegistrationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeviceRegistrationTokens.
     */
    cursor?: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeviceRegistrationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeviceRegistrationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeviceRegistrationTokens.
     */
    distinct?: Prisma.DeviceRegistrationTokenScalarFieldEnum | Prisma.DeviceRegistrationTokenScalarFieldEnum[];
};
/**
 * DeviceRegistrationToken findMany
 */
export type DeviceRegistrationTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DeviceRegistrationTokens to fetch.
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeviceRegistrationTokens to fetch.
     */
    orderBy?: Prisma.DeviceRegistrationTokenOrderByWithRelationInput | Prisma.DeviceRegistrationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DeviceRegistrationTokens.
     */
    cursor?: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeviceRegistrationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeviceRegistrationTokens.
     */
    skip?: number;
    distinct?: Prisma.DeviceRegistrationTokenScalarFieldEnum | Prisma.DeviceRegistrationTokenScalarFieldEnum[];
};
/**
 * DeviceRegistrationToken create
 */
export type DeviceRegistrationTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * The data needed to create a DeviceRegistrationToken.
     */
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateInput, Prisma.DeviceRegistrationTokenUncheckedCreateInput>;
};
/**
 * DeviceRegistrationToken createMany
 */
export type DeviceRegistrationTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeviceRegistrationTokens.
     */
    data: Prisma.DeviceRegistrationTokenCreateManyInput | Prisma.DeviceRegistrationTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DeviceRegistrationToken createManyAndReturn
 */
export type DeviceRegistrationTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many DeviceRegistrationTokens.
     */
    data: Prisma.DeviceRegistrationTokenCreateManyInput | Prisma.DeviceRegistrationTokenCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DeviceRegistrationToken update
 */
export type DeviceRegistrationTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * The data needed to update a DeviceRegistrationToken.
     */
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateInput, Prisma.DeviceRegistrationTokenUncheckedUpdateInput>;
    /**
     * Choose, which DeviceRegistrationToken to update.
     */
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
};
/**
 * DeviceRegistrationToken updateMany
 */
export type DeviceRegistrationTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceRegistrationTokens.
     */
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateManyMutationInput, Prisma.DeviceRegistrationTokenUncheckedUpdateManyInput>;
    /**
     * Filter which DeviceRegistrationTokens to update
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * Limit how many DeviceRegistrationTokens to update.
     */
    limit?: number;
};
/**
 * DeviceRegistrationToken updateManyAndReturn
 */
export type DeviceRegistrationTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * The data used to update DeviceRegistrationTokens.
     */
    data: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateManyMutationInput, Prisma.DeviceRegistrationTokenUncheckedUpdateManyInput>;
    /**
     * Filter which DeviceRegistrationTokens to update
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * Limit how many DeviceRegistrationTokens to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DeviceRegistrationToken upsert
 */
export type DeviceRegistrationTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * The filter to search for the DeviceRegistrationToken to update in case it exists.
     */
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
    /**
     * In case the DeviceRegistrationToken found by the `where` argument doesn't exist, create a new DeviceRegistrationToken with this data.
     */
    create: Prisma.XOR<Prisma.DeviceRegistrationTokenCreateInput, Prisma.DeviceRegistrationTokenUncheckedCreateInput>;
    /**
     * In case the DeviceRegistrationToken was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DeviceRegistrationTokenUpdateInput, Prisma.DeviceRegistrationTokenUncheckedUpdateInput>;
};
/**
 * DeviceRegistrationToken delete
 */
export type DeviceRegistrationTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
    /**
     * Filter which DeviceRegistrationToken to delete.
     */
    where: Prisma.DeviceRegistrationTokenWhereUniqueInput;
};
/**
 * DeviceRegistrationToken deleteMany
 */
export type DeviceRegistrationTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceRegistrationTokens to delete
     */
    where?: Prisma.DeviceRegistrationTokenWhereInput;
    /**
     * Limit how many DeviceRegistrationTokens to delete.
     */
    limit?: number;
};
/**
 * DeviceRegistrationToken without action
 */
export type DeviceRegistrationTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistrationToken
     */
    select?: Prisma.DeviceRegistrationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeviceRegistrationToken
     */
    omit?: Prisma.DeviceRegistrationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceRegistrationTokenInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DeviceRegistrationToken.d.ts.map