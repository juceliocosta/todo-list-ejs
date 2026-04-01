# Todo List EJS

Aplicação de exemplo em Node.js usando Express e EJS para gerenciar uma lista de tarefas (CRUD básico). Ideal para aprendizado de MVC simples, rotas REST e formulários.

## 🚀 Estrutura do Projeto

- `app.js` - ponto de entrada do servidor Express.
- `routes.js` - define rotas para listagem, criação, edição, exclusão e conclusão de tarefas.
- `TodoModel.js` - modelo de dados (pode ser memória local ou integração simples com banco).
- `database.js` - define a conexão e gerenciamento do estado do banco de dados
- `views/` - templates EJS:
  - `index.ejs` - exibe tarefas e formulário para adicionar novas.
  - `edit.ejs` - formulário de edição de tarefa.
- `public/styles.css` - estilos CSS para interface.

## ✅ Funcionalidades

- Listar todas as tarefas
- Adicionar nova tarefa
- Editar tarefa existente
- Marcar tarefa como concluída
- Remover tarefa


