import { useState } from 'react';
import {db} from './firebaseConnection';
import {doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import './app.css';
import { async } from '@firebase/util';


function App() {

  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [post, setPost] = useState([]); //pegar uma lista de posts


  async function handleAdd(){ 
 //   (adicionando com id 12345 digitado aqui "a mão mesmo")
 //   await setDoc(doc(db,'post', '12345'), {
 //     titulo: titulo,
 //     autor: autor
 //   })
 //   .then(() => {
 //     console.log('DADOS REGISTRADOS NO BANCO')
 //   })
 //   .catch((error) => {
 //     console.log('GEROU ERRO' + error)
 //   })
    await addDoc(collection(db, 'post'), { 
      //Assim vai gerar id aleatorio 
      titulo: titulo,
      autor: autor,

      
    })
    .then(() => {
      console.log('CADATRADO COM SUCESSO')
      setAutor(''); 
      setTitulo('')
    })
    .catch((error) => {
      console.log('ERRO' + error)
    })
  }

  async function buscarPost(){      //buscando no banco esse item específico
  /*  const postRef = doc(db, 'post', 'jrClx08g0tpOS4oc5xvO')

    await getDoc(postRef)
    .then((snapshot) => {
      setAutor(snapshot.data().autor)
      setTitulo(snapshot.data().titulo)
    })
    .catch(() => {
      console.log('ERRO AO BUSCAR POST')
    })*/

    const postRef = collection(db, 'post')
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id:doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPost(lista);

    })
    .catch((error) => {
      console.log('DEU ALGUM ERRO NA BUSCA')
    })
  
  }
  async function editarPost(){
    const docRef = doc(db, 'post', idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log('POST ATUALIZADO')
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() => {
      console.log('ERRO AO ATUALIZAR')
    })
  } 
  return (
    <div>
      <h1>ReactJS + Firebase :)</h1>

    <div className='container'>

      <label>ID do Post</label>
      <input
        placeholder='Digite o ID do post'
        value={idPost}
        onChange={(e) =>setIdPost(e.target.value)} 
      /><br/>


      <label>Título</label>
      <textarea
        type='text'
        placeholder='Digite o título'
        value={titulo}
        onChange={(e) =>setTitulo(e.target.value)}
      />

      <label>Autor:</label>
      <input
        type='text'
        placeholder='Autor do post'
        value={autor}
        onChange={(e) =>setAutor(e.target.value)}
      />
      
      <button onClick={handleAdd}>Cadastrar</button>
      <button onClick={buscarPost}>Buscar post</button><br/>
      <button onClick={editarPost}>Atualizar Post</button>

      <ul>
        {post.map((post) => {
          return(
            <li key={post.id}>
              <strong>ID: {post.id}</strong><br/>
              <span>Titulo: {post.titulo}</span><br/>
              <span>Autor: {post.autor}</span><br/><br/>
            </li>
          )
        })}
      </ul>

    </div> 

    </div>
  );
}

export default App;
 

