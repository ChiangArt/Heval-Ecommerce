export interface Coupon {
    id:                 number;
    code:               string;
    discountPercentage: number;
    active:             boolean;
    expiryDate:         Date;
}
