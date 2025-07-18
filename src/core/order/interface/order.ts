export interface Order {
    id:                   number;
    orderId:              string;
    userId:               number;
    orderItems:           OrderItem[];
    deliveryDateTime:     Date;
    shippingAddress:      ShippingAddress;
    paymentDetails:       PaymentDetails;
    totalPrice:           number;
    totalDiscountedPrice: number;
    orderStatus:          string;
    totalItems:           number;
    createdAt:            Date;
    contactInfo:          ContactInfo;
}

export interface ContactInfo {
    id:               number;
    fullName:         string;
    email:            string;
    cel:              string;
    identityDocument: string;
    documentType:     string;
}

export interface OrderItem {
    id:                 number;
    productId:          number;
    productTitle:       string;
    productDescription: string;
    imageUrl:           string[];
    quantity:           number;
    price:              number;
    discountedPrice:    number;
}

export interface PaymentDetails {
    paymentMethod:     string;
    status:            string;
    paymentId:         number;
    externalReference: string;
    payerEmail:        string;
    transactionAmount: string;
    paymentType:       string;
}

export interface ShippingAddress {
    id:               number;
    fullAddress:      string;
    apartmentOrFloor: string;
    district:         string;
    province:         string;
    department:       string;
    reference:        string;
    additionalInfo:   string;
}
