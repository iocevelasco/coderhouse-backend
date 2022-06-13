const socket = io()
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const validateProductsForm = () => {
  const name = document.forms['productForm']['name'].value
  const price = document.forms['productForm']['price'].value
  const url = document.forms['productForm']['url'].value
  const fields = [name, price, url]
  if (fields.some(e => e == '')) {
    alert("Please Fill All Required Field");
    return false;
  }
}
const validateMessageForm = () => {
  const author = document.forms['messageForm']['author'].value
  const text = document.forms['messageForm']['text'].value
  const fields = [author,text]
  if (fields.some(e => e == '')) {
    alert("Please Fill All Required Field");
    return false;
  }
}

const sendMessage = () => {
  validateMessageForm()
  const author = document.getElementById("author").value
  const text = document.getElementById("text").value

  const date = new Date().toLocaleString()
  const message = { author, text, date}
  socket.emit('create_message', message)
  
  text.value = ''
  author.value = ''
  return false
}

const sendProducts = () => {
  validateProductsForm()
  const name = document.getElementById("name").value
  const price = document.getElementById("price").value
  const url = document.getElementById("url").value
  const product = { name, price, url}
  socket.emit('create_product', product)

  name.value = ''
  price.value = ''
  url.value = ''
  return false
}

socket.on('messages', async (messages) => {
  await fetch('/')
  return messages
})

socket.on('products', (products) => {
  fetch('/')
  return products
})
