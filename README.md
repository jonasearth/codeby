# codeby
## IMPORTANTE
```
As informações de como rodar os serviços estão dentro do readme.md de cada serviço.
```
Para executar a aplicação é necessário ter:
* docker
* docker-compose

Ambos atualizados.

Antes de qualquer coisa você precisa criar um network chamado services com o comando :

```docker network create services```

### Serviços

Existem 3 pastas nesse projeto, cada uma sendo um serviço separado: 
* kafka-local
* third-party
* util-communication

### Kafka-local

É o serviço responsável pelo gerenciamento das filas, alem disso tambem foi implementado um dashboard que pode ser acessado em [http://localhost:8080](http://localhost:8080) quando o serviço for iniciado, assim você poderá acompanhar todos os topicos e as mensagens lá postas

### Third-party

É o serviço responsável pela integração de api's de terceiros dento da malha de serviços.

### Util-communication

É o serviço que trata de comunicações, seja ela por smtp, pop, imap, fax, mandar uma carta ou qualquer coisa do tipo.

## Observações 

Dentro das pastas é possivel encontrar, alem do codigo, testes unitarios para os mesmos, alem de documentação para o endpoint. 

