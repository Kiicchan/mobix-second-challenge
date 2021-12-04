# Segundo Desafio Mobix (Web)

O desafio envolve criar uma tabela que simule um formulário capaz de conceder a um usuário permissões de acesso a um sistema XPTO.

link para o deploy na vercel: https://mobix-second-challenge.vercel.app/
Para rodar

## Design

Para a biblioteca de componentes, resolvi optar pelo MUI (material) por ter uma maior afinidade com ela.
A aplicação é compatível com os temas do Material (optei por usar o modo dark, mas ela também fica temática no modo light)
Os elementos estão dispostos usando Table em vez do Data-Grid (evitando instalar mais uma dependência)

## Componentes controlados

O React trabalha melhor com uma fonte única de verdade. Para isso, a documentação recomenda que se usem componentes controlados em vez de se distribuir refs para muitos componentes.
Havendo a necessidade vários estados, optei por usar o ContextAPI em conjunto com o hook useReducer para armazenar essas informações em um só lugar. Esta é uma boa alternativa ao Redux em aplicações pequenas.
O estado do formulário fora armazenado em uma lista, com objetos contendo toda informação sobre cada uma das permissões possíveis (analizando no nível mais baixo, dos submódulos). Os componentes fazem consultas a essa lista para saber o que renderizar, utizando-se de buscas e manipulações de arrays.

## Testes - Cypress

Foram realizados alguns testes com cypress.
Os testes focaram-se em garantir que o estado do formulário e as checkbox correspondentes fossem consistentes.

## Maiores Dificuldades

Trabalhar com tabelas sempre é desafiador. É muito fácil esquecer como elas funcionam, e você acaba sempre tendo que voltar a documentação para tentar entender.

Decidir a forma de como armazenar os estados também fora difícil. Existiam muitas maneiras de fazer, e nenhuma parecia ser objetivamente melhor do que a outra.
A maneira que escolhi talvez não seja a mais eficiente, mas achei ser uma das mais simples de implementar por já ter feito algo parecido antes.

Criar os testes também foram um grande desafio (nunca havia utilizado o Cypress antes). O Cypress não parece ter, até onde consegui procurar na documentação, nenhuma iteração direta com os estados internos aos componentes. Para o estado gerado a partir de um useReducer e acessível apenas através do ContextAPI, a dificuldade aumenta.
Contornei este problema renderizando um componente a mais durante os testes que fosse capaz de "espiar" o valor de estado entregue pelo ContextProvider.

## Possíveis Melhorias

Como de costume, tento imaginar quais seriam as possíveis melhorias.
A primeira seria com relação à performance. Caso a tabela fosse muito maior, o uso de uma estrutura de dados mais eficiente, como uma árvore, oferecesse melhorias significativas com relação à pesquisa em uma lista.
A segunda melhoria seria na clareza do código. Alguns componentes ainda poderiam ser separados em outros menores, de um modo que facilitasse a leitura.
Por último, existem as próprias opções de melhorias de performance do React, como o React.memo e useCallback. Entretanto, acredito que os ganhos não seriam consideráveis para um componente tão simples.

## Aprendizado

A experiência foi recompensadora. Gostei bastante do Cypress, e acredito que o usarei mais em projetos futuros.

## Clockify

Este desafio foi cronometrado com o Clockify. O link para o report está disponível em: https://clockify.me/shared/61ab16c60a923f0f3b447118
