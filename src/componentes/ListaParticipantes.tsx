import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"

const ListaParticipantes = () => {
    // renderizando um hook, que para cada item da listaParticipantesState, traz um <li> com o participante
   const participantes: string[] = useListaDeParticipantes()

   return(
    <ul>
        { 
            participantes.map((participante) => (
            <li key={participante}>{participante}</li>
        ))
        }
    </ul>
    
   )
}

export default ListaParticipantes