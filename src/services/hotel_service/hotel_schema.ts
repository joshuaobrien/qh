import { z } from "zod";

export const PreviewImageSchema = z.object({
	url: z.string().url(),
	caption: z.string(),
	imageType: z.enum(["PRIMARY"]),
});

export type PreviewImage = z.infer<typeof PreviewImageSchema>;

export const RatingSchema = z.object({
	ratingValue: z.number(),
	ratingType: z.enum(["self", "star"]),
});

export type Rating = z.infer<typeof RatingSchema>;

export const PropertySchema = z.object({
	propertyId: z.string(),
	title: z.string(),
	address: z.array(z.string()),
	previewImage: PreviewImageSchema,
	rating: RatingSchema,
});

export type Property = z.infer<typeof PropertySchema>;

export const PromotionSchema = z.object({
	title: z.string(),
	type: z.enum(["MEMBER", "CAMPAIGN"]),
});

export type Promotion = z.infer<typeof PromotionSchema>;

export const DisplayPriceSchema = z.object({
	amount: z.number(),
	currency: z.string(),
});

export type DisplayPrice = z.infer<typeof DisplayPriceSchema>;

export const SavingsSchema = z
	.object({
		amount: z.number(),
		currency: z.string(),
	})
	.nullable();

export type Savings = z.infer<typeof SavingsSchema>;

export const CancellationOptionSchema = z.object({
	cancellationType: z.enum(["NOT_REFUNDABLE", "FREE_CANCELLATION"]),
});

export type CancellationOption = z.infer<typeof CancellationOptionSchema>;

export const OfferSchema = z.object({
	promotion: PromotionSchema,
	name: z.string(),
	displayPrice: DisplayPriceSchema,
	savings: SavingsSchema,
	cancellationOption: CancellationOptionSchema,
});

export type Offer = z.infer<typeof OfferSchema>;

export const ResultSchema = z.object({
	id: z.string(),
	property: PropertySchema,
	offer: OfferSchema,
});

export type Result = z.infer<typeof ResultSchema>;

export const RootSchema = z.object({
	results: z.array(ResultSchema),
});

export type Root = z.infer<typeof RootSchema>;
