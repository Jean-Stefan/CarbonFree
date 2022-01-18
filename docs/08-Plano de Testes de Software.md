# Plano de Testes de Software

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-01 - Exibir questionário inicial</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-01 - O site deve apresentar um questionário sobre o estilo de vida do usuário, incluindo perguntas sobre hábitos de alimentação, transporte, consumo energético, renda, entre outros.
                RF-04 - O site deve permitir que o usuário refaça o questionário sobre estilo de vida sempre que achar necessário.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Verificar se o questionário é apresentado e recebe informações necessárias para cálculo.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Criar uma conta</br>
                4. Realizar o login</br>
                5. Selecionar a opção: Responder questionário.</br>
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                As perguntas do questionário devem ser exibidas no site, após clicar na opção.</br>
                Os campos específicos devem estar habilitados para receber as respostas dos usuários.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-02 - Exibir checklist de ações diárias recomendadas</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-02 - O site deve apresentar na página inicial uma checklist
                personalizada de ações diárias para redução da pegada de
                carbono do usuário, baseada no questionário inicial.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Verificar se estão sendo sugeridas atividades para redução da emissão de carbono do usúario.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Selecionar a opção atividades sugeridas
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                Após realizar o login, o usuário deve acessar a opção atividades sugeridas e visualizá-las.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-03 - Visualizar as respostas de um questionário anterior</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-03 - O site deve permitir que o usuário visualize seus dados inseridos no questionário em datas anteriores.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Verificar as respostas inseridas pelo usuário anteriormente.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Selecionar a opção: Exibir histórico de questionários
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                O usuário poderá ver os questionários de datas anteriores.</br>
                Ao clicar em um questionário específico, o usuário poderá visualizar as respostas inseridas.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-04 - Visualizar dados de consumo de carbono</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-05 O site deve permitir que o usuário visualize o seu consumo médio de carbono, calculados a partir do uso do questionário.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Verificar a quantidade média de carbono emitida pelo usuário.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Após ter respondido o questionário pelo menos uma vez, o resultado médio de consumo será mostrado no perfil do usuário.
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                O valor médio de consumo deverá aparecer no perfil do usuário.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-05 - Enviar sugestão de atividades</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-06 - O site deve permitir que o usuário submeta sugestões de ações para redução do consumo de carbono.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Verificar as repostas inseridas pelo usuário anteriormente.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Selecionar a opção: Enviar sugestão de atividade para a aplicação.
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                O usuário podera preencher um formulário de envio de sugestão.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-06 - Comparar emissão com a média dos usuários</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-07 - O site deve permitir que o usuário compare os seus dados de consumo de carbono e porcentagem de redução/aumento de consumo com a média de todos os usuários da aplicação.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Comparar o consumo do usuário.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Após ter respondido o questionário pelo menos uma vez, o comparativo deverá aparecer na tela do questionário.
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                O valor de de consumo médio dos usuários deverá aparecer na tela do questionário.
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr> 
            <th>Caso do Teste</th>
            <th>CT-07 - Convidar usuários</th>
        </tr>
    </thead>
       <tbody>
        <tr> 
            <td>Requisitos Associados</td>
            <td>
                RF-08 - O site deve permitir que o usuário envie convites para amigos utilizarem a aplicação.
            </td>
        </tr>
        <tr> 
            <td>Objetivos do Teste</td>
            <td>
                Testar o envio de convites.
            </td>
        </tr>
        <tr> 
            <td>Passos</td>
            <td>
                1. Acessar o navegador</br>
                2. Informar o endereço do site</br>
                3. Fazer login</br>
                4. Selecionar a opção: Convidar um amigo
            </td>
        </tr>
        <tr> 
            <td>Critérios de Êxito</td>
            <td>
                Um convite para se juntar ao site deverá ser enviado ao e-mail digitado.
            </td>
        </tr>
    </tbody>
</table>
