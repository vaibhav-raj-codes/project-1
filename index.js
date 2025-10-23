const setupApp = require('./expressSetup.js')
const port = 8080;
const mongoose = require('mongoose');
const chat = require('./models/chat.js')
const app = setupApp();

main().then(() => console.log('connection to mongodb successful')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

// all chat route or main page
app.get('/chats', async (req, res) => {
    let myChats = await chat.find();
    res.render('index', { myChats })
});

// get the forms route
app.get('/chats/new', (req, res) => {
    res.render('new')
})

// post the form data to index route
app.post('/chats', (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save().then(console.log("chat was saved")).catch(err => console.log(err));
    res.redirect('/chats')
})

// Edit route:
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let Chat = await chat.findById(id);
    res.render('edit.ejs', { Chat });
});

// update route
app.put('/chats/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { newMsg } = req.body;
        let updatedValue = await chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true })
        console.log(`updated value:\n${updatedValue}`);
    } catch (err) {
        console.log(err)
    }
    res.redirect("/chats")
})

// Delete route
app.delete('/chats/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let deletedValue = await chat.findByIdAndDelete(id);
        console.log(deletedValue);
    } catch(err) {
        console.log(err);
    }
    res.redirect('/chats');
})

// Index route
app.get('/', async (req, res) => {
    let myChats = await chat.find();
    res.render('index', { myChats })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});