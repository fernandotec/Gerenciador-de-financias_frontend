import React,{useState} from 'react';
import api from '../../services/api';
import './style.css';

export default function Main (){
    var date = new Date();
    let[CPF,setCPF] = useState('12312312312');
    const[UF,setUF] = useState('MG');
    const[data_nascimento,setData_nascimento] = useState('08/04/2004');
    const[parcelas,setParcelas] = useState(5);
    const[valor,setValor] = useState(59000);
    const[error,setError] = useState('----');
    const[color,setColor] = useState('darkred');
    const[emprestimoDATA,setEmprestimoDATA] = useState({});
    const[display,setDisplay] = useState('0');

    async function handleSubmit(e){
        e.preventDefault();
        setError('');

        CPF = parseInt(CPF);
    
        if(isNaN(CPF) === true ) {
            setError('Insira um CPF número')
            setCPF('');
            setUF('');
            setData_nascimento('');
            setValor('');
            setParcelas('');
        }

        const data = {
            CPF,
            UF,
            data_nascimento,
            valor,
            parcelas,
        }
        const response = await api.post('/simular',data);
        if(typeof(response.data) != 'object'){
            setError(response.data);
            setCPF('');
            setUF('');
            setData_nascimento('');
            setValor('');
            setParcelas('');
        } else {
            setColor('darkgreen');
            setError('Simulado com sucesso');
            setEmprestimoDATA(response.data);
            if(!isNaN(emprestimoDATA.taxa_juros_simples)){
                setDisplay('10');
            }
        }
    }
    function Emprestimo(){

        return(
            <div style={{opacity:display}} className="emprestimo-container">
                <div className="headers">
                    <div className="header">
                        <p>Valor requerido : </p>
                        <h3>{emprestimoDATA.valor}</h3>
                    </div>
                    <div className="header">
                        <p>Taxa de juros : </p>
                        <h3>{emprestimoDATA.taxa_juros_simples}</h3>
                    </div>
                    <div className="header">
                        <p>Pagar em : </p>
                        <h3>{parcelas + ' meses'}</h3>
                    </div>
                </div>
                <br />
                <p>Projeção das parcelas</p>
                <div className="parcelas">
                    <div className="parcelas-single">
                        <p>{date.getDay()+'/'+ 6 +'/'+date.getFullYear()}</p>
                        <h4>R$: {valor/parcelas}</h4>
                    </div>
                    <div className="parcelas-single">
                        <p>{date.getDay()+'/'+ 7 +'/'+date.getFullYear()}</p>
                        <h4>R$: {valor/parcelas}</h4>
                    </div>
                    <div className="parcelas-single">
                         <p>{date.getDay()+'/'+ 8 +'/'+date.getFullYear()}</p>
                        <h4>R$: {valor/parcelas}</h4>
                    </div>
                    <div className="parcelas-single">
                        <p>{date.getDay()+'/'+ 9 +'/'+date.getFullYear()}</p>
                        <h4>R$: {valor/parcelas}</h4>
                    </div>
                    <div className="parcelas-single">
                        <p>{date.getDay()+'/'+ 10 +'/'+date.getFullYear()}</p>
                        <h4>R$: {valor/parcelas}</h4>
                    </div>
                    <div className="parcelas-single">
                        <p>Total</p>
                        <h4>R$: {valor}</h4>

                    </div>
                </div>
                
            </div>
        )
    }

    return(
        <div className="components-container">
            <h1>Simule e solicite seu empréstimo</h1>
            <h3>Preencha o formulário abaixo</h3>
            <form onSubmit={handleSubmit} >
                <input
                    placeholder='CPF'
                    maxLength="11"
                    value={CPF}
                    onChange={e =>setCPF(e.target.value)}
                    required
                />  
                <input
                    placeholder='UF'
                    maxLength='2'
                    value={UF}
                    onChange={e => setUF(e.target.value)}
                    required
                />
                <input
                    placeholder='Data de nascimento, separado por barras'
                    type='string'
                    value={data_nascimento}
                    onChange={e => setData_nascimento(e.target.value)}
                    required
                />
                <div className="value-months">
                    <input
                        placeholder='Valor requerido'
                        type='number'
                        min='50000'
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Meses para pagar'
                        type='number'
                        max='360'
                        value={parcelas}
                        onChange={e => setParcelas(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Simular</button>
                <div className="message">
                    <p style={{color:color}}>{error}</p>
                </div>  
            </form>
            <Emprestimo />
        </div>
        
    );
}