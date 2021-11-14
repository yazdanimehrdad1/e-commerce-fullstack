
const stripe = require('stripe')(process.env.STRIPE_SK)

const paymentController = {
    health: async (req, res)=>{
        try {
            res.json({message: "payment rout is healthy"})
            
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },


    payment: async (req, res)=>{

        const {product, token} = req.body
        console.log("req.body",req.body)
        console.log("PRODUCT", product)
        console.log("TOKEN", token)
        // const idempontencyKey = uuid();

        return stripe.customers
            .create({
                email:token.email,
                source:token.id
            })
            .then( customer =>{
                stripe.charges.create(
                    {
                        amount:product.price *100,
                        currency: "usd",
                        customer: customer.id,
                        receipt_email: token.email,
                        description: product.name,
                        shipping: {
                            name:token.card.name,
                            address:{
                                country: token.card.address_country
                            }
                        }
                    },
                    // { idempontencyKey }
                )
            })
            .then( response => res.status(200).json(response))
            .catch( err=> console.log(err))


    }
}

module.exports = paymentController