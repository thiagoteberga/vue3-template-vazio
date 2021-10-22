# Modelo de Area do Cliente - Unimed Pinda

> Esqueleto Base para Desenvolvimento de Aplicações com Vue 3 - Thiago Teberga.

## HOME
- [x] Página Principal

## ÁREA DO ADMINISTRADOR 
- [x] Página de Login para Administrador;
- [x] Página para Cadastrar Administrador;
- [x] Página para Manutenção dos Administradores (Alterar ou Inativar);
- [x] Página para Trocar a Própria Senha;

## ÁREA DO CLIENTE 
- [x] Página de Login



# Ferramentas Utilizadas:
## Composer:
https://getcomposer.org/download/

## NodeJS:
https://nodejs.org/en/download/

## Git:
https://git-scm.com/downloads

## Postman:
https://www.getpostman.com/

## Pacote de Icones:
https://www.flaticon.com/br/packs/learning-265

## Criar o Projeto com Vue:
https://cli.vuejs.org/guide/prototyping.html

## Slots para Componentização com Vue:
https://br.vuejs.org/v2/guide/components-slots.html

## Routes:
https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/
https://router.vuejs.org/installation.html#direct-download-cdn

## Axios Vue V2:
https://br.vuejs.org/v2/cookbook/adding-instance-properties.html

## Axios Vue V3:
https://br.vuejs.org/v2/cookbook/adding-instance-properties.html

## Vuex (Store com Getter e Mutations):
https://next.vuex.vuejs.org/installation.html#direct-download-cdn




# Comandos para Instalar as Dependências:

``` bash

# FRONT-END: NPM Install Dependencies
npm install

# BACK-END: Criar a pasta Vendor do webservice (Laravel) - Rodar comando dentro do diretório webservice:
composer update
```



# Comandos para Instalação e Build - Frontend:

``` bash

# Instalar Vue
npm install -g @vue/cli @vue/cli-service-global

# Verificar a Versão do Vue
vue --version 

# Criar o Projeto
vue create app-cliente-unimed

# Instalar o Materialize
npm install materialize-css --save

# Instalar o Axios - Requisições para o Backend
npm install axios --save

## Instalar o Vuex - Funcionamento do STORE
npm install vuex --save

npm install vuex@next --save

npm install vue-router     

## Gerador de JSON para Excel
npm install vue-excel-xlsx

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



# Comandos para Instalação e Build (Laravel 8.0) - Backend:
## API com Laravel

``` bash
# Instalar o Laravel
composer create-project laravel/laravel webservice

# Instalar o Laravel com versão Especifica
composer create-project --prefer-dist laravel/laravel webservice

# Configurar o banco de dados MySQL, ajusta o arquivo "Pasta webservice - Arquivo .env"
composer require laravel/passport

# Traduzir o Laravel "pt-br"
https://github.com/lucascudo/laravel-pt-BR-localization
\webservice\resources\lang\pt-br

# Configurar o banco de dados ...
php artisan migrate
php artisan passport:install

# Colocar no User:
use Laravel\Passport\HasApiTokens;
use HasApiTokens, Notifiable;

