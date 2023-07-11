const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === "POST") {
		const lineItems = req.body.map((item) => {
			const img = item.image[0].asset._ref;
			const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
						images: [newImage],
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			};
		}) 
		try {
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [...lineItems],
				mode: "payment",
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/canceled`,
				// success_url: 'http://localhost:3000/success',
				// cancel_url: 'http://localhost:3000/cancel',
			});
			res.status(200).json({ session });
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
