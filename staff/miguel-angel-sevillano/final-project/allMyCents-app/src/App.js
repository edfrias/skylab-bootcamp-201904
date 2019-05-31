import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import Chart from "./Charts/index"
import { TesseractWorker } from 'tesseract.js';
import { format } from 'path';
const logic = require('./logic')

let checkInfo = ["manzana", "minimagdalenas", "zumo", "ensalada", "tomate", "napolitana", "tortitas", "galletas", "pan", "bollos", "cookies", "tagliatelle", "craker",
  "apio", "bizcocho", "aceite", "bebida", "bizcocho"]




class SetStateExample extends Component {
  state = {
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
    show: null,
    ticket: null,
    logged: null


  };

  onChange = value => {
    this.setState(value);

  };

  reset = () => {

    let image = new Image();
    image.src = this.state.result
    this.setState({ show: image.src })


  }

  clear = () => {
    this.setState({ show: null })
  }
  imageProcessing = () => {
    this.setState({ src: null })

    let imgToTxt = new TesseractWorker()
    imgToTxt.recognize(this.state.show, 'spa+ita+fra')

      .then((result) => {
        let rawTicket = result.words
        let filteredTicket = []
        let finalTicket = []
        let check = 0

        rawTicket.forEach(items => {
          const { text } = items

          const text1 = text.toLowerCase()
          const isNumber = Number(text1.replace(/,/g, "."))
          if (isNaN(isNumber) === false && check === 1) {
            filteredTicket.push(isNumber)

            check = 0
          }

          else if (check === 0) {
            const item = checkInfo.findIndex(items => items === text1)

            if (item >= 0) {
              filteredTicket.push(text1)
              check = 1;
            }
          }

        })

        for (let i = 0; i < filteredTicket.length; i++) { if (typeof filteredTicket[i] === 'string') finalTicket.push({ name: filteredTicket[i], Euro: filteredTicket[i + 1] }) }
        finalTicket.push({ date: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/') })



        this.setState({ ticket: finalTicket })
        console.log("done!!!")
        console.log(finalTicket)
      });

  }

  handleLogin = (e) => {


    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    return (async () => {

      const response = await logic.loginUser(email, password)

      this.setState({ logged: response })

    })()


  }






  render() {
    const { reset, clear, imageProcessing, state: { ticket, logged }, handleLogin } = this
    let email 
    let password

    return <div>
      <br></br>
      <DropNCrop onChange={this.onChange} value={this.state} canvasHeight="500px" canvasWidth="500px" maxFileSize={6145728} cropperOptions={{ guides: true, viewMode: 1, autoCropArea: 1 }} />
      <button onClick={reset} >preview</button>
      <button onClick={clear} >clear</button>
      <button onClick={imageProcessing} >send</button>
      <img id="image" src={this.state.show} width="400px"></img>


      <form onSubmit={handleLogin}>
            <input type="text" name="email" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>log</button>
    
        <p>{logged}</p>
      </form>



      <p>
        {ticket && <Chart data={ticket} />}
      </p>


    </div>
  }
}

export default SetStateExample;
