const midtransClient = require('midtrans-client')

class MidtransController {
	static pay(req, res) {
		let snap = new midtransClient.Snap({
			isProduction: false,
			serverKey: 'SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY',
			clientKey: 'SB-Mid-client-sW5AHuqn__lVIlq3',
		})

		let parameter = {
			transaction_details: {
				order_id: Math.round(new Date().getTime() / 1000),
				gross_amount: req.body.gross_amount,
			},
			item_details: req.body.item_details,
			credit_card: {
				secure: true,
			},
		}

		snap.createTransaction(parameter).then((transaction) => {
			// send transaction token && link
			let link = transaction.redirect_url
			let transactionToken = transaction.token
			let clientKey = snap.apiConfig.clientKey
			res.status(200).json({ link, transactionToken, clientKey })
		})
	}
}

module.exports = MidtransController
