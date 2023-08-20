import { useRecoilValue } from "recoil"
import { erroState } from "../atom"

// encapsulando o recoil
export const useMensagemDeErro = () => {
    const mensagem = useRecoilValue(erroState)
    return mensagem;
}