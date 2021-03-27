import React, {useState} from 'react';
import './App.css';
import api from './services/api'

function App() {
  const [campos, setCampos] = useState({
      nome: '',
      email: '',
      mensagem: '',
      anexo: ''
  });
  function handleInputChange(event){
    if(event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function send(){
    const formData = new FormData();
    Object.keys(campos).forEach(key => formData.append(key, campos[key]));
    api.post('send',
              formData,
              {
                headers: {
                 "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
              })
  }

  function handleFormSubmit(){
    send(campos);
  }

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" placeholder="E-mail de destino.." onChange={handleInputChange} />

        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Nome da pessoa.." onChange={handleInputChange} />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Escreva algo.." className="textArea" onChange={handleInputChange}></textarea>

        <label htmlFor="anexo">Anexo</label>
        <input type="file" id="anexo" name="anexo" onChange={handleInputChange} />

        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default App;
