const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
    .then(() => console.log("connection to mongodb successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "akash",
        to: "nagawali",
        msg: "farts",
        created_at: new Date(),
    },
    {
        from: "chaitanya",
        to: "god",
        msg: "i want 5 million $",
        created_at: new Date(),
    },
    {
        from: "jayant",
        to: "gagan",
        msg: "bomb detonation in 3, 2, 1",
        created_at: new Date(),
    },
    {
        from: "guru",
        to: "muskaan",
        msg: "Tum mere dil ki dhadkan ho",
        created_at: new Date(),
    },
];

// chat.insertMany(allChats).then((res) => console.log(res));