# Colocar no "config/auth"
'api' => [
    'driver' => 'passport',
    'provider' => 'users',

# Instalar o Laravel Ui
composer require laravel/ui:^3.x

# Instalar o Modulo de Autenticacao
php artisan ui vue --auth

# Criar uma Migration 
php artisan make:model Categories -m
php artisan make:model Series -m
php artisan make:model UserSerie -m
php artisan make:model Schools -m
php artisan make:model UserSchool -m
php artisan make:model Videos -m
php artisan make:model Books -m
php artisan make:model Units -m
php artisan make:model Lessons -m
php artisan make:model Classes -m
php artisan make:model Audios -m
php artisan make:model Pdfs -m
php artisan make:model PdfsTeachers -m
php artisan make:model UserClasses -m
php artisan make:model UserVideo -m
php artisan make:model UserAccess -m
php artisan make:migration add_image_table_books --table=books

# Criar uma Migration para Adicionar o Campo IMAGEM
php artisan make:migration add_image_table_users --table=users

# Rodar a Migration para que o Laravel efetive a alteracao no Banco de Dados
php artisan migrate

# Recriar as Migracoes (Limpa as Tabelas)
php artisan migrate:fresh

# Se rodar o :fresh será necessário rodar o passport novamente.
php artisan passport:install

# Rollback e Satus (Se Necessário)
php artisan migrate:rollback
php artisan migrate:status

# Adicionar um Controller
php artisan make:controller Usuario/UsuarioController
php artisan make:controller Conteudo/ConteudoController
php artisan make:controller Relatorio/RelatorioController

## Alterar o arquivo \webservice\config\app.php
'timezone' => 'America/Sao_Paulo'
'locale' => 'pt-br',

## Criar Notification para Reset de Password
php artisan make:notification ResetPassword

## Customizar Cabeçalho e Rodapé do Email
php artisan vendor:publish --tag=laravel-mail

## Customizar Textos da Notificação por Email
php artisan vendor:publish --tag=laravel-notifications 

# Criar as Rotas da API:
\webservice\routes\api.php

# Criar os Controllers
webservice\app\Http\Controllers

# Criar os Models
webservice\app\Models

# Rodar o server Local do Laravel
php artisan serve
```

# Configurando o Ambiente Compartilhado de Hospedagem para Aceitar o Laravel (PASTA RAIZ DO LARAVEL):
``` bash
https://www.youtube.com/watch?v=fkwhtu0H5EU

 wget https://getcomposer.org/installer
 ls -la
 php installer
 rm -rf installer
 composer create-project laravel/laravel laravel-rede-social

 mv public_html public_html_bkp
 ln -s laravel-rede-social/public public_html
 cd laravel-rede-social
 find * -type d -exec chmod 755 {} \;
 find * -type f -exec chmod 644 {} \;
 cd ..
 chmod 755 laravel-rede-social
```

# Configurando o Ambiente Compartilhado de Hospedagem para Aceitar o Laravel (PASTA RAIZ DO LARAVEL):
``` bash
# Como Configurar o Linux para a versão correta do PHP:
https://suporte.hostgator.com.br/hc/pt-br/articles/360006664913-Como-alterar-a-vers%C3%A3o-do-PHP#.htaccess

# Dicas de Configuração
https://pt.stackoverflow.com/questions/91795/lista-de-diret%c3%b3rios-do-projeto-em-laravel-%c3%a9-exibida-ao-inv%c3%a9s-de-executar-a-aplic/91799#91799

# Instalar o Composer
wget https://getcomposer.org/installer
ls -la
php installer
rm -rf installer

# Criar o Projeto com Laravel
cd ~/www
composer create-project laravel/laravel webservice

# Criar atalho para a pasta do Laravel
ln -s webservice/public backend
ln -s webservice/public/pdfs pdfs
ln -s webservice/public/podcasts podcasts

# Instalar a parte de Banco do Laravel
composer require laravel/passport

php artisan passport:install

composer require laravel/ui:3.x

# Erro de API_TOKEN:
/public_html/rede_social/webservice/config/auth.php
php artisan ui vue --auth

No campo API alterar o 'driver' => 'passport'
webservice/config/auth.php
```


## Estrutura do projeto
``` bash
  dist/ # gerado o build que será publicado em produção...
  static/ # favicon
  webservice/ # backend - API laravel
  |         |__ app # logo, background, imagens e etc...
  |         |   |__ models # models...  
  |         |   |__ notifications # configuração da notificação enviada via email...  
  |         |   |__ http
  |         |       |__ controllers # controllers... 
  |         |__ config # configuração de autenticação, cors, banco de dados, email, etc...
  |         |__ database # configuração de autenticação, cors, banco de dados, email, etc...
  |         |   |__ migrations # migrations responsaveis pela criação do banco de dados...  
  |         |__ public # onde são gravados as apostilas e os podcasts...
  |         |__ routes # rotas onde são definidos os endpoints da api...
  |         |__ .env # arquivo que define algumas configuração gerais do projeto...
  src/
    |__ assets # logo, background, imagens e etc... 
    |__ components # componentes do projeto, ex.: cards, models, grids, progress bar... 
    |__ router # vue-router
    |__ store  # vuex store
    |__ pages # telas do projeto, ex.: aluno, colegio, admin, etc...
```