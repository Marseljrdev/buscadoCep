import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import './estilo.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [dados, setDados] = useState({});

   async function serchaCep(){



    if(input === ""){
      toast.info('Digite algum CEP');
    }
    
    try{
      
      const response = await api.get(`${input}/json`);
      toast.success('CEP identificado');
      setDados(response.data);
      setInput("");

    }catch{
      toast.error('CEP não existe');
      setInput('');
    }
    
 
  }

  return (
    <div className="container" >
      <h1 className="title" >Buscador CEP</h1>

      <div className="container-input" >
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonsearch" onClick={serchaCep} >
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      <main className="main" >
        <h2>CEP: {dados.cep}</h2>

        <span>Rua: {dados.logradouro}</span>
        <span>Complemento: {dados.complemento}</span>
        <span>Bairro: {dados.bairro}</span>
        <span>Cidade: {dados.localidade}</span>
        <span>UF: {dados.uf} </span>
        <span>DDD: {dados.ddd} </span>

      </main>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
