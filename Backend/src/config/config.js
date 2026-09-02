import "dotenv/config"

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defiend in the enivronment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defiend in the enivronment variables")
}

export const config = {
     MONGO_URI : process.env.MONGO_URI,
     JWT_SECRET : process.env.JWT_SECRET
}