import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock('../state/hook/useListaDeParticipantes', () => {
    return{
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../state/hook/useSorteador', () => {
    return{
        useSorteador: () => mockSorteio
    }
})

jest.mock('react-router-dom', () => {
    return{
        //para mockar um que use uma funçao, precisamos colocar como arrow function
       useNavigate: () => mockNavegacao
    }
})

describe('onde nao existem mulheres suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('a brincadeira não pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
           )
           const botao = screen.getByRole('button')
           expect(botao).toBeDisabled
    } )
})

describe('Quando existem mulheres suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Amanda', 'Lívia', 'Marcia'])
    })
    test('a brincadeira pode ser começar', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
           )
           const botao = screen.getByRole('button')
           expect(botao).not.toBeDisabled()
    } )

    test('a brincadeira foi iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
           )
           const botao = screen.getByRole('button')
           fireEvent.click(botao)
            //toHaveBeenCalled - que o metodo tenha sido chamado
           expect(mockNavegacao).toHaveBeenCalledTimes(1)
            //  foi chamado com o parametro que esperamos
           expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
           expect(mockSorteio).toHaveBeenCalledTimes(1)
    } )
})
