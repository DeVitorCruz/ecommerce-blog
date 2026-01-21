import { Product } from "../product/product";

export interface FeatureProductContent {
    imgPath: string;
    imgAlt: string;
    title: string;
    text: string;
    productGrid: Product[];
}
